import { MessageLibrary } from "@/components/message-library";
import { requireEntitlement } from "@/lib/access";
import { loadMessages } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export default async function MessagesPage() {
  const user = await requireUser();
  await requireEntitlement(user);
  const [favorites, uses] = await Promise.all([
    prisma.favorite.findMany({ where: { userId: user.id, resourceType: "message" }, select: { resourceId: true } }),
    prisma.messageUse.findMany({ where: { userId: user.id }, distinct: ["messageId"], select: { messageId: true } }),
  ]);
  return <div className="space-y-7"><header><p className="text-sm font-semibold uppercase tracking-[.16em] text-[#B85C42]">Biblioteca de mensajes</p><h1 className="editorial-title mt-3 text-4xl sm:text-6xl">Palabras que suenan a ti, no a un guion.</h1><p className="mt-4 max-w-3xl text-lg leading-8 text-muted">Adapta cada mensaje a lo que realmente sientes. Una frase preparada nunca debe sustituir una conversación necesaria.</p></header><MessageLibrary items={loadMessages()} initialFavorites={favorites.map(item=>item.resourceId)} usedIds={uses.map(item=>item.messageId)}/></div>;
}
