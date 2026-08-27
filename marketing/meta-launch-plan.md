# Meta Traffic Launch — Nexo21

**Estado:** pacote operacional. Nenhuma campanha, Pixel, domínio, UTM ou integração foi criada por este documento.

## Oferta e limite de mensagem

- **Oferta:** Nexo21 — jornada cristã educacional, individual, de 21 dias; US$9.90, pagamento único.
- **Público da oferta:** mulheres adultas; a página deve esclarecer que é uma prática individual para quem vive o casamento, sem pressupor situação pessoal de quem vê o anúncio.
- **Permitido:** educação, reflexão, atenção, diálogo, prática diária, informação objetiva de preço e duração.
- **Nunca usar:** diagnóstico, culpa religiosa, promessa de restaurar/salvar casamento, mudar parceiro, resultado garantido, antes/depois, urgência falsa, testemunho não verificável. Não escrever “você é casada”, “seu casamento precisa…” ou equivalente.
- **Nota de segurança:** não é terapia, aconselhamento de crise, nem substituto de apoio profissional, pastoral ou de emergência.

## Estrutura: campanha de tráfego

**Nome:** `N21_TRAFFIC_LAUNCH_[PAIS]_[YYYYMM]`
**Objetivo:** Traffic > Website.
**Destino:** URL canônica da landing de Nexo21, com UTM do anúncio.
**País:** `[PAIS_DE_LANCAMENTO]`; não agrupar países com moeda, checkout, suporte ou termos diferentes.
**Idioma:** espanhol; confirmar página e checkout em espanhol antes de publicar.
**Exclusões:** somente compradores confirmados e tráfego interno, se essas listas existirem e estiverem corretas. Não criar retargeting nem lookalike neste lançamento.

### Ad set 01 — Broad educativo

| Campo | Configuração operacional |
|---|---|
| Nome | `AS01_BROAD_WOMEN25P_[PAIS]` |
| Audiência | Mulheres, 25+, residentes em `[PAIS_DE_LANCAMENTO]`; sem estado civil, religião, saúde, dificuldade relacional, listas sensíveis ou proxies. Sem interesses. |
| Expansão | Advantage+ audience pode permanecer ativa somente com esses controles de localização, idade e gênero. |
| Posicionamentos | Advantage+ placements. Conferir preview em Feed Facebook, Feed Instagram, Reels Facebook, Reels Instagram, Stories Facebook e Stories Instagram; remover somente placement com corte, legenda ou CTA ilegível. |
| Otimização | **Landing Page Views** somente depois de `PageView` do Pixel aparecer no Events Manager. Sem isso, otimizar para **Link Clicks** temporariamente; não declarar LPV como mensurado. |
| Orçamento | 60% de `B` (orçamento diário total). Definir `B` apenas após CPA máximo sustentável aprovado. Se `0,6B` for menor que 2× o CPA máximo/dia, rodar este conjunto sozinho antes do segundo. |
| Janela | Manter criativo, audiência e orçamento estáveis até haver volume suficiente para leitura; não decidir por poucas horas. |

**Anúncio A01 — UGC educativo**

- **Nome:** `AD01_UGC_EMPIEZA_POR_TI_35S`
- **Asset:** `ugc-script-prompt.md`; criadora apresenta uma ideia, não testemunho pessoal.
- **Texto principal:** `Una jornada cristiana educativa de 21 días para practicar atención, reflexión y diálogo en lo cotidiano. Nexo21 es una práctica individual: empieza por lo que sí depende de ti. US$9.90.`
- **Título:** `Empieza por ti`
- **CTA:** `Más información`
- **URL:** `[LANDING_URL]` + UTM A01.

### Ad set 02 — Contextual educacional

