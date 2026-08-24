import catalog from "@/generated/content.json";

export type JourneyDay = {
  slug: string;
  day: number;
  week: number;
  title: string;
  objective: string;
  reading: string;
  principle: string;
  reflection: string;
  example: string;
  commonMistake: string;
  practice: string;
  smallAction: string;
  conversationScript?: unknown;
  reflectionQuestions: string[];
  prayer: string;
  checklist: string[];
  notesPrompt?: string;
};

export type MessageItem = {
  id: string;
  text: string;
  category: string;
  feeling: string;
  context: string;
  objective: string;
};

export type ConversationItem = {
  id: string;
  situation: string;
  preparation: string[];
  opening: string;
  recommendedPhrases: string[];
  avoidPhrases: string[];
  questions: string[];
  closing: string;
  disclaimer: string;
};

export type ActionItem = {
  id: string;
  text: string;
  category: string;
  durationMinutes: number;
  objective: string;
};

export type Devotional = {
  day: number;
  title: string;
  reading: string;
  reflection: string;
  prayer: string;
  action: string;
};

export type Prayer = {
  id: string;
  title: string;
  text: string;
  themeId: string;
  theme: string;
};

const data = catalog as unknown as {
  journey: JourneyDay[];
  messages: MessageItem[];
  conversations: ConversationItem[];
  actions: ActionItem[];
  devotionals: Devotional[];
  prayers: Prayer[];
  prayerCatalog: Record<string, unknown>;
  continuity: { days?: unknown[] } & Record<string, unknown>;
  storeProducts: unknown[];
};

export const loadJourney = () => data.journey;
export const getJourneyDay = (day: number) => data.journey.find((item) => item.day === day);
export const loadMessages = () => data.messages;
export const loadConversations = () => data.conversations;
export const loadActions = () => data.actions;
export const loadDevotionals = () => data.devotionals;
export const loadPrayers = () => data.prayers;
export const loadContinuityPlan = () => data.continuity;
export const loadStoreProducts = () => data.storeProducts;
