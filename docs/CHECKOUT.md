# Nexo 21 — Contrato modular de checkout, compra e entitlement

> Especificação agnóstica de processador. Não é código nem aconselhamento jurídico. Cada adaptador deve mapear eventos externos para este domínio sem vazar semântica específica para o produto.

## 1. Objetivos

- trocar checkout/processador sem reescrever jornada ou biblioteca;
- não conceder acesso com base em redirect do browser;
- processar webhooks fora de ordem e repetidos com idempotência;
- representar base, bumps, upsell, DLC e assinatura como linhas/SKUs;
- revogar somente o acesso afetado por refund/chargeback/cancelamento;
- manter trilha de auditoria e reconciliação.

### Provedor escolhido: Hotmart

O lançamento usa **Hotmart Checkout + Webhook v2.0.0**. O botão da landing redireciona para a URL oficial configurada em `CHECKOUT_URL_NEXO_21`; o redirect nunca concede acesso. A concessão ou revogação nasce somente em `POST /api/checkout/webhook`.

Controles obrigatórios do adaptador:

- validar `X-HOTMART-HOTTOK` em tempo constante antes de ler o payload;
- aceitar somente `version=2.0.0`;
- identificar idempotência pelo `id` do evento e compra por `purchase.transaction`;
- exigir correspondência exata de `product.ucode` e `purchase.offer.code` com a allowlist;
- mapear `PURCHASE_APPROVED`/`PURCHASE_COMPLETE` para pago, `PURCHASE_REFUNDED` para reembolso, `PURCHASE_CHARGEBACK` para chargeback e cancelado/expirado para cancelamento;
- validar preço e moeda da oferta contra o catálogo interno;
- ignorar outro produto identificado e rejeitar a oferta esperada quando seu código ainda não estiver mapeado;
- manter `HOTMART_WEBHOOK_ENABLED=false` até um post de teste da Hotmart passar.

Na Hotmart, registrar o endpoint `https://nexo21-luluwiebu-1474s-projects.vercel.app/api/checkout/webhook` especificamente para o produto Nexo 21 e selecionar os eventos de compra aprovados, concluídos, cancelados, expirados, reembolsados e chargeback. A documentação oficial usa o header `X-HOTMART-HOTTOK`: https://developers.hotmart.com/docs/en/2.0.0/webhook/purchase-webhook/

## 2. Módulos e fronteiras

```text
Sales UI
  └─ Checkout Session API
       └─ Processor Adapter ──> External Checkout
                                └─ Webhook Ingress
                                     └─ Inbox (durable)
                                          └─ Normalizer
                                               └─ Purchase Ledger
                                                    └─ Entitlement Engine
                                                         ├─ Product Access
                                                         ├─ Email/Provisioning Outbox
                                                         └─ Analytics Outbox
```

### Responsabilidades

- **Sales UI:** escolhe offer/bumps e solicita sessão; nunca calcula total final como verdade.
- **Checkout Session API:** valida catálogo, moeda, cupom, eligibility e cria snapshot.
- **Processor Adapter:** traduz sessão e eventos para/de um provedor.
- **Webhook Ingress:** autentica, salva payload bruto e responde rápido.
- **Normalizer:** converte evento externo no envelope canônico.
- **Purchase Ledger:** aplica transições monetárias imutáveis/auditáveis.
- **Entitlement Engine:** deriva acesso por linha e política.
- **Outbox:** garante side effects reprocessáveis (e-mail/analytics) após commit.

## 3. Catálogo e SKUs

| SKU | Tipo | Preço USD | Entitlement key | Recorrência |
|---|---|---:|---|---|
| `n21_core_v1` | base | 990 | `product:nexo-21` | não |

No lançamento, **somente o produto principal está ativo**. Bumps, upsell, DLCs e assinatura permanecem no roadmap e não podem criar checkout ou entitlement até conteúdo, preço, recorrência e adaptador do processador receberem uma nova revisão.

Preço é inteiro em centavos e moeda ISO-4217. O adaptador envia IDs externos, mas o sistema persiste o SKU interno no snapshot. Nunca inferir produto por descrição textual do webhook.

## 4. Contrato de criação de checkout

### Request conceitual

```json
{
  "request_id": "uuid",
  "offer_id": "offer_n21_core_launch_v1",
  "currency": "USD",
  "items": [
    {"sku": "n21_core_v1", "quantity": 1}
  ],
  "coupon_code": null,
  "customer": {"email": "captured-by-secure-boundary"},
  "attribution_id": "opaque-uuid",
  "success_url": "https://nexo21.com/gracias?session={SESSION_TOKEN}",
  "cancel_url": "https://nexo21.com/checkout?state=cancelled",
  "locale": "es"
}
```

### Validações

- `request_id` idempotente por 24 h;
- base obrigatória para bumps; upsell/DLC podem ser checkout próprio;
- máximo 1 de cada SKU não recorrente;
- não misturar mensal e anual;
- preço, imposto e desconto vêm do snapshot server-side;
- e-mail normalizado somente no boundary seguro; não retornar em URL/log;
- `success_url` em allowlist;
- cupom explicitamente elegível ao offer/SKU;
- consentimento de marketing separado e não obrigatório.

