# Nexo 21 — Cadastro dos produtos na Hotmart

> Documento operacional gerado do catálogo da aplicação. Todo conteúdo voltado à compradora permanece em espanhol neutro.

## Qual opção escolher na Hotmart

- **Curso Online**: produto principal, bumps, upsell e todos os DLCs. A entrega acontece na plataforma externa Nexo 21; o formato não é apenas um arquivo.
- **Assinatura**: somente `Círculo Nexo`. Pode ser cadastrado agora, mas não conecte sua URL de checkout nem aceite cobranças até o lifecycle recorrente (renovação, falha, cancelamento e fim do período pago) ser liberado numa versão posterior.
- Não escolher eBook para os módulos: até o diário imprimível é entregue como workbook interativo com impressão/Salvar PDF dentro da área de membros.

## Configurações comuns

- Idioma: espanhol
- Mercado: América Latina
- Garantia: 7 dias
- Email de suporte: `listenghust.ia@gmail.com`
- Responsável: Luan
- Página pós-compra: `https://nexo21.vercel.app/gracias`
- Webhook: `https://nexo21.vercel.app/api/checkout/webhook`
- Eventos: aprovada, concluída, cancelada, expirada, reembolsada e chargeback

## Ordem recomendada

1. Nexo 21 principal.
2. Os três complementos como produtos separados e order bumps do principal.
3. Devocional 30 como upsell pós-compra.
4. DLCs como produtos independentes.
5. Círculo Nexo por último, como assinatura mensal **mantida sem checkout por enquanto**.

## Catálogo

| Produto | Papel | Tipo Hotmart | Preço | Cobrança | Slug | Variável de checkout |
|---|---|---|---:|---|---|---|
| Nexo 21 — Un camino de regreso a lo cotidiano | MAIN | Curso Online | US$9.90 | Pagamento único | `nexo-21` | `CHECKOUT_URL_NEXO_21` |
| 50 mensajes para volver a acercarse | BUMP | Curso Online | US$1.90 | Pagamento único | `mensajes-esenciales` | `CHECKOUT_URL_MENSAJES_ESENCIALES` |
| Guía de conversaciones sin herir | BUMP | Curso Online | US$2.90 | Pagamento único | `conversaciones-sin-herir` | `CHECKOUT_URL_CONVERSACIONES_SIN_HERIR` |
| Diario de reconexión imprimible | BUMP | Curso Online | US$3.90 | Pagamento único | `diario-imprimible` | `CHECKOUT_URL_DIARIO_IMPRIMIBLE` |
| 30 días para cuidar el vínculo | UPSELL | Curso Online | US$19.00 | Pagamento único | `devocional-30` | `CHECKOUT_URL_DEVOCIONAL_30` |
| 7 días con menos tensión | DLC | Curso Online | US$5.90 | Pagamento único | `siete-dias-menos-tension` | `CHECKOUT_URL_SIETE_DIAS_MENOS_TENSION` |
| Dinero en equipo | DLC | Curso Online | US$8.90 | Pagamento único | `dinero-en-equipo` | `CHECKOUT_URL_DINERO_EN_EQUIPO` |
| 30 días de gratitud visible | DLC | Curso Online | US$6.90 | Pagamento único | `desafio-gratitud-30` | `CHECKOUT_URL_DESAFIO_GRATITUD_30` |
| 30 encuentros en casa | DLC | Curso Online | US$9.90 | Pagamento único | `citas-en-casa` | `CHECKOUT_URL_CITAS_EN_CASA` |
| Reconexión después de la rutina | DLC | Curso Online | US$7.90 | Pagamento único | `rutina-y-reconexion` | `CHECKOUT_URL_RUTINA_Y_RECONEXION` |
| Confianza paso a paso | DLC | Curso Online | US$12.90 | Pagamento único | `confianza-paso-a-paso` | `CHECKOUT_URL_CONFIANZA_PASO_A_PASO` |
| Intimidad y presencia | DLC | Curso Online | US$10.90 | Pagamento único | `intimidad-y-presencia` | `CHECKOUT_URL_INTIMIDAD_Y_PRESENCIA` |
| Familia, límites y unidad | DLC | Curso Online | US$8.90 | Pagamento único | `familia-y-limites` | `CHECKOUT_URL_FAMILIA_Y_LIMITES` |
| Biblioteca anual de mensajes con intención | DLC | Curso Online | US$14.90 | Pagamento único | `mensajes-365` | `CHECKOUT_URL_MENSAJES_365` |
| Planner anual de nosotros | DLC | Curso Online | US$11.90 | Pagamento único | `plan-anual-nosotros` | `CHECKOUT_URL_PLAN_ANUAL_NOSOTROS` |
| Círculo Nexo | SUBSCRIPTION | Assinatura | US$7.90 | Mensal, cancelável | `circulo-nexo` | `CHECKOUT_URL_CIRCULO_NEXO` |

