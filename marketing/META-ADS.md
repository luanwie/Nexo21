# Plano Inicial de Meta Ads — Nexo 21

> **Nota operacional (PT-BR):** plano para lançamento controlado no mercado hispanofalante. Copies buyer-facing em espanhol neutro. Como preço, países prioritários, checkout, margem e volume de pixel não foram informados, orçamento é expresso como **B** (budget diário total) e metas devem ser definidas a partir da economia real. Não veicular antes de validar produto, página, eventos e política de privacidade.

## 1. Pré-requisitos de mensuração

### Produto/checkout

- URL final, preço, moeda, impostos e política de reembolso confirmados.
- Conteúdo/entrega de 21 dias verificados; nenhuma feature implícita que não exista.
- Página e checkout em espanhol consistente.
- Termos, privacidade, suporte e contato visíveis.

### Meta

- Pixel + Conversions API quando tecnicamente disponível.
- Domínio verificado.
- UTMs explícitas por anúncio.
- Eventos mínimos: `PageView`, `ViewContent`, `InitiateCheckout`, `Purchase` (ou evento real equivalente).
- Valor e moeda de `Purchase` enviados corretamente; deduplicação Pixel/CAPI validada.
- Test Event e compra de teste executados antes do lançamento.

### Convenção de UTM

```text
utm_source=meta
&utm_medium=paid_social
&utm_campaign=nexo21_launch_[pais]_[yyyymm]
&utm_content=[angulo]_[formato]_[hook]_[creator]
&utm_term=[audiencia]
```

Não colocar dados pessoais na URL.

## 2. Objetivo e decisão de campanha

### Caminho A — Compra mensurável

Usar **Sales/Vendas**, destino site e otimização para `Purchase` se checkout e evento estiverem íntegros.

### Caminho B — Compra ainda não mensurável

Não “otimizar no escuro”. Corrigir tracking primeiro. Se o funil real for cadastro para receber acesso, usar Leads somente quando lead for a etapa verdadeira — nunca como substituto cosmético de compra.

## 3. Estrutura inicial

### Campanha 1 — Prospecting / teste criativo

- **Nome:** `N21_SALES_PROSPECTING_TEST_[PAIS]_[YYYYMM]`
- **Objetivo:** Sales.
- **Budget:** 80–100% de B no início; manter 100% se ainda não houver público morno suficiente.
- **Ad set inicial:** amplo por país/idioma, idade adulta compatível com oferta, Advantage+ placements. Evitar hipersegmentação por condição relacional.
- **Separação geográfica:** um país por ad set apenas quando moeda, preço, página ou economia diferirem; não fragmentar orçamento baixo.
- **Exclusões:** compradores confirmados; colaboradores/testes internos se possível.
- **Criativos:** 12 anúncios = 4 ângulos × 3 formatos.

### Campanha 2 — Retargeting

Criar somente quando houver volume suficiente para entrega estável.

- **Nome:** `N21_SALES_RETARGET_[PAIS]_[YYYYMM]`
- **Budget:** até 20% de B; reduzir se frequência crescer sem conversão.
- **Públicos:** visitantes/engajados qualificados conforme janelas permitidas; excluir Purchase.
- **Mensagens:** mecanismo, produto real, “o que é/não é”, percurso de 21 dias.
- **Regra:** não usar “te vimos”, “todavía no compraste” ou linguagem que revele rastreamento.

> **Nota:** não criar lookalike antes de haver seed suficiente e de qualidade. Não presumir que interesse “cristão” isolado é melhor que amplo; testar quando orçamento permitir.

## 4. Primeiro lote de 12 anúncios

| ID | Ângulo | Formato | Asset | Hook buyer-facing |
|---|---|---|---|---|
| A1-U | Comece por você | UGC 35–40s | UGC 01 | “Intentar cambiar a otra persona me parece una mala forma de empezar.” |
| A1-S | Comece por você | Estático 4:5 | E01 | “No puedes cambiar a otra persona. Puedes empezar por ti.” |
| A1-V | Comece por você | Vídeo 20s | V03 | “Lo que no controlas / Lo que sí practicas” |
| A2-U | Atenção | UGC 30–35s | UGC 02 | “Antes de responder, prueba una pausa.” |
| A2-S | Atenção | Estático 4:5 | E03 | “Tu atención también comunica.” |
| A2-V | Atenção | Vídeo 15s | V01 | gesto do celular para baixo |
| A3-U | Fé cotidiana | UGC 40–45s | UGC 03 | “¿Y si tu próxima práctica de fe ocurre en una conversación común?” |
| A3-S | Fé cotidiana | Estático 4:5 | E04 | “La fe también se practica en una conversación común.” |
| A3-V | Fé cotidiana | Vídeo 25s | V09 | “La reflexión continúa cuando te levantas de aquí.” |
| A4-U | Um passo diário | UGC 30–38s | UGC 04 | “No necesitas arreglar toda tu vida en una tarde.” |
| A4-S | Um passo diário | Estático 4:5 | E02 | “No tienes que resolverlo todo hoy.” |
| A4-V | Um passo diário | Motion 15s | V02 | 21 pontos, ponto 1 aceso |

