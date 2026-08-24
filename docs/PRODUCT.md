# Nexo 21 — Produto e arquitetura UX

## 1. Visão

Nexo 21 é uma plataforma web mobile-first em espanhol neutro. A experiência principal é uma jornada cristã educacional de 21 dias para mulheres casadas que desejam observar padrões, reduzir reatividade, conversar com mais clareza e transformar ações isoladas em hábitos sustentáveis.

Não é curso tradicional, terapia, aconselhamento individual ou SaaS de gestão. É uma área de membros interativa com memória, progresso e ferramentas contextuais.

## 2. Resultado funcional

Ao usar o P0, a participante consegue:

1. saber qual é o próximo dia;
2. concluir uma leitura e prática;
3. salvar notas privadas;
4. acompanhar percentual e dias concluídos;
5. preparar uma conversa entre 30 situações;
6. buscar e copiar mensagens;
7. marcar pequenas ações;
8. manter diário com histórico;
9. guardar favoritos;
10. seguir um plano de continuidade.

## 3. Arquitetura de informação implementada

```text
Público
├── /                         landing
├── /checkout                 composição da oferta
├── /login
├── /registro
├── /olvide-mi-clave
└── /restablecer-clave

Produto autenticado
├── /app                      dashboard/hoje
├── /app/comenzar             onboarding e segurança
├── /app/jornada              mapa dos 21 dias
│   └── /app/jornada/:day     conteúdo, notas e conclusão
├── /app/diario               criar, editar, excluir e histórico
├── /app/conversaciones       gerador determinístico
├── /app/mensajes             busca, filtros, cópia, favoritos e uso
├── /app/acciones             100 ações e conclusão
├── /app/devocionales         30 dias
├── /app/oraciones            36 orações/12 temas
├── /app/continuidad          plano pós-jornada
├── /app/favoritos
├── /app/tienda
├── /app/extras/:slug
└── /app/cuenta

Admin
└── /admin                    usuários, produtos, pedidos, conteúdo e acessos
```

## 4. Jornada editorial

### Semana 1 — compreensão e redução de reatividade

- observar o ciclo;
- criar pausa;
- nomear emoções e necessidades;
- separar fatos de interpretações;
- assumir responsabilidade sem carregar tudo;
- limites e segurança;
- reparar depois de reagir.

### Semana 2 — interações positivas e diálogo

- gratidão específica;
- escuta para compreender;
- pedido concreto sem demanda;
- início suave;
- validação sem concordância obrigatória;
- conflito e segurança;
- pequenos acordos e reparação.

### Semana 3 — continuidade

- rituais cotidianos;
- acordos revisáveis;
- tempo e atenção;
- confiança e consistência;
- visão compartilhada;
- retorno após pausa;
- plano dos próximos 30 dias.

Cada dia contém 14–16 campos editoriais e leitura de 500+ palavras.

## 5. Ferramentas

### Diário da reconexão

- criar;
- editar;
- excluir;
- data;
- título;
- corpo;
- histórico privado.

### Gerador de conversas

Não usa IA nem faz aconselhamento. A participante escolhe uma situação e recebe:

- preparação;
- abertura possível;
- frases recomendadas;
- frases a evitar;
- perguntas;
- encerramento;
- disclaimer de segurança.

### Mensagens

- 150 itens;
- busca por texto/contexto;
- filtro por categoria;
- copiar;
- favoritar;
- marcar como usada.

### Pequenas ações

- 100 itens;
- categoria;
- duração;
- objetivo;
- marcação de conclusão.

### Progresso

- dia atual;
- dias concluídos;
- percentual;
- sequência inicial;
- próxima ação;
- métricas de diário e ações.

Sem pontos, competição, ranking ou estética infantil.

## 6. P0 — obrigatório antes de vender

Implementado:

- landing e checkout modular;
- autenticação e reset;
- compra/entitlement por email;
- jornada completa;
- dashboard;
- progresso e notas;
- diário;
- conversas;
- mensagens;
- ações;
- devocionais e orações;
- favoritos;
- loja e catálogo;
- admin mínimo;
- analytics;
- responsividade e acessibilidade básica;
- testes unitários/conteúdo/E2E;
- avisos de segurança.

Dependências externas restantes:

- provedor de checkout real;
- domínio/remetente de email;
- PostgreSQL/Neon;
- IDs de Meta/GA;
- termos revisados localmente.

## 7. P1 — após primeiras vendas

- conteúdo integral dos DLCs mais comprados;
- áudio profissional do upsell;
- edição de conteúdo pelo admin com versionamento;
- central de suporte;
- exportação PDF do diário;
- presentes e cupons;
- notificações/quiet hours;
- painel de coortes;
- reconciliação operacional do processador.

## 8. P2 — futuro

- Círculo Nexo ativo;
- calendário editorial de 60 dias;
- PWA/offline parcial;
- multilíngue;
- equipe editorial;
- recomendação contextual baseada em regras;
- biblioteca de áudios;
- encontros gravados;
- ferramenta assistida por IA somente com consentimento e fallback.

## 9. Dados

Modelos principais:

- User, Session, Account, Verification;
- Product, Purchase, PurchaseItem;
- Entitlement, Subscription;
- JourneyProgress, JournalEntry;
- Favorite, MessageUse, ActionCompletion;
- ContentItem, AnalyticsEvent.

O conteúdo original vive em JSON versionado e é compilado deterministicamente no build. `ContentItem` está preparado para overrides/admin futuros.

## 10. Autorização

- rotas operacionais consultam sessão no servidor;
- produto principal exige entitlement ativo ou papel ADMIN;
- rotas de DLC revalidam entitlement pelo slug;
- esconder navegação não é controle de acesso;
- refund/chargeback revoga o entitlement relacionado.

## 11. Segurança do produto

Situações de violência, coerção, ameaça, abuso, controle ou risco físico não são tratadas como simples problema de comunicação. A plataforma orienta a não confrontar/mediar por meio dos roteiros e a procurar ajuda local adequada de um dispositivo seguro.

## 12. Critérios de aceite P0

- comprador conclui checkout e cria conta com o mesmo email;
- compra é associada e acesso liberado;
- usuário sem acesso é redirecionado à loja;
- progresso persiste após nova sessão;
- notas e diário pertencem somente ao usuário;
- mensagens e conversas funcionam em mobile;
- admin pode conceder/revogar acesso;
- payload repetido não cria compra duplicada;
- build, typecheck, lint e testes passam;
- fluxo completo passa em Playwright desktop e mobile.
