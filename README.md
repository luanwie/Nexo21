# Nexo 21

Plataforma digital em espanhol para mulheres cristãs casadas acompanharem uma jornada individual de 21 dias sobre voz, presença, comunicação, limites e pequenos hábitos de conexão no casamento.

> Nexo 21 não promete salvar um casamento, mudar o parceiro ou substituir terapia, assistência jurídica, proteção ou serviços de emergência.

## Estado do produto

P0 implementado e exercitado localmente:

- landing page e checkout modular;
- cadastro, login, logout e redefinição de senha;
- dashboard com próximo passo e progresso;
- jornada completa de 21 dias;
- notas por dia e diário com histórico;
- gerador determinístico de 30 conversas;
- biblioteca de 150 mensagens com busca, cópia, favoritos e uso;
- 100 pequenas ações;
- 30 devocionais e 36 orações;
- plano de continuidade de 30 dias;
- biblioteca interna; DLCs, upsell e assinatura permanecem catalogados como roadmap e não estão à venda;
- compras, entitlements, refund/chargeback e associação por email;
- admin mínimo;
- Meta Pixel, GA e eventos internos preparados.

## Stack

- Next.js 16 / React 19 / App Router
- TypeScript
- Tailwind CSS 4
- Better Auth
- Prisma 6
- PostgreSQL 18 / Neon
- Vitest + Playwright

## Estrutura

```text
├── brand/                 naming, guia e logos SVG
├── content/               fonte editorial original
│   ├── journey/           21 dias
│   ├── messages.json      150 mensagens
│   ├── conversations.json 30 conversas
│   ├── actions.json       100 ações
│   ├── devotionals.json   30 devocionais
│   └── prayers.json       36 orações
├── docs/                  produto, oferta, checkout, analytics e lançamento
├── marketing/             UGC, estáticos, carrosséis, vídeos, prompts e emails
├── prisma/                schema PostgreSQL, migrations e seed
├── scripts/               compilação determinística de conteúdo
├── src/app/               rotas públicas, produto, API e admin
├── src/components/        UI e ferramentas interativas
├── src/lib/               auth, acesso, checkout, conteúdo e domínio
└── tests/                 unitários, conteúdo e E2E
```

## Instalação

```bash
npm install
cp .env.example .env
npm run db:generate
npm run db:migrate:deploy
npm run db:seed
npm run dev
```

Abra a URL configurada em `NEXT_PUBLIC_APP_URL`.

## Variáveis

| Variável | Uso |
|---|---|
| `DATABASE_URL` | conexão pooled do Neon para runtime |
| `DATABASE_URL_UNPOOLED` | conexão direta do Neon para migrations |
| `BETTER_AUTH_SECRET` | segredo de sessão com 32+ bytes |
| `NEXT_PUBLIC_APP_URL` | URL pública da aplicação |
| `CHECKOUT_PROVIDER` | `mock` local, `hotmart` em produção ou `disabled` |
| `ENABLE_MOCK_CHECKOUT` | somente QA local; nunca habilitar na Vercel |
| `HOTMART_WEBHOOK_ENABLED` | libera o endpoint somente após configuração e teste |
| `HOTMART_HOTTOK` | token do header oficial `X-HOTMART-HOTTOK` |
| `HOTMART_PRODUCT_UCODE` / `HOTMART_OFFER_CODE` | allowlist do produto e oferta Nexo 21 |
| `CHECKOUT_URL_<SLUG>` | checkout externo por produto |
| `RESEND_API_KEY` / `EMAIL_FROM` | email transacional |
| `ADMIN_EMAIL` | usuário verificado que o operador promove explicitamente com `npm run admin:promote` |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel opcional |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics opcional |

Nunca commitar `.env`, banco local ou credenciais.

## Conteúdo

`npm run content:build` valida mínimos e compila os JSONs para `src/generated/content.json`.

Gate atual:

```text
21 dias · 150 mensagens · 30 conversas · 100 ações
30 devocionais · 36 orações · 10+ produtos extras
```

Cada leitura da jornada possui pelo menos 500 palavras.

## Banco

O projeto usa PostgreSQL/Neon em todos os ambientes persistentes. Mudanças estruturais entram em `prisma/migrations` e são aplicadas com `npm run db:migrate:deploy`; `prisma db push` não faz parte do release.

## Checkout e acesso

- `POST /api/checkout/start`: inicia mock explícito em QA ou devolve URL externa.
- `POST /api/checkout/webhook`: recebe evento autenticado.
- `(provider, transactionId)` é único.
- cada evento possui `eventId`, hash canônico e horário do provedor;
- mesmo `eventId` com payload diferente é conflito;
- eventos atrasados não reativam compras reembolsadas ou contestadas;
- compra pode existir antes do cadastro.
- após confirmar o mesmo email da compra, entitlements são associados.
- refund/chargeback revoga o acesso relacionado.

O mock exige `ENABLE_MOCK_CHECKOUT=true`; a variável deve permanecer ausente/false em produção.

## Autenticação

Better Auth entrega email/senha, confirmação obrigatória, sessão e reset. Sem `RESEND_API_KEY`, emails são registrados no terminal somente em desenvolvimento; produção falha de forma explícita e não libera a conta.

## Analytics

O navegador pode enviar `PageView`, `ViewContent`, `Scroll`, `CTA`, `InitiateCheckout`, `UseTool` e `ViewUpsell`; o banco interno só persiste esses eventos quando existe sessão autenticada.

Eventos autoritativos como `Purchase` e `CompleteDay` devem nascer no servidor, não no endpoint público.

## Qualidade

```bash
npm run lint
npm test
npm run typecheck
npm run build
npm run test:e2e
```

E2E cobre landing, checkout, registro, dashboard, jornada, notas, diário, mensagens, conversas, loja e admin em desktop/mobile.

## Administração

`/admin` exige `UserRole.ADMIN`. Permite visualizar usuários, produtos, pedidos, inventário editorial e entitlements, além de conceder/revogar acesso e ativar/desativar ofertas.

## Documentos

- `docs/PRODUCT.md`
- `docs/OFFER.md`
- `docs/CHECKOUT.md`
- `docs/ANALYTICS.md`
- `docs/LAUNCH.md`
- `brand/BRAND.md`
- `marketing/CREATIVE-STRATEGY.md`
- `marketing/META-ADS.md`

## Licença e conteúdo

Código e materiais do produto são proprietários do projeto. Não reutilize textos, depoimentos, marcas, imagens ou criativos da referência competitiva. A pesquisa serviu somente para modelar mercado, problema, formato e lógica comercial.
