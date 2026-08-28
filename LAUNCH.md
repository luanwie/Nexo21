# Nexo 21 — Lançamento

## 1. Objetivo

Validar se mulheres cristãs casadas hispanofalantes pagam US$9,90 por uma jornada interativa de 21 dias e retornam para realizar práticas, não apenas consumir a landing.

## 2. Hipótese central

> Uma participante que percebe distância cotidiana, mas não busca uma promessa milagrosa, pagará por uma estrutura curta que a ajude a observar sua parte, reduzir reatividade e conversar com mais clareza.

Compra isolada não valida o produto. O gate exige:

- pagamento;
- ativação;
- três dias concluídos na primeira semana;
- retorno após pausa;
- baixa incidência de “não recebi acesso”.

## 3. Oferta inicial

- Nexo 21: **US$9,90**;
- bump 1: US$1,90;
- bump 2: US$2,90;
- bump 3: US$3,90;
- upsell: US$19;
- garantia: 7 dias;
- Círculo Nexo não é ofertado no checkout inicial.

Não usar desconto riscado, venda falsa, contador reiniciado ou depoimento inventado.

## 4. Antes da campanha

### Produto

- [ ] GitHub contém o commit testado;
- [ ] Vercel está `Ready` e ligada ao GitHub;
- [ ] Neon conectado e migrations aplicadas;
- [ ] auth persiste entre sessões;
- [ ] checkout real e webhook testados em sandbox;
- [ ] refund/chargeback revogam acesso;
- [ ] Resend aceita o email de acesso/reset;
- [ ] landing, checkout e produto passam em mobile;
- [ ] suporte e política de reembolso publicados;
- [ ] mock checkout desabilitado.

### Analytics

- [ ] Meta Pixel e GA configurados;
- [ ] UTMs preservadas;
- [ ] PageView, CTA e InitiateCheckout visíveis;
- [ ] Purchase nasce no fluxo autoritativo do webhook;
- [ ] CompleteDay nasce no servidor;
- [ ] eventos não duplicam em refresh.

## 5. Criativos iniciais

Usar o pacote em `marketing/`.

Primeiro lote: seis criativos, três ângulos.

### Ângulo A — distância silenciosa

Hook:

> `La distancia no siempre comienza con una gran pelea.`

Demonstração: dashboard → dia atual → pequena ação.

### Ângulo B — conversa que começa mal

Hook:

> `A veces no falta amor. Falta una forma más segura de comenzar la conversación.`

Demonstração: gerador de conversas, frases úteis e frases a evitar.

### Ângulo C — conexão em pequenos hábitos

Hook:

> `No necesitas resolver todo hoy. Necesitas un próximo paso honesto.`

Demonstração: progresso, diário e mensagens.

Formatos:

- UGC 30–45 s;
- gravação de tela 20–30 s;
- estático editorial;
- carrossel educacional;
- vídeo de texto e B-roll doméstico original/licenciado.

## 6. Campanha Meta

### Estrutura mínima

- objetivo: Purchase;
- país/idioma: testar um país ou grupo regional por vez;
- um conjunto amplo;
- opcional: conjunto de interesse cristão/casamento como comparação;
- três ângulos;
- duas peças por ângulo;
- sem alterar preço, público e headline simultaneamente.

### Orçamento

Validação curta:

- US$15–30/dia durante 3–5 dias, ou equivalente local;
- interromper criativo com problema de política/confiança;
- não escalar apenas por CTR.

## 7. Métricas

### Aquisição

- thumb-stop/3 s;
- CTR link;
- CPC;
- landing view;
- CTA;
- InitiateCheckout.

### Venda

- checkout iniciado → pago;
- AOV;
- aceitação por bump;
- upsell;
- refund/chargeback.

### Produto

- cadastro em 24 h;
- StartJourney;
- Dia 1 concluído;
- três dias até D7;
- retorno D7/D14;
- conclusão D21;
- uso de diário, conversa e mensagem.

### Suporte

- “não recebi acesso”;
- reset não entregue;
- tempo de primeira resposta;
- falhas de entitlement.

## 8. Gates

### Continuar

- pelo menos 10 compras válidas;
- ≥60% criam conta em 24 h;
- ≥60% dos ativados concluem o Dia 1;
- ≥30% dos compradores concluem três dias até D7;
- reembolso ≤8%;
- chargeback <1%;
- falha de acesso <3%.

### Corrigir

- CTR bom e checkout fraco: oferta/confiança/preço;
- compra boa e cadastro fraco: entrega/email/onboarding;
- cadastro bom e Dia 1 fraco: dashboard/conteúdo inicial;
- Dia 1 bom e D7 fraco: ritmo, retorno e carga editorial.

### Parar

- cobrança ou entitlement incorreto;
- promessa percebida como controle do parceiro;
- problemas recorrentes de segurança/política;
- chargeback >1%;
- nenhum reuso após duas rodadas qualificadas.

## 9. Sequência de sete dias

| Dia | Ação |
|---:|---|
| 1 | conferir concorrência, anúncios ativos e comentários públicos |
| 2 | congelar mecanismo, oferta, preço e termos |
| 3 | validar protótipo/fluxo com cinco mulheres do público |
| 4 | revisar landing e checkout mobile |
| 5 | produzir e revisar seis criativos |
| 6 | abrir campanha e acompanhar eventos/pagamentos |
| 7 | analisar aquisição, venda e primeiras ativações |

A decisão de produto exige leitura adicional em D3, D7, D14 e D21 da coorte.

## 10. Operação diária

- manhã: reconciliar processador × Purchase × Entitlement;
- tarde: suporte e eventos de ativação;
- noite: gasto, criativos e incidentes;
- nenhuma mudança editorial estrutural durante a primeira coorte, salvo bug/risco;
- registrar toda alteração em changelog.

## 11. Publicação técnica

Ordem obrigatória:

1. commit verificado;
2. repositório GitHub privado;
3. push em `main`;
4. projeto Vercel conectado ao GitHub;
5. integração Neon pela Vercel;
6. PostgreSQL no Prisma;
7. migration + seed;
8. variáveis Production/Preview;
9. redeploy;
10. smoke test da URL canônica;
11. teste de novo push gerando deployment automático.