## Fichas para copiar

### 1. Nexo 21 — Un camino de regreso a lo cotidiano

- **Tipo na Hotmart:** Curso Online
- **Preço:** US$9.90
- **Cobrança:** pagamento único
- **Garantia:** 7 dias
- **Slug interno:** `nexo-21`
- **Rota após liberar acesso:** `/app`
- **Variável da URL do checkout:** `CHECKOUT_URL_NEXO_21`

**Descrição curta em espanhol:** Una jornada cristiana educativa de 21 días para practicar atención, diálogo y pequeños hábitos de conexión.

**Inclui:**
- 21 días guiados
- Diario digital
- Conversaciones y mensajes
- Plan de continuidad

Após criar, anote:
- Product UCODE
- Offer Code (pode haver mais de um por produto)
- URL `https://pay.hotmart.com/...`

### 2. 50 mensajes para volver a acercarse

- **Tipo na Hotmart:** Curso Online
- **Preço:** US$1.90
- **Cobrança:** pagamento único
- **Garantia:** 7 dias
- **Slug interno:** `mensajes-esenciales`
- **Rota após liberar acesso:** `/app/extras/mensajes-esenciales`
- **Variável da URL do checkout:** `CHECKOUT_URL_MENSAJES_ESENCIALES`

**Descrição curta em espanhol:** Mensajes breves y naturales para cariño, gratitud, admiración y reconciliación.

**Inclui:**
- 50 mensajes
- Guía para personalizar
- Acceso dentro de Nexo 21

Após criar, anote:
- Product UCODE
- Offer Code (pode haver mais de um por produto)
- URL `https://pay.hotmart.com/...`

### 3. Guía de conversaciones sin herir

- **Tipo na Hotmart:** Curso Online
- **Preço:** US$2.90
- **Cobrança:** pagamento único
- **Garantia:** 7 dias
- **Slug interno:** `conversaciones-sin-herir`
- **Rota após liberar acesso:** `/app/extras/conversaciones-sin-herir`
- **Variável da URL do checkout:** `CHECKOUT_URL_CONVERSACIONES_SIN_HERIR`

**Descrição curta em espanhol:** Preparación y frases de apoyo para 15 conversaciones que suelen volverse difíciles.

**Inclui:**
- 15 guiones
- Frases que ayudan
- Frases que conviene evitar

Após criar, anote:
- Product UCODE
- Offer Code (pode haver mais de um por produto)
- URL `https://pay.hotmart.com/...`

### 4. Diario de reconexión imprimible

- **Tipo na Hotmart:** Curso Online
- **Preço:** US$3.90
- **Cobrança:** pagamento único
- **Garantia:** 7 dias
- **Slug interno:** `diario-imprimible`
- **Rota após liberar acesso:** `/app/extras/diario-imprimible`
- **Variável da URL do checkout:** `CHECKOUT_URL_DIARIO_IMPRIMIBLE`

**Descrição curta em espanhol:** Cuaderno de 30 páginas para continuar la práctica fuera de la pantalla.

**Inclui:**
- PDF A4 y Carta
- 30 páginas
- Preguntas de reflexión

Após criar, anote:
- Product UCODE
- Offer Code (pode haver mais de um por produto)
- URL `https://pay.hotmart.com/...`

### 5. 30 días para cuidar el vínculo

- **Tipo na Hotmart:** Curso Online
- **Preço:** US$19.00
- **Cobrança:** pagamento único
- **Garantia:** 7 dias
- **Slug interno:** `devocional-30`
- **Rota após liberar acesso:** `/app/extras/devocional-30`
- **Variável da URL do checkout:** `CHECKOUT_URL_DEVOCIONAL_30`

