# Nexo 21 — Analytics, eventos e UTMs

## 1. Objetivos

1. atribuir aquisição sem substituir a verdade financeira do processador;
2. medir compra → ativação → primeira ação → continuidade → conclusão;
3. separar comportamento de produto de monetização;
4. detectar falhas de entitlement rapidamente;
5. limitar dados pessoais e respeitar consentimento.

**Fontes de verdade:**

- dinheiro: processador + reconciliação financeira;
- catálogo/preço: configuração comercial versionada;
- compra/entitlement: banco transacional;
- comportamento: pipeline de eventos;
- e-mail: provedor, com eventos de abertura tratados como estimativa.

## 2. Envelope padrão

Todo evento inclui:

```json
{
  "event_name": "nexo_completed",
  "event_version": 1,
  "event_id": "uuid",
  "occurred_at": "2026-08-23T18:42:00Z",
  "received_at": "2026-08-23T18:42:01Z",
  "anonymous_id": "uuid",
  "user_id": "opaque-id-or-null",
  "session_id": "uuid",
  "source": "web|server|checkout|email",
  "environment": "production|staging",
  "locale": "es",
  "timezone": "America/Mexico_City",
  "properties": {}
}
```

Regras:

- `event_id` único; deduplicação por 30 dias.
- Datas em UTC; fuso como propriedade separada.
- Não enviar e-mail, nome, texto livre de evidência, token, endereço ou dados de cartão.
- IDs de compra do provedor podem existir apenas no evento server-side e em armazenamento restrito.
- `user_id` é interno e opaco; identidade é vinculada após autenticação.
- Eventos financeiros do browser são apenas intenção; `purchase_completed` nasce do webhook confirmado.

## 3. Eventos P0

### Aquisição e venda

| Evento | Disparo | Propriedades obrigatórias |
|---|---|---|
| `landing_viewed` | primeira view válida | `landing_variant`, `referrer_domain`, UTMs normalizadas |
| `offer_viewed` | bloco de oferta ≥50% por 1 s | `offer_id`, `price_cents`, `currency` |
| `cta_clicked` | clique em CTA | `cta_id`, `placement`, `offer_id` |
| `checkout_started` | sessão criada pelo servidor | `checkout_session_id`, `offer_id`, `price_cents`, `currency` |
| `bump_toggled` | seleção/desseleção | `sku`, `selected`, `price_cents` |
| `checkout_redirected` | saída para processador | `checkout_session_id`, `processor` |
| `payment_pending` | webhook válido de pendência | `purchase_id`, `processor`, `attempt_number` |
| `purchase_completed` | webhook de aprovação aplicado | `purchase_id`, `order_total_cents`, `currency`, `line_skus`, `coupon_code|null` |
| `purchase_failed` | falha final conhecida | `purchase_id|null`, `failure_category` |
| `refund_completed` | reembolso confirmado | `purchase_id`, `refunded_cents`, `line_skus`, `reason_category` |
| `chargeback_opened` | disputa recebida | `purchase_id`, `amount_cents`, `reason_category` |

### Entitlement e acesso

| Evento | Disparo | Propriedades obrigatórias |
|---|---|---|
| `entitlement_granted` | transição para active | `entitlement_id`, `sku`, `purchase_id`, `grant_reason` |
| `entitlement_revoked` | acesso revogado | `entitlement_id`, `sku`, `purchase_id`, `revoke_reason` |
| `access_email_sent` | provedor aceita envio | `message_id`, `template_id`, `purchase_id` |
| `magic_link_requested` | pedido válido | `channel`, `rate_limit_bucket` |
| `login_completed` | autenticação concluída | `method`, `is_first_login` |

### Jornada

