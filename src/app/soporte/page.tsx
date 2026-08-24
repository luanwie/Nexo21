import { LegalPage, LegalSection } from "@/components/legal-page";
import { getSupportContact } from "@/lib/contact";

export default function SupportPage() {
  const support = getSupportContact();
  return <LegalPage eyebrow="Estamos para ayudarte" title="Soporte de Nexo 21">
    <LegalSection title="Contacto"><p>Escribe a <a className="font-semibold underline" href={`mailto:${support.email}`}>{support.email}</a>. Responsable: {support.name}. Mantén el mismo hilo para que podamos seguir tu caso.</p></LegalSection>
    <LegalSection title="Problemas de acceso"><p>Responde al correo de confirmación de la compra e informa el correo usado y el identificador de transacción. No envíes contraseña ni datos completos de pago.</p></LegalSection>
    <LegalSection title="Reembolso"><p>La oferta principal tiene una garantía de 15 días desde la compra. Solicita el reembolso respondiendo al comprobante dentro del plazo. Confirmaremos la recepción y el estado del pedido.</p></LegalSection>
    <LegalSection title="Cuenta y correo"><p>Para proteger tus compras, la cuenta debe usar y confirmar el mismo correo del checkout. Si compraste con un correo incorrecto, no crees cuentas duplicadas: contacta con soporte desde el recibo.</p></LegalSection>
    <LegalSection title="Seguridad"><p>Nexo 21 no es un servicio de crisis. Ante violencia, coerción, amenaza, abuso o riesgo físico, prioriza protección y busca servicios de emergencia, apoyo local especializado o una persona confiable.</p></LegalSection>
    <LegalSection title="Tiempo de respuesta"><p>Respondemos en hasta 2 días hábiles. Mensajes repetidos sobre el mismo caso pueden retrasar la identificación; mantén la conversación en el mismo hilo.</p></LegalSection>
  </LegalPage>;
}