**Descrição curta em espanhol:** Devocional premium con lectura, reflexión, oración y una acción breve para cada día.

**Inclui:**
- 30 devocionales
- Oraciones y acciones
- Reflexión diaria
- Acceso permanente

Após criar, anote:
- Product UCODE
- Offer Code (pode haver mais de um por produto)
- URL `https://pay.hotmart.com/...`

### 6. 7 días con menos tensión

- **Tipo na Hotmart:** Curso Online
- **Preço:** US$5.90
- **Cobrança:** pagamento único
- **Garantia:** 7 dias
- **Slug interno:** `siete-dias-menos-tension`
- **Rota após liberar acesso:** `/app/extras/siete-dias-menos-tension`
- **Variável da URL do checkout:** `CHECKOUT_URL_SIETE_DIAS_MENOS_TENSION`

**Descrição curta em espanhol:** Un reinicio breve para bajar la reactividad antes de una conversación importante.

**Inclui:**
- 7 prácticas
- Pausas guiadas
- Plan de conversación

Após criar, anote:
- Product UCODE
- Offer Code (pode haver mais de um por produto)
- URL `https://pay.hotmart.com/...`

### 7. Dinero en equipo

- **Tipo na Hotmart:** Curso Online
- **Preço:** US$8.90
- **Cobrança:** pagamento único
- **Garantia:** 7 dias
- **Slug interno:** `dinero-en-equipo`
- **Rota após liberar acesso:** `/app/extras/dinero-en-equipo`
- **Variável da URL do checkout:** `CHECKOUT_URL_DINERO_EN_EQUIPO`

**Descrição curta em espanhol:** Una jornada para hablar de gastos, prioridades y acuerdos sin convertir el presupuesto en una batalla.

**Inclui:**
- Guiones
- Mapa de prioridades
- Acuerdos prácticos

Após criar, anote:
- Product UCODE
- Offer Code (pode haver mais de um por produto)
- URL `https://pay.hotmart.com/...`

### 8. 30 días de gratitud visible

- **Tipo na Hotmart:** Curso Online
- **Preço:** US$6.90
- **Cobrança:** pagamento único
- **Garantia:** 7 dias
- **Slug interno:** `desafio-gratitud-30`
- **Rota após liberar acesso:** `/app/extras/desafio-gratitud-30`
- **Variável da URL do checkout:** `CHECKOUT_URL_DESAFIO_GRATITUD_30`

**Descrição curta em espanhol:** Pequeñas maneras de reconocer lo bueno sin negar lo que todavía necesita atención.

**Inclui:**
- 30 acciones
- Mensajes
- Registro de avances

Após criar, anote:
- Product UCODE
- Offer Code (pode haver mais de um por produto)
- URL `https://pay.hotmart.com/...`

### 9. 30 encuentros en casa

- **Tipo na Hotmart:** Curso Online
- **Preço:** US$9.90
- **Cobrança:** pagamento único
- **Garantia:** 7 dias
- **Slug interno:** `citas-en-casa`
- **Rota após liberar acesso:** `/app/extras/citas-en-casa`
- **Variável da URL do checkout:** `CHECKOUT_URL_CITAS_EN_CASA`

**Descrição curta em espanhol:** Ideas de bajo costo para compartir tiempo con intención, incluso en semanas ocupadas.

**Inclui:**
- 30 encuentros
- Preparación simple
- Preguntas para conectar

Após criar, anote:
- Product UCODE
- Offer Code (pode haver mais de um por produto)
- URL `https://pay.hotmart.com/...`

### 10. Reconexión después de la rutina

- **Tipo na Hotmart:** Curso Online
- **Preço:** US$7.90
- **Cobrança:** pagamento único
- **Garantia:** 7 dias
- **Slug interno:** `rutina-y-reconexion`
- **Rota após liberar acesso:** `/app/extras/rutina-y-reconexion`
- **Variável da URL do checkout:** `CHECKOUT_URL_RUTINA_Y_RECONEXION`

**Descrição curta em espanhol:** Diseña microhábitos de atención para días de trabajo, hijos y responsabilidades.

**Inclui:**
- 14 días
- Mapa de rutina
- Rituales de llegada y despedida

Após criar, anote:
- Product UCODE
- Offer Code (pode haver mais de um por produto)
- URL `https://pay.hotmart.com/...`