| Evento | Disparo | Propriedades obrigatórias |
|---|---|---|
| `onboarding_started` | primeira tela | `entry_source` |
| `onboarding_step_completed` | avanço persistido | `step`, `duration_seconds` |
| `journey_activated` | onboarding finalizado | `journey_id`, `focus_category`, `reminder_opt_in` |
| `day_viewed` | missão aberta | `journey_id`, `day_number`, `state`, `days_since_activation` |
| `nexo_planned` | ação escolhida | `day_number`, `mode_planned` (`12m|3m`) |
| `timer_started` | timer inicia | `day_number`, `mode`, `planned_seconds` |
| `timer_paused` | pausa | `day_number`, `elapsed_seconds` |
| `nexo_completed` | observação persistida | `day_number`, `completion` (`full|partial|not_started`), `mode`, `energy_1_5`, `friction_category`, `elapsed_seconds` |
| `journey_resumed` | conclusão após ≥3 dias sem completar | `day_number`, `inactive_days`, `mode` |
| `review_completed` | dias 7/14/21 | `day_number`, `rules_created_count` |
| `continuity_protocol_saved` | protocolo salvo | `format` (`in_app|pdf|print`) |
| `journey_completed` | Dia 21 finalizado | `elapsed_calendar_days`, `points_count`, `resume_count` |

### E-mail e preferências

| Evento | Disparo | Propriedades obrigatórias |
|---|---|---|
| `lifecycle_email_sent` | envio aceito | `message_id`, `template_id`, `journey_day`, `trigger` |
| `lifecycle_email_clicked` | clique redirecionado | `message_id`, `template_id`, `link_id` |
| `email_unsubscribed` | opt-out confirmado | `scope` (`marketing|all_non_transactional`), `source_template` |
| `reminder_preference_changed` | alteração persistida | `channel`, `enabled`, `quiet_hours_set` |

Aberturas (`email_opened`) podem ser coletadas, mas não entram em decisões individuais devido a bloqueios de imagem e privacy proxies.

## 4. Eventos P1/P2

| Evento | Uso | Propriedades |
|---|---|---|
| `upsell_viewed` | exposição | `sku`, `placement`, `eligibility_rule` |
| `upsell_accepted` | intenção; compra só após webhook | `sku`, `price_cents` |
| `offer_dismissed` | guardrail de pressão | `sku`, `placement`, `dismiss_scope` |
| `store_viewed` | loja | `entry_source`, `owned_count` |
| `dlc_recommended` | recomendação | `sku`, `rule_id`, `reason_label` |
| `dlc_started` / `dlc_completed` | uso | `sku`, `content_version` |
| `subscription_offer_viewed` | pós-D21 | `plan_id`, `journey_completed_at` |
| `subscription_started` | webhook de primeira cobrança | `plan_id`, `billing_interval`, `price_cents` |
| `subscription_renewed` | renovação | `plan_id`, `cycle_number`, `amount_cents` |
| `subscription_payment_failed` | falha | `plan_id`, `attempt_number`, `failure_category` |
| `subscription_cancelled` | cancelamento | `plan_id`, `effective_at`, `reason_category` |
| `credit_granted` / `credit_redeemed` / `credit_expired` | crédito DLC | `credit_id`, `value_cents`, `expires_at`, `sku|null` |

## 5. UTM contract

### Parâmetros aceitos

- `utm_source`: plataforma/origem (`meta`, `google`, `newsletter`, `instagram`, `partner_slug`)
- `utm_medium`: tipo (`paid_social`, `cpc`, `email`, `organic_social`, `referral`)
- `utm_campaign`: campanha estável (`launch_founders_2026q3`)
- `utm_content`: criativo/variante (`video_negociacion_hook_a`)
- `utm_term`: público/keyword sem PII (`broad_es`, `procrastinacion_exact`)
- `utm_id`: ID imutável interno da campanha (`cmp_n21_001`)
- opcionais separados: `ad_id`, `adset_id`, `campaign_id`, `affiliate_id`.

### Regras de nomenclatura

- minúsculas, ASCII, `snake_case`, máximo 80 caracteres;
- nunca incluir nome, e-mail, telefone ou texto digitado pelo usuário;
- source/medium usam vocabulário controlado;
- campanha não muda durante sua vida; novo posicionamento = novo `utm_id`;
- links de e-mail usam `utm_source=lifecycle`, `utm_medium=email`, campanha por fluxo e conteúdo por template.

### Exemplo

```text
https://nexo21.com/?utm_source=meta&utm_medium=paid_social&utm_campaign=launch_founders_2026q3&utm_content=video_volver_hook_b&utm_term=broad_es&utm_id=cmp_n21_001
```

### Persistência e atribuição

