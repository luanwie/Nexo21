export type OfferType = "MAIN" | "BUMP" | "UPSELL" | "DLC" | "SUBSCRIPTION";

export type Offer = {
  slug: string;
  type: OfferType;
  title: string;
  shortTitle: string;
  description: string;
  priceCents: number;
  currency: "USD";
  badge?: string;
  features: string[];
  launchReady: boolean;
};

const OFFER_CATALOG: Array<Omit<Offer, "launchReady">> = [
  {
    slug: "nexo-21",
    type: "MAIN",
    title: "Nexo 21 — Un camino de regreso a lo cotidiano",
    shortTitle: "Nexo 21",
    description: "Una jornada cristiana educativa de 21 días para practicar atención, diálogo y pequeños hábitos de conexión.",
    priceCents: 990,
    currency: "USD",
    badge: "Acceso completo",
    features: ["21 días guiados", "Diario digital", "Conversaciones y mensajes", "Plan de continuidad"],
  },
  {
    slug: "mensajes-esenciales",
    type: "BUMP",
    title: "50 mensajes para volver a acercarse",
    shortTitle: "Mensajes esenciales",
    description: "Mensajes breves y naturales para cariño, gratitud, admiración y reconciliación.",
    priceCents: 190,
    currency: "USD",
    features: ["50 mensajes", "Filtros por intención", "Acceso dentro de Nexo 21"],
  },
  {
    slug: "conversaciones-sin-herir",
    type: "BUMP",
    title: "Guía de conversaciones sin herir",
    shortTitle: "Conversaciones sin herir",
    description: "Preparación y frases de apoyo para 15 conversaciones que suelen volverse difíciles.",
    priceCents: 290,
    currency: "USD",
    features: ["15 guiones", "Frases que ayudan", "Frases que conviene evitar"],
  },
  {
    slug: "diario-imprimible",
    type: "BUMP",
    title: "Diario de reconexión imprimible",
    shortTitle: "Diario imprimible",
    description: "Cuaderno de 30 páginas para continuar la práctica fuera de la pantalla.",
    priceCents: 390,
    currency: "USD",
    features: ["PDF A4 y Carta", "30 páginas", "Preguntas de reflexión"],
  },
  {
    slug: "devocional-30",
    type: "UPSELL",
    title: "30 días para cuidar el vínculo",
    shortTitle: "Devocional 30",
    description: "Devocional premium con audio, reflexión, oración y una acción breve para cada día.",
    priceCents: 1900,
    currency: "USD",
    badge: "Oferta poscompra",
    features: ["30 devocionales", "Audios", "Calendario mensual", "Acceso permanente"],
  },
  {
    slug: "siete-dias-menos-tension",
    type: "DLC",
    title: "7 días con menos tensión",
    shortTitle: "Menos tensión",
    description: "Un reinicio breve para bajar la reactividad antes de una conversación importante.",
    priceCents: 590,
    currency: "USD",
    features: ["7 prácticas", "Pausas guiadas", "Plan de conversación"],
  },
  {
    slug: "dinero-en-equipo",
    type: "DLC",
    title: "Dinero en equipo",
    shortTitle: "Dinero en equipo",
    description: "Una jornada para hablar de gastos, prioridades y acuerdos sin convertir el presupuesto en una batalla.",
    priceCents: 890,
    currency: "USD",
    features: ["Guiones", "Mapa de prioridades", "Acuerdos prácticos"],
  },
  {
    slug: "desafio-gratitud-30",
    type: "DLC",
    title: "30 días de gratitud visible",
    shortTitle: "Gratitud 30",
    description: "Pequeñas maneras de reconocer lo bueno sin negar lo que todavía necesita atención.",
    priceCents: 690,
    currency: "USD",
    features: ["30 acciones", "Mensajes", "Registro de avances"],
  },
  {
    slug: "citas-en-casa",
    type: "DLC",
    title: "30 encuentros en casa",
    shortTitle: "Citas en casa",
    description: "Ideas de bajo costo para compartir tiempo con intención, incluso en semanas ocupadas.",
    priceCents: 990,
    currency: "USD",
    features: ["30 encuentros", "Preparación simple", "Preguntas para conectar"],
  },
  {
    slug: "rutina-y-reconexion",
    type: "DLC",
    title: "Reconexión después de la rutina",
    shortTitle: "Después de la rutina",
    description: "Diseña microhábitos de atención para días de trabajo, hijos y responsabilidades.",
    priceCents: 790,
    currency: "USD",
    features: ["14 días", "Mapa de rutina", "Rituales de llegada y despedida"],
  },
  {
    slug: "confianza-paso-a-paso",
    type: "DLC",
    title: "Confianza paso a paso",
    shortTitle: "Confianza",
    description: "Prácticas educativas para coherencia, conversaciones claras y reparación cotidiana.",
    priceCents: 1290,
    currency: "USD",
    features: ["21 prácticas", "Acuerdos", "Revisión semanal"],
  },
  {
    slug: "intimidad-y-presencia",
    type: "DLC",
    title: "Intimidad y presencia",
    shortTitle: "Intimidad y presencia",
    description: "Una experiencia sobre cercanía, escucha y afecto respetando límites y consentimiento.",
    priceCents: 1090,
    currency: "USD",
    features: ["14 días", "Conversaciones", "Acciones de cercanía"],
  },
  {
    slug: "familia-y-limites",
    type: "DLC",
    title: "Familia, límites y unidad",
    shortTitle: "Familia y límites",
    description: "Herramientas para conversar sobre familias de origen, visitas y decisiones compartidas.",
    priceCents: 890,
    currency: "USD",
    features: ["12 situaciones", "Guiones", "Acuerdos de límites"],
  },
  {
    slug: "mensajes-365",
    type: "DLC",
    title: "365 mensajes con intención",
    shortTitle: "Mensajes 365",
    description: "Una biblioteca anual de palabras sencillas que expresan cariño, gratitud y ánimo.",
    priceCents: 1490,
    currency: "USD",
    features: ["365 mensajes", "Buscador", "Favoritos"],
  },
  {
    slug: "plan-anual-nosotros",
    type: "DLC",
    title: "Planner anual de nosotros",
    shortTitle: "Planner anual",
    description: "Revisión mensual, metas compartidas y espacios para planear tiempo juntos.",
    priceCents: 1190,
    currency: "USD",
    features: ["12 revisiones", "Planner digital", "Versión imprimible"],
  },
  {
    slug: "circulo-nexo",
    type: "SUBSCRIPTION",
    title: "Círculo Nexo",
    shortTitle: "Círculo Nexo",
    description: "Una nueva mini-jornada, devocional, calendario y biblioteca de guiones cada mes.",
    priceCents: 790,
    currency: "USD",
    badge: "Mensual, cancelable",
    features: ["Nueva jornada mensual", "Devocional y audios", "Guiones nuevos", "Calendario mensual"],
  },
];

export const OFFERS: Offer[] = OFFER_CATALOG.map((offer) => ({
  ...offer,
  launchReady: offer.slug === "nexo-21",
}));

export function getOffer(slug: string) {
  return OFFERS.find((offer) => offer.slug === slug);
}