### 11. Confianza paso a paso

- **Tipo na Hotmart:** Curso Online
- **Preço:** US$12.90
- **Cobrança:** pagamento único
- **Garantia:** 7 dias
- **Slug interno:** `confianza-paso-a-paso`
- **Rota após liberar acesso:** `/app/extras/confianza-paso-a-paso`
- **Variável da URL do checkout:** `CHECKOUT_URL_CONFIANZA_PASO_A_PASO`

**Descrição curta em espanhol:** Prácticas educativas para coherencia, conversaciones claras y reparación cotidiana.

**Inclui:**
- 21 prácticas
- Acuerdos
- Revisión semanal

Após criar, anote:
- Product UCODE
- Offer Code (pode haver mais de um por produto)
- URL `https://pay.hotmart.com/...`

### 12. Intimidad y presencia

- **Tipo na Hotmart:** Curso Online
- **Preço:** US$10.90
- **Cobrança:** pagamento único
- **Garantia:** 7 dias
- **Slug interno:** `intimidad-y-presencia`
- **Rota após liberar acesso:** `/app/extras/intimidad-y-presencia`
- **Variável da URL do checkout:** `CHECKOUT_URL_INTIMIDAD_Y_PRESENCIA`

**Descrição curta em espanhol:** Una experiencia sobre cercanía, escucha y afecto respetando límites y consentimiento.

**Inclui:**
- 14 días
- Conversaciones
- Acciones de cercanía

Após criar, anote:
- Product UCODE
- Offer Code (pode haver mais de um por produto)
- URL `https://pay.hotmart.com/...`

### 13. Familia, límites y unidad

- **Tipo na Hotmart:** Curso Online
- **Preço:** US$8.90
- **Cobrança:** pagamento único
- **Garantia:** 7 dias
- **Slug interno:** `familia-y-limites`
- **Rota após liberar acesso:** `/app/extras/familia-y-limites`
- **Variável da URL do checkout:** `CHECKOUT_URL_FAMILIA_Y_LIMITES`

**Descrição curta em espanhol:** Herramientas para conversar sobre familias de origen, visitas y decisiones compartidas.

**Inclui:**
- 12 situaciones
- Guiones
- Acuerdos de límites

Após criar, anote:
- Product UCODE
- Offer Code (pode haver mais de um por produto)
- URL `https://pay.hotmart.com/...`

### 14. Biblioteca anual de mensajes con intención

- **Tipo na Hotmart:** Curso Online
- **Preço:** US$14.90
- **Cobrança:** pagamento único
- **Garantia:** 7 dias
- **Slug interno:** `mensajes-365`
- **Rota após liberar acesso:** `/app/extras/mensajes-365`
- **Variável da URL do checkout:** `CHECKOUT_URL_MENSAJES_365`

**Descrição curta em espanhol:** 150 mensajes validados, organizados para acompañar distintos momentos del año con cariño, gratitud, límites y ánimo.

**Inclui:**
- 150 mensajes
- Guía anual
- Categorías por contexto
- Acceso permanente

Após criar, anote:
- Product UCODE
- Offer Code (pode haver mais de um por produto)
- URL `https://pay.hotmart.com/...`

### 15. Planner anual de nosotros

- **Tipo na Hotmart:** Curso Online
- **Preço:** US$11.90
- **Cobrança:** pagamento único
- **Garantia:** 7 dias
- **Slug interno:** `plan-anual-nosotros`
- **Rota após liberar acesso:** `/app/extras/plan-anual-nosotros`
- **Variável da URL do checkout:** `CHECKOUT_URL_PLAN_ANUAL_NOSOTROS`

**Descrição curta em espanhol:** Revisión mensual, metas compartidas y espacios para planear tiempo juntos.

**Inclui:**
- 12 revisiones
- Planner digital
- Versión imprimible

Após criar, anote:
- Product UCODE
- Offer Code (pode haver mais de um por produto)
- URL `https://pay.hotmart.com/...`

### 16. Círculo Nexo

> **Bloqueio operacional:** conteúdo do Mes 1 está pronto e aparece na loja, mas a venda recorrente permanece protegida no sistema. Não defina `CHECKOUT_URL_CIRCULO_NEXO` em produção antes da implementação do lifecycle de assinatura.