Guardar, com consentimento aplicável:

- `first_touch`: primeiro conjunto válido, imutável por 90 dias;
- `last_non_direct_touch`: último toque não direto antes de checkout, janela de 30 dias;
- `checkout_touch`: snapshot quando `checkout_started` ocorre;
- `referrer_domain` e IDs de clique permitidos.

Não sobrescrever campanha conhecida com acesso direto. O webhook recebe `attribution_id` opaco via metadata da sessão, não UTMs livres.

Modelos do dashboard:

- aquisição: last non-direct;
- descoberta: first touch;
- e-mail lifecycle: campanha própria, separado de receita de aquisição;
- afiliado/comissão: regra contratual do processador, nunca inferência do analytics.

## 6. Identidade e consentimento

- Antes do consentimento, somente eventos essenciais e agregados conforme lei/configuração.
- `anonymous_id` é rotacionável; ligar ao `user_id` no login com evento interno, sem enviar PII ao analytics.
- Respeitar Global Privacy Control quando aplicável.
- Opt-out de marketing não bloqueia recibo, acesso, segurança ou mudança material do serviço.
- Retenção sugerida: eventos comportamentais 14 meses; dados financeiros conforme obrigação legal; payload bruto de webhook 90 dias criptografado, depois representação mínima auditável.
- Pedido de exclusão deve anonimizar eventos quando legalmente possível sem corromper registros financeiros obrigatórios.

## 7. Métricas e fórmulas

| Métrica | Fórmula |
|---|---|
| Sales CVR | compradores únicos / sessões qualificadas |
| Checkout completion | `purchase_completed` / `checkout_started` únicos |
| AOV bruto | soma `order_total_cents` / compras aprovadas |
| Receita líquida | aprovado − refunds − chargebacks − impostos/taxas quando disponíveis |
| Activation 24h | ativados até 24 h / compras com entitlement |
| First Nexo rate | usuários com `nexo_completed` D1 / ativados |
| D7 Core Activation | compradores com ≥3 dias `completion=full|partial` até 168 h / compradores |
| D21 completion | jornadas concluídas / jornadas ativadas da coorte madura |
| Resume rate | usuários que concluem em até 72 h após 3+ dias inativos / usuários elegíveis |
| Bump attach | linhas do bump / pedidos do produto base |
| Upsell take | compras do upsell / exposições elegíveis |
| Refund rate | pedidos reembolsados / pedidos aprovados maduros |
| Subscriber conversion | novas assinaturas / concluintes D21 expostos |

**Coortes:** usar data de ativação para comportamento e data de compra para receita. Não comparar coorte ainda imatura com D21 completo.

## 8. Funil e dashboards

### Funil comercial

`landing_viewed → cta_clicked → checkout_started → purchase_completed → entitlement_granted`

Quebrar por `utm_id`, source/medium, creative, dispositivo, país e variante; ocultar segmentos com amostra <20 para privacidade/ruído.

### Funil de valor

`entitlement_granted → login_completed → journey_activated → first nexo → 3+ by D7 → review D14 → journey_completed → protocol_saved`

### Saúde operacional

- atraso webhook p50/p95;
- compra sem entitlement após 5 min;
- entitlement sem compra aprovada;
- duplicatas rejeitadas;
- falha de e-mail de acesso;
- diferença diária de receita processador × sistema.

Alertas:

- qualquer compra aprovada sem entitlement por >5 min;
- reconciliação <99%;
- falha de e-mail transacional >2% em 30 min;
- queda >30% na ativação versus média móvel de 7 dias com n≥20.

## 9. QA de instrumentação

Antes do lançamento:

1. validar schema e versões em staging;
2. simular compra aprovada, pendente, duplicada, refund parcial e total;
3. confirmar que redirect não gera `purchase_completed`;
4. verificar dedupe de browser/server;
5. inspecionar UTMs no checkout snapshot e compra;
6. confirmar que texto livre e PII não aparecem;
7. testar opt-out e eventos essenciais;
8. reconciliar 10 pedidos sandbox do processador ao entitlement;
9. criar relatório de eventos ausentes/desconhecidos;
10. versionar mudança incompatível, nunca reutilizar propriedade com semântica nova.