| Campo | Configuração operacional |
|---|---|
| Nome | `AS02_CONTEXT_EDU_READING_[PAIS]` |
| Audiência | Mulheres, 25+, `[PAIS_DE_LANCAMENTO]`; testar somente interesses contextuais disponíveis no Ads Manager ligados a educação e hábitos de aprendizado, por exemplo leitura, journaling, desenvolvimento pessoal, cursos online. Selecionar 2–4; documentar os nomes finais. |
| Exclusões de targeting | Não selecionar interesses, comportamentos ou públicos que infiram religião, estado civil, sofrimento emocional, problemas de relacionamento, saúde ou outra característica pessoal sensível. Não usar interesse religioso como critério de inclusão. |
| Posicionamentos | Advantage+ placements, mesma revisão de preview do AS01. |
| Otimização | Mesma regra do AS01: LPV apenas quando `PageView` for visto no Events Manager; caso contrário Link Clicks. |
| Orçamento | 40% de `B`. Se o orçamento não sustentar dois conjuntos, não dividir: iniciar AS01; ativar AS02 em teste sequencial com orçamento equivalente. |
| Controle de teste | Mesma landing, período, oferta e criativo-base do AS01. Alterar somente a audiência contextual para comparar. |

**Anúncio A02 — Demonstração simples**

- **Nome:** `AD02_VIDEO_DIA_UNO_15S`
- **Asset:** vídeo vertical 9:16: agenda marcada “Día 1”, tela real do produto somente se aprovada, pessoa escrevendo uma reflexão; sem resultado pessoal, sem casal encenado em conflito.
- **Texto principal:** `Conoce una jornada cristiana educativa de 21 días con reflexión y una práctica personal por día. Revisa cómo funciona Nexo21. US$9.90.`
- **Título:** `21 días, una práctica a la vez`
- **CTA:** `Más información`
- **URL:** `[LANDING_URL]` + UTM A02.

## Guia de orçamento e decisão

1. Calcular antes: `CPA máximo = receita líquida por compra − taxas − reembolsos provisionados − margem mínima`.
2. Definir `B` em moeda da conta. Não usar US$9.90 como CPA aceitável sem considerar receita líquida e custos.
3. Iniciar 60/40 somente se ambos os conjuntos receberem verba diária útil; caso contrário, AS01 primeiro, AS02 depois.
4. Avaliar tráfego: impressões, alcance, frequência, CTR de saída, CPC, LPV quando disponível, qualidade da sessão e `InitiateCheckout` interno. Não escalar por CTR isolado.
5. Não otimizar para Purchase nem usar ROAS como decisão de plataforma até existir um evento de compra Meta validado. Não existe confirmação desse evento neste app.

## Plano UTM

**Modelo**

```text
[LANDING_URL]?utm_source=meta&utm_medium=paid_social&utm_campaign=n21_traffic_[pais]_[yyyymm]&utm_content=[adset]_[ad]_[format]&utm_term=[audience]
```

| Anúncio | `utm_content` | `utm_term` |
|---|---|---|
| A01 | `as01_ad01_ugc35` | `broad_women25p` |
| A02 | `as02_ad02_video15` | `context_edu_reading` |

**Exemplos de valores fixos:** `utm_source=meta`, `utm_medium=paid_social`. Usar slug, minúsculas e hífens/underscores. Não incluir nome, e-mail, ID de usuário, estado civil, religião ou qualquer dado pessoal na URL. Preservar UTMs no redirecionamento para checkout somente após teste real; hoje isso não está confirmado.

## Pixel e analytics: mapeamento honesto

### Confirmado no código, não confirmado em produção

| Sinal | Implementação observada | Uso neste lançamento | Estado |
|---|---|---|---|
| `PageView` | Pixel base chama `fbq('track', 'PageView')` somente quando `NEXT_PUBLIC_META_PIXEL_ID` existe. | Pré-requisito para otimização LPV e diagnóstico de visita. | **Não configurado:** `.env.example` deixa o ID vazio; validar em produção. |
| `ViewContent`, `InitiateCheckout` | Taxonomia existente em `src/lib/analytics-client.ts`; são enviados como eventos padrão Meta quando disparados pelo app. | Diagnóstico e futura otimização de checkout somente após confirmação no Events Manager. | **Não tratar como instalado nem como conversão Meta validada.** |
| `Scroll`, `CTA`, `UseTool`, `ViewUpsell` | Taxonomia existente; são enviados como eventos personalizados quando disparados. | Diagnóstico interno após confirmação de runtime. | **Não são eventos de conversão Meta.** |
| `Purchase` | Não há evento Meta `Purchase` confirmado na implementação examinada. | Não selecionar otimização Purchase; não reportar ROAS Meta. | **Bloqueado.** |

