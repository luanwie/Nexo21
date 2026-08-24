import { randomUUID } from "node:crypto";
import { z } from "zod";
import { processCheckoutEvent } from "@/lib/checkout-service";
import { getOffer } from "@/lib/offers";
import { PayloadTooLargeError, readJsonBody } from "@/lib/http-body";
import { validateHotmartCheckoutUrl } from "@/lib/domain/checkout";

export const runtime = "nodejs";

const schema=z.object({email:z.email().optional(),items:z.array(z.string()).min(1).max(5)});

function checkoutEnvKey(slug:string){return `CHECKOUT_URL_${slug.replace(/-/g,"_").toUpperCase()}`;}

export async function POST(request:Request){
  try{
    const {email,items}=schema.parse(await readJsonBody(request, 8_000));
    const unique=[...new Set(items)];
    const selected=unique.map(getOffer);
    if(selected.some(item=>!item||!item.launchReady)) throw new Error("Producto no disponible para compra");
    const offers=selected.filter(Boolean) as NonNullable<ReturnType<typeof getOffer>>[];
    if(process.env.CHECKOUT_PROVIDER==="mock"&&(process.env.NODE_ENV!=="production"||process.env.ENABLE_MOCK_CHECKOUT==="true")){
      if(!email) return Response.json({error:"Email requerido para el checkout simulado"},{status:400});
      const transactionId=randomUUID();
      const result=await processCheckoutEvent({provider:"mock",eventId:`evt:${transactionId}`,transactionId,occurredAt:new Date(),email,status:"paid",items:unique,amountCents:offers.reduce((sum,item)=>sum+item.priceCents,0),currency:"USD"});
      return Response.json({ok:true,mode:"mock",next:"/registro",...result});
    }
    if(process.env.CHECKOUT_PROVIDER!=="hotmart") return Response.json({error:"Checkout Hotmart aún no configurado"},{status:503});
    if(process.env.HOTMART_WEBHOOK_ENABLED!=="true") return Response.json({error:"La activación automática todavía no está disponible"},{status:503});
    const primary=offers.find(item=>item.type!=="BUMP")??offers[0];
    const url=process.env[checkoutEnvKey(primary.slug)];
    if(!url) return Response.json({error:"Checkout externo aún no configurado para este producto"},{status:503});
    if (unique.length > 1) return Response.json({error:"Los complementos deben configurarse como order bumps dentro del procesador de pago"},{status:503});
    return Response.json({ok:true,mode:"external",next:validateHotmartCheckoutUrl(url)});
  }catch(error){if(error instanceof PayloadTooLargeError)return Response.json({error:error.message},{status:413});return Response.json({error:error instanceof Error?error.message:"Checkout inválido"},{status:400});}
}