### Regras de isolamento

- Mesma página, oferta, preço e CTA para os 12.
- Não mudar audience e criativo ao mesmo tempo.
- UGC usa creator como apresentador, não depoente.
- Manter naming com ângulo/formato/hook para análise.

## 5. Copies iniciais

### Copy P1 — Começa por você

**Texto principal:**
> “No puedes controlar cómo responde otra persona. Sí puedes practicar cómo escuchas, cómo reflexionas y cómo eliges responder. Nexo 21 es una jornada cristiana educativa de 21 días, un paso guiado por día.”

**Headline:**
> “Empieza por ti”

**Description:**
> “Comunicación, atención, reflexión, hábitos y conexión.”

**CTA da plataforma:** escolher equivalente a “Más información” ou “Comprar” conforme a etapa real; não usar CTA enganoso.

### Copy P2 — Atenção

**Texto principal:**
> “Mirar, pausar y escuchar hasta el final son acciones pequeñas que se pueden practicar. Descubre una jornada cristiana de 21 días para llevar la atención y la reflexión a lo cotidiano.”

**Headline:**
> “Tu atención también comunica”

**Description:**
> “Un día. Una reflexión. Una práctica.”

### Copy P3 — Fé cotidiana

**Texto principal:**
> “La fe también puede tomar forma en una conversación común: hacer una pausa, escuchar con intención y reflexionar antes de responder. Conoce Nexo 21.”

**Headline:**
> “La fe se practica”

**Description:**
> “Una jornada cristiana educativa de 21 días.”

### Copy P4 — Um passo diário

**Texto principal:**
> “No tienes que resolverlo todo hoy. Recorre 21 días con un foco claro y una práctica personal para llevar a tu vida cotidiana.”

**Headline:**
> “Empieza tu día 1”

**Description:**
> “Práctica, no perfección.”

### Copy de retargeting R1 — Transparência

**Texto principal:**
> “Nexo 21 no es terapia ni una fórmula para cambiar a otra persona. Es una jornada cristiana educativa para aprender, reflexionar y practicar lo que sí depende de ti.”

**Headline:**
> “Conoce la propuesta”

### Copy de retargeting R2 — Mecanismo

**Texto principal:**
> “Pausa. Atiende. Reflexiona. Practica. Conecta. Cinco acciones para recorrer una jornada personal de 21 días.”

**Headline:**
> “Mira cómo funciona Nexo 21”

## 6. Plano de teste em quatro ciclos

> **Nota operacional:** duração não é automática. Cada ciclo precisa de gasto e conversões suficientes para decisão; se o orçamento não sustenta 12 anúncios, começar com 6 (dois ângulos × três formatos) e sequenciar os demais.

### Ciclo 1 — Ângulo

**Pergunta:** qual narrativa gera melhor ação qualificada: autonomia, atenção, fé cotidiana ou um passo diário?

- Rodar os 12 ou lote reduzido.
- Avaliar retenção/CTR, LPV, IC, Purchase, CPA e taxa LPV→Purchase.
- Não pausar por poucas horas ou por CTR isolado.

### Ciclo 2 — Hook

Nos dois ângulos mais promissores, testar quatro hooks do banco: curto, emocional, curiosidade e educacional. Manter corpo e CTA.

### Ciclo 3 — Demonstração

Para o melhor ângulo/hook:

- D1: celular para baixo.
- D2: página/tela real do dia.
- D3: calendário 1–21.
- D4: cinco cartões do mecanismo.

### Ciclo 4 — Redução de objeção

No retargeting:

- O que é/não é.
- O que se pratica.
- Como funciona um dia real.
- Produto e entrega reais.

## 7. Métricas e leitura

### Funil de diagnóstico

| Camada | Métrica | Pergunta |
|---|---|---|
| Atenção | retenção 3s, thumb-stop, reprodução | O início interrompe o scroll certo? |
| Interesse | retenção por quartil, saves, CTR de saída | A mensagem sustenta curiosidade? |
| Ponte | LPV/click, tempo/engajamento de página | A promessa do anúncio combina com a página? |
| Intenção | InitiateCheckout/LPV | A oferta e o preço estão claros? |
| Resultado | Purchase, CVR, CPA, ROAS/contribuição | A economia fecha com margem real? |
| Qualidade | reembolso, suporte, feedback | A expectativa criada é responsável? |

### Regra econômica

Definir antes de veicular:

```text
CPA máximo sustentável = receita líquida por compra
                         − custo variável
                         − margem mínima desejada
                         − provisão de reembolso/taxas
```

Não definir CPA meta sem preço/margem. ROAS isolado não substitui contribuição.

### Matriz de decisão

