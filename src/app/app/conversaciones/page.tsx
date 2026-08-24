import { ConversationGenerator } from "@/components/conversation-generator";
import { requireEntitlement } from "@/lib/access";
import { loadConversations } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export default async function ConversationsPage() {
  const user=await requireUser();
  await requireEntitlement(user);
  const favorites=await prisma.favorite.findMany({where:{userId:user.id,resourceType:"conversation"},select:{resourceId:true}});
  return <div className="space-y-7"><header><p className="text-sm font-semibold uppercase tracking-[.16em] text-[#B85C42]">Generador de conversaciones</p><h1 className="editorial-title mt-3 text-4xl sm:text-6xl">Prepárate para hablar sin convertirlo en una batalla.</h1><p className="mt-4 max-w-3xl text-lg leading-8 text-muted">Elige una situación y adapta la guía a tu voz. La otra persona siempre conserva libertad para participar, pausar o no estar de acuerdo.</p></header><ConversationGenerator items={loadConversations()} initialFavorites={favorites.map(item=>item.resourceId)}/></div>;
}
