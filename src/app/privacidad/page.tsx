import { LegalPage, LegalSection } from "@/components/legal-page";

export default function PrivacyPage() {
  return <LegalPage eyebrow="Tus datos" title="Política de privacidad">
    <LegalSection title="1. Datos que tratamos"><p>Podemos tratar nombre, correo, datos técnicos de sesión, compras, productos habilitados, progreso, favoritos y el contenido que decides guardar en tu diario o notas.</p></LegalSection>
    <LegalSection title="2. Para qué los usamos"><p>Usamos estos datos para autenticarte, entregar compras, guardar tu progreso, proteger la cuenta, responder soporte, prevenir fraude y medir de forma limitada el funcionamiento del producto.</p></LegalSection>
    <LegalSection title="3. Datos sensibles"><p>No solicitamos diagnósticos ni detalles íntimos como condición de uso. Las notas privadas son opcionales. Evita registrar información de terceros que no sea necesaria.</p></LegalSection>
    <LegalSection title="4. Proveedores"><p>Podemos usar proveedores de alojamiento, base de datos, autenticación, email, analítica y pago. Cada uno recibe únicamente lo necesario para prestar su función y aplica sus propios controles de seguridad.</p></LegalSection>
    <LegalSection title="5. Conservación"><p>Conservamos datos de cuenta y compra mientras el acceso esté activo o mientras sean necesarios para obligaciones legítimas. Eventos técnicos y registros de seguridad tienen períodos limitados de conservación.</p></LegalSection>
    <LegalSection title="6. Tus opciones"><p>Puedes pedir corrección, exportación o eliminación de datos cuando corresponda. Algunos registros financieros pueden conservarse por obligaciones legales o de prevención de fraude.</p></LegalSection>
    <LegalSection title="7. Contacto"><p>Responde al correo de confirmación de Nexo 21 con el asunto “Privacidad”. Nunca envíes contraseñas, números completos de tarjeta ni documentos sensibles por email.</p></LegalSection>
  </LegalPage>;
}