- **Boa atenção + baixa LPV:** revisar CTA, link, velocidade e congruência.
- **Boa LPV + baixo checkout:** revisar clareza, entrega, preço e objeções da página.
- **Bom checkout + baixa compra:** revisar checkout, moeda, confiança e falhas técnicas.
- **Baixo em tudo:** trocar ângulo/hook antes de microeditar cor.
- **Clique alto + conversão ruim:** provável clickbait ou desalinhamento; não escalar.
- **CPA bom + feedback ruim/reembolso:** corrigir expectativa antes de investir mais.

## 8. Regras de pausa, iteração e escala

- Estabelecer janela mínima de leitura compatível com volume; evitar decisões por oscilação inicial.
- Pausar por quebra de política, comentário indicando promessa enganosa, erro de tracking ou página quebrada imediatamente.
- Criativos com baixa entrega podem ser retestados em lote isolado; “não gastou” não equivale a “perdeu”.
- Escalar gradualmente o budget do conjunto/campanha que mantém CPA e qualidade; evitar mudanças simultâneas de budget, audience e criativo.
- Manter controle vencedor enquanto lança variações de novo hook, cena ou creator.
- Renovar por **ângulo e demonstração**, não apenas trocar fundo/cor.

## 9. Plano de campanha inicial por estágio

### Estágio 0 — QA

- Compra teste ponta a ponta.
- Revisão da promessa por produto/legal.
- Preview em Feed, Stories e Reels.
- Comentários/respostas padrão aprovados.

### Estágio 1 — Aprendizado

- Prospecting amplo.
- 4 ângulos; diversidade UGC/estático/motion.
- Foco em mensagem e conversão, não em escala.

### Estágio 2 — Consolidação

- Manter melhores combinações.
- Produzir 2–3 hooks novos por ângulo vencedor.
- Adicionar demonstração do produto real.

### Estágio 3 — Retargeting

- Ativar quando houver volume.
- Usar transparência, mecanismo e produto.
- Monitorar frequência e sobreposição.

### Estágio 4 — Escala responsável

- Expandir países somente com localização de página/preço/suporte.
- Testar creator e cena mantendo mecanismo.
- Revisar comentários, reembolso e suporte semanalmente.

## 10. Países e idioma

> **Nota operacional:** “mercado hispanofalante” não é um único contexto. Começar por país(es) escolhidos por oferta, moeda, meios de pagamento e suporte — não apenas CPM.

- Espanhol neutro no primeiro lote.
- Localizar moeda, CTA, termos e exemplos por país antes de separar campanha.
- Testar vozes/acento somente com creator real e autorização; evitar caricatura.
- Não misturar países com checkout ou margem diferentes na mesma leitura econômica.

## 11. Guardrails de anúncio e moderação

### Claims proibidos

- “Salva tu matrimonio en 21 días.”
- “Haz que tu pareja cambie.”
- “Recupera a quien amas.”
- “Si tu relación está destruida…”
- “Resultados garantizados.”
- “Dios va a restaurar tu relación si compras…”

### Claims aprováveis

- “Una jornada cristiana educativa de 21 días.”
- “Practica atención, comunicación y reflexión.”
- “Empieza por lo que sí depende de ti.”
- “Un paso guiado por día.” (somente se produto confirmar)
- “No es terapia ni una fórmula para cambiar a nadie.”

### Respostas públicas sugeridas

**Pergunta: “¿Esto salvará mi matrimonio?”**
> “Nexo 21 no promete salvar una relación ni cambiar a otra persona. Es una jornada educativa para aprender y practicar atención, reflexión y comunicación desde principios cristianos.”

**Pergunta: “¿Es terapia?”**
> “No. Nexo 21 es un recurso educativo y no sustituye terapia, acompañamiento pastoral ni atención profesional.”

**Pergunta: “¿Necesito hacerlo con mi pareja?”**
> “La propuesta empieza con una práctica personal. Revisa la página del producto para conocer exactamente cómo se entrega cada día.”

**Comentário de crise/violência:**
> Não responder com copy promocional. Usar protocolo humano e recursos locais adequados; o produto não é solução de emergência.

## 12. Dashboard semanal mínimo

Por país, audience, ângulo, formato, hook e creator:

- Spend, impressions, reach, frequency.
- 3s views/retenção, quartis de vídeo.
- Outbound clicks, CTR, CPC.
- LPV e LPV/click.
- InitiateCheckout, Purchase, CVR e CPA.
- Receita líquida, reembolso e contribuição quando disponíveis.
- Comentários classificados: dúvida, identificação, objeção, alerta de promessa.

## 13. Checklist de lançamento

- [ ] Economia e CPA máximo aprovados.
- [ ] Eventos e compra teste validados.
- [ ] 12 peças revisadas em todos placements.
- [ ] Página reflete exatamente a copy.
- [ ] UTMs e naming conferidos.
- [ ] Exclusão de compradores ativa.
- [ ] Moderação e protocolo de crise definidos.
- [ ] Direitos de creators/assets documentados.
- [ ] Nenhum depoimento, urgência, bônus ou claim inventado.