- **Tipo na Hotmart:** Assinatura
- **Preço:** US$7.90
- **Cobrança:** mensal recorrente, cancelável
- **Garantia:** 7 dias
- **Slug interno:** `circulo-nexo`
- **Rota após liberar acesso:** `/app/extras/circulo-nexo`
- **Variável da URL do checkout:** `CHECKOUT_URL_CIRCULO_NEXO`

**Descrição curta em espanhol:** Membresía editorial con el Mes 1 completo. La venta recurrente se habilitará únicamente cuando el lifecycle de suscripción esté conectado y probado.

**Inclui:**
- Mes 1 completo
- 4 semanas guiadas
- 12 prácticas
- Checkout recurrente aún protegido

Após criar, anote:
- Product UCODE
- Offer Code (pode haver mais de um por produto)
- URL `https://pay.hotmart.com/...`

## Mapeamento multi-produto para a Vercel

Preencha `HOTMART_PRODUCT_MAP_JSON` sem espaços desnecessários usando o template ao lado. Formato:

```json
{
  "nexo-21": {
    "productUcode": "<UCODE_nexo-21>",
    "offerCodes": [
      "<OFFER_nexo-21>"
    ]
  },
  "mensajes-esenciales": {
    "productUcode": "<UCODE_mensajes-esenciales>",
    "offerCodes": [
      "<OFFER_mensajes-esenciales>"
    ]
  },
  "conversaciones-sin-herir": {
    "productUcode": "<UCODE_conversaciones-sin-herir>",
    "offerCodes": [
      "<OFFER_conversaciones-sin-herir>"
    ]
  },
  "diario-imprimible": {
    "productUcode": "<UCODE_diario-imprimible>",
    "offerCodes": [
      "<OFFER_diario-imprimible>"
    ]
  },
  "devocional-30": {
    "productUcode": "<UCODE_devocional-30>",
    "offerCodes": [
      "<OFFER_devocional-30>"
    ]
  },
  "siete-dias-menos-tension": {
    "productUcode": "<UCODE_siete-dias-menos-tension>",
    "offerCodes": [
      "<OFFER_siete-dias-menos-tension>"
    ]
  },
  "dinero-en-equipo": {
    "productUcode": "<UCODE_dinero-en-equipo>",
    "offerCodes": [
      "<OFFER_dinero-en-equipo>"
    ]
  },
  "desafio-gratitud-30": {
    "productUcode": "<UCODE_desafio-gratitud-30>",
    "offerCodes": [
      "<OFFER_desafio-gratitud-30>"
    ]
  },
  "citas-en-casa": {
    "productUcode": "<UCODE_citas-en-casa>",
    "offerCodes": [
      "<OFFER_citas-en-casa>"
    ]
  },
  "rutina-y-reconexion": {
    "productUcode": "<UCODE_rutina-y-reconexion>",
    "offerCodes": [
      "<OFFER_rutina-y-reconexion>"
    ]
  },
  "confianza-paso-a-paso": {
    "productUcode": "<UCODE_confianza-paso-a-paso>",
    "offerCodes": [
      "<OFFER_confianza-paso-a-paso>"
    ]
  },
  "intimidad-y-presencia": {
    "productUcode": "<UCODE_intimidad-y-presencia>",
    "offerCodes": [
      "<OFFER_intimidad-y-presencia>"
    ]
  },
  "familia-y-limites": {
    "productUcode": "<UCODE_familia-y-limites>",
    "offerCodes": [
      "<OFFER_familia-y-limites>"
    ]
  },
  "mensajes-365": {
    "productUcode": "<UCODE_mensajes-365>",
    "offerCodes": [
      "<OFFER_mensajes-365>"
    ]
  },
  "plan-anual-nosotros": {
    "productUcode": "<UCODE_plan-anual-nosotros>",
    "offerCodes": [
      "<OFFER_plan-anual-nosotros>"
    ]
  },
  "circulo-nexo": {
    "productUcode": "<UCODE_circulo-nexo>",
    "offerCodes": [
      "<OFFER_circulo-nexo>"
    ]
  }
}
```

Mantenha `HOTMART_WEBHOOK_ENABLED=false` até cadastrar todos os IDs e passar um evento real/de teste. Depois habilite `true` e redeploy.
