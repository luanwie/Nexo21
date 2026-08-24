import { ActionLibrary } from "@/components/action-library";
import { requireEntitlement } from "@/lib/access";
import { loadActions } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export default async function ActionsPage(){const user=await requireUser();await requireEntitlement(user);const completed=await prisma.actionCompletion.findMany({where:{userId:user.id},distinct:["actionId"],select:{actionId:true}});return <div className="space-y-7"><header><p className="text-sm font-semibold uppercase tracking-[.16em] text-[#B85C42]">Pequeñas acciones</p><h1 className="editorial-title mt-3 text-4xl sm:text-6xl">Lo pequeño también puede ser intencional.</h1><p className="mt-4 max-w-3xl text-lg leading-8 text-muted">Elige una acción compatible con tu realidad de hoy. No la uses como moneda de cambio ni para exigir reciprocidad inmediata.</p></header><ActionLibrary items={loadActions()} completedIds={completed.map(item=>item.actionId)}/></div>}