### Response

```json
{
  "checkout_session_id": "chk_internal_uuid",
  "processor": "adapter_name",
  "processor_session_id": "opaque_external_id",
  "status": "created",
  "currency": "USD",
  "subtotal_cents": 990,
  "discount_cents": 0,
  "tax_cents": 0,
  "total_cents": 990,
  "checkout_url": "https://processor.example/session/token",
  "expires_at": "2026-08-23T19:30:00Z"
}
```

O `checkout_url` é sensível e curto; não persistir em analytics.

## 5. Webhook ingress

### Sequência obrigatória

1. receber bytes brutos e headers necessários;
2. verificar assinatura/timestamp antes de parse de negócio;
3. rejeitar timestamp fora da tolerância (sugestão: 5 min), salvo replay autorizado;
4. persistir inbox com chave única `(processor, external_event_id)`;
5. responder `2xx` após persistência durável, não após toda a cadeia;
6. processar assíncrono com retry e dead-letter;
7. normalizar e aplicar em transação;
8. gravar outbox na mesma transação;
9. marcar inbox `processed` ou `ignored_with_reason`.

**HTTP:** assinatura inválida → `401/400`; erro transitório antes da persistência → `5xx`; duplicata válida já armazenada → `200`.

Nunca logar payload integral fora do storage restrito; mascarar e-mail, endereço e instrumento de pagamento.

## 6. Envelope canônico de webhook

```json
{
  "canonical_event_id": "uuid",
  "processor": "adapter_name",
  "external_event_id": "evt_123_exact",
  "external_event_type": "provider.payment.approved",
  "event_type": "payment.approved",
  "occurred_at": "2026-08-23T18:40:00Z",
  "received_at": "2026-08-23T18:40:02Z",
  "external_order_id": "ord_123_exact",
  "external_customer_id": "cus_123_exact",
  "purchase_reference": "chk_internal_uuid",
  "currency": "USD",
  "amounts": {
    "subtotal_cents": 990,
    "discount_cents": 0,
    "tax_cents": 0,
    "total_cents": 990,
    "refunded_cents": 0
  },
  "lines": [
    {
      "external_line_id": "line_1",
      "sku": "n21_core_v1",
      "quantity": 1,
      "unit_amount_cents": 990,
      "line_total_cents": 990
    }
  ],
  "metadata": {
    "attribution_id": "opaque-uuid",
    "offer_id": "offer_n21_core_launch_v1"
  },
  "payload_hash": "sha256:...",
  "schema_version": 1
}
```

### Tipos canônicos

- `checkout.expired`
- `payment.pending`
- `payment.approved`
- `payment.failed`
- `refund.completed` (parcial ou total, preferir linhas)
- `chargeback.opened`
- `chargeback.won`
- `chargeback.lost`
- `subscription.started`
- `subscription.renewed`
- `subscription.payment_failed`
- `subscription.cancelled`
- `subscription.expired`

Evento desconhecido é salvo e marcado `ignored_with_reason=unsupported_type`; não falhar em loop.

## 7. Modelo de compra

### Purchase

- `purchase_id` interno;
- `checkout_session_id`;
- `processor` + `external_order_id` (unique composto);
- `customer_id` interno;
- `status`: `created|pending|paid|partially_refunded|refunded|disputed|cancelled|failed`;
- valores em centavos + moeda;
- `offer_id`, attribution snapshot;
- `paid_at`, `refunded_at`, timestamps de auditoria.

### PurchaseLine

- `purchase_line_id`;
- `purchase_id`;
- `external_line_id` quando houver;
- `sku`, `quantity`, valores snapshot;
- `status`: `pending|paid|partially_refunded|refunded|disputed`;
- `refunded_cents`;
- `entitlement_policy_version`.

### PurchaseEvent (append-only)

Registra evento aplicado, antes/depois, payload hash, actor (`webhook|operator|reconciliation`) e motivo. Correção operacional gera novo evento compensatório; não editar histórico.

## 8. Máquinas de estado

### Pagamento único

```text
created → pending → paid → partially_refunded → refunded
                  ↘ disputed → paid (won) | refunded/revoked (lost)
created|pending → failed|cancelled
```

- `paid` é monotônico quanto à existência do pagamento; refund é evento posterior.
- Evento atrasado `pending` não regride `paid`.
- Total reembolsado é acumulado e limitado ao total pago.

### Assinatura

```text
pending → active → past_due → active
                    └→ cancelled → expired
active ───────────────→ cancelled_at_period_end → expired
```

Cancelamento não implica revogação imediata quando o período está pago. `current_period_end` é explícito.

## 9. Contrato de entitlement

### Registro