### Mapa operacional

| Etapa | Evento/medida agora | Decisão permitida |
|---|---|---|
| Chegada à landing | `PageView`, se Pixel ID configurado e evento visto | LPV; comparar qualidade do tráfego. |
| Interesse | `CTA`, `Scroll`, `ViewContent`, se runtime confirmar | Diagnóstico interno; não chamar de conversão de vendas. |
| Ida ao checkout | `InitiateCheckout` padrão Meta, se runtime confirmar | Diagnóstico e futura otimização; conferir UTM e redirecionamento. |
| Pagamento aprovado | Nenhum sinal Meta confirmado | Registrar fora da Meta até integração e validação reais. |

Hotmart: checkout, mapeamento de produto/oferta e webhook permanecem pré-requisitos. Não há comprovação de que compras Hotmart devolvem atribuição ao Meta. Círculo Nexo recorrente permanece fora desta campanha até lifecycle estar implementado.

## Checklist de verificação antes de ativar

- [ ] Produto Nexo21, preço US$9.90, duração, entrega, reembolso, termos, suporte, país, moeda e checkout confirmados na landing e Hotmart.
- [ ] `[LANDING_URL]` carrega em mobile, sem conteúdo ou promessa diferente do anúncio.
- [ ] `NEXT_PUBLIC_META_PIXEL_ID` configurado no ambiente de produção por operador autorizado.
- [ ] Events Manager mostra `PageView` do domínio correto após visita de teste; registrar data/hora e Test Event.
- [ ] Domínio verificado na Meta; evento/URL permitidos conforme a configuração vigente da conta.
- [ ] `PageView` não é duplicado no carregamento; consentimento/cookies e política de privacidade revisados conforme jurisdição.
- [ ] Cada URL A01/A02 abre, preserva UTMs até onde a experiência permite, sem PII na query.
- [ ] Clique do CTA chega no checkout oficial; compra teste, confirmação de acesso e suporte testados sem divulgar dados pessoais.
- [ ] `InitiateCheckout` e demais eventos internos só entram em relatório após confirmação no runtime; não presumir.
- [ ] Previews aprovados em todos os placements; legenda, preço, CTA, enquadramento e tela final legíveis.
- [ ] Direitos de imagem, voz, música e autorização da criadora arquivados; UGC não é depoimento fabricado.
- [ ] Moderador tem resposta aprovada: Nexo21 é educacional, não promete resultados, não é terapia; comentários de crise seguem protocolo humano local.
- [ ] Nenhuma exclusão ou segmentação usa religião, estado civil, saúde, crise emocional ou problema relacional.

## Bloqueios atuais

1. `NEXT_PUBLIC_META_PIXEL_ID` está vazio no template; `PageView` não pode ser considerado ativo sem verificação de produção.
2. Não há `Purchase` Meta confirmado; campanha deve ficar em Traffic, sem otimização de compra/ROAS Meta.
3. URLs/mapeamentos Hotmart reais não estão confirmados; validar checkout, webhook e entrega antes de pagar tráfego.
4. País, moeda local, CPA sustentável e URL final não foram fornecidos; preencher placeholders e aprovar economia antes de ativação.
5. Nenhuma ação externa foi executada por este pacote.

## Registro de lançamento

Preencher após operação real: data/hora, conta Meta, campanha, país, moeda, `B`, URL final, UTMs, Pixel Test Event, responsável, resultado de checkout de teste, bloqueios remanescentes.
