# Secuencia de emails — Nexo 21

Todos los mensajes son buyer-facing en español neutro. Adaptar variables al proveedor elegido.

## Reglas

- El email de acceso es transaccional; los demás requieren consentimiento de marketing.
- No enviar venta si existe problema de acceso, reembolso, chargeback o solicitud de baja.
- Una idea y un CTA principal por mensaje.
- No usar culpa espiritual, miedo al divorcio, urgencia falsa ni prometer cambiar a la pareja.
- Día 1 se calcula desde el primer acceso; D3/D7/D14/D21 desde el avance real.
- Links canónicos: `{{app_url}}`, `{{checkout_url}}`, `{{unsubscribe_url}}`.

## Secuencia

| Archivo | Disparador | Tipo |
|---|---|---|
| 00 | compra confirmada | transaccional |
| 01 | primer acceso / Día 1 | engagement |
| 02 | Día 3 disponible | engagement |
| 03 | Día 7 disponible | engagement |
| 04 | Día 14 disponible | engagement |
| 05 | Día 21 completado | engagement |
| 06 | 48 h tras compra, sin upsell | monetización |
| 07 | 7 días tras compra con uso activo | DLC |
| 08 | 24 h tras completar Día 21 | suscripción |
| 09 | checkout abandonado 1 h / 20 h | recuperación |
| 10 | 3 / 7 / 14 días sin actividad | reactivación |

## QA

- Renderizar HTML y texto plano.
- Verificar variables vacías, links, móvil, dark mode y unsubscribe.
- Probar supresión por reembolso y acceso pendiente.
- No enviar desde dominio no verificado.
