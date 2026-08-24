import { LegalPage, LegalSection } from "@/components/legal-page";

export default function TermsPage() {
  return <LegalPage eyebrow="Información legal" title="Términos de uso">
    <LegalSection title="1. Qué es Nexo 21"><p>Nexo 21 es una plataforma educativa y espiritual de pago único. Ofrece una jornada de 21 días, herramientas de reflexión y bibliotecas prácticas. No es terapia, atención médica, asesoría jurídica ni servicio de emergencia.</p></LegalSection>
    <LegalSection title="2. Acceso"><p>El acceso es personal, no transferible y se vincula al correo utilizado en la compra después de confirmar su titularidad. No puedes revender, publicar, compartir credenciales ni redistribuir el contenido.</p></LegalSection>
    <LegalSection title="3. Pago y garantía"><p>El precio, la moneda y los productos incluidos aparecen antes del pago. La oferta principal tiene 15 días de garantía. Las solicitudes deben enviarse respondiendo al correo de confirmación e incluyendo el correo y el identificador de la compra.</p></LegalSection>
    <LegalSection title="4. Uso responsable"><p>No prometemos cambiar a tu pareja ni producir un resultado específico. Si existe violencia, coerción, amenaza, abuso o riesgo físico, no uses ejercicios conjuntos como sustituto de protección: prioriza tu seguridad y busca ayuda local.</p></LegalSection>
    <LegalSection title="5. Propiedad intelectual"><p>La marca, textos, interfaces y materiales originales están protegidos. La compra concede una licencia personal de uso, no la propiedad ni derechos de redistribución.</p></LegalSection>
    <LegalSection title="6. Disponibilidad y cambios"><p>Podemos corregir errores, mejorar la plataforma y actualizar materiales sin reducir de forma sustancial lo adquirido. Mantenimientos y causas externas pueden causar interrupciones temporales.</p></LegalSection>
    <LegalSection title="7. Contacto"><p>Para acceso, privacidad o reembolso, responde al email transaccional de tu compra. Así podremos localizar la transacción sin pedir datos financieros.</p></LegalSection>
  </LegalPage>;
}