```json
{
  "entitlement_id": "ent_uuid",
  "customer_id": "usr_uuid",
  "key": "journey:n21_core_v1",
  "source_type": "purchase_line|subscription|manual_comp",
  "source_id": "purchase_line_uuid",
  "status": "active",
  "starts_at": "2026-08-23T18:40:03Z",
  "ends_at": null,
  "granted_by_event_id": "canonical_event_uuid",
  "revoked_by_event_id": null,
  "policy_version": 1
}
```

Chave idempotente recomendada: `(customer_id, key, source_type, source_id)`.

### Políticas

- produto/base/bump/upsell/DLC pago: `paid → active`, sem expiração;
- refund por linha: revoga apenas entitlement dessa linha;
- refund parcial sem linha: aplicar política determinística documentada ou enviar para revisão; não escolher SKU arbitrariamente;
- chargeback aberto: `suspended` conforme risco/termos; ganho reativa; perdido revoga;
- assinatura: acesso até `current_period_end`; falha entra em grace period configurável (ex.: 3 dias), depois expira;
- compra duplicada do mesmo SKU mantém duas fontes; acesso segue ativo enquanto existir ao menos uma fonte ativa;
- manual comp exige actor, motivo, validade e auditoria; nunca se mistura à compra.

### Effective access

`has_access(customer, key, at)` é verdadeiro se existir ao menos um entitlement `active` cujo intervalo contém `at`. A UI não consulta status bruto do processador.

## 10. Idempotência, ordem e concorrência

- Inbox unique por external event ID.
- Aplicação unique por `(processor, external_event_id, handler_version)`.
- Purchase unique por `(processor, external_order_id)`.
- Upsert de linhas por external line ID ou `(purchase_id, sku, ordinal)` do snapshot.
- Lock/controle otimista por purchase durante transição.
- Side effects via outbox unique por `(event_id, effect_type, destination)`.
- Webhook pode chegar antes do redirect, depois dele, repetido ou fora de ordem.
- Se compra não for correlacionada, manter `unmatched` e reconciliar; não conceder a e-mail aproximado.

## 11. Upsell e múltiplos pedidos

O upsell pode ser:

1. nova linha no mesmo pedido, se o processador garantir vínculo; ou
2. novo `Purchase` com `parent_purchase_id` e SKU próprio.

Entitlement não depende de estar no mesmo pedido. A atribuição de upsell usa exposição/offer token assinado e `parent_purchase_id`; não confia em query string editável.

## 12. Reembolso, disputa e cancelamento

### Refund total

- registrar refund financeiro;
- marcar linhas reembolsadas;
- revogar entitlements dessas fontes;
- preservar progresso para auditoria/exportação, mas bloquear conteúdo pago;
- enviar confirmação transacional, sem tentativa de retenção no mesmo e-mail.

### Refund parcial

- se o provedor fornece linha: usar linha;
- se só fornece valor: casar apenas quando houver combinação única e exata;
- caso ambíguo: fila de revisão com SLA; nenhum acesso é revogado por chute.

### Cancelamento de assinatura

- confirmar data efetiva e próxima cobrança ausente;
- manter compras permanentes e DLCs;
- créditos seguem termos publicados; não apagar produtos já resgatados.

## 13. Segurança

- TLS e segredo de webhook por ambiente/processador;
- rotação com sobreposição de chaves;
- comparação de assinatura em tempo constante;
- allowlist de algoritmos e versão;
- proteção contra replay por timestamp + event ID;
- menor privilégio nos adapters;
- nenhum dado de cartão no sistema Nexo 21;
- segredos fora de logs e código;
- acesso ao payload bruto auditado;
- rate limit no checkout create e status endpoint;
- token da página de agradecimento opaco, curto e não autenticador permanente.

## 14. Reconciliação

Job diário por processador:

1. buscar transações modificadas desde cursor com sobreposição de 24 h;
2. comparar IDs, status, moeda, total e refund;
3. reprocessar evento ausente quando verificável;
4. abrir discrepância, nunca sobrescrever silenciosamente;
5. reportar compras sem entitlement e entitlements sem fonte válida;
6. fechar apenas após read-back do estado final.

SLOs:

- p95 aprovação → entitlement ativo: <2 min; crítico >5 min;
- reconciliação diária: ≥99,9% em valor e 100% em pedidos, diferenças explicadas;
- inbox dead-letter: zero sem owner por >1 dia útil.

## 15. Testes de contrato mínimos

Cada adapter deve passar fixtures assinadas/simuladas para:

- aprovação simples;
- pendente → aprovada;
- evento repetido 3×;
- aprovada antes de pendente;
- dois bumps e total correto;
- upsell como novo pedido;
- refund total;
- refund de uma linha;
- refund parcial ambíguo → revisão;
- chargeback aberto/ganho/perdido;
- assinatura iniciada/renovada/falha/cancelada/expirada;
- assinatura inválida e timestamp antigo;
- evento desconhecido;
- compra sem correlação;
- duas fontes do mesmo entitlement;
- falha após ledger antes do e-mail (outbox retoma sem duplicar).

**Critério de aceite:** executar o mesmo fixture duas vezes produz o mesmo estado final, um único conjunto efetivo de entitlements e side effects não duplicados.
