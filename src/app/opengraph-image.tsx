import { ImageResponse } from "next/og";

export const alt = "Nexo 21 — 21 días para cuidar el vínculo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#F5F1E8", color: "#25231F", padding: "72px", fontFamily: "serif", position: "relative" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", border: "2px solid #DDD3C6", borderRadius: "36px", padding: "60px", background: "#FFFDF8" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "18px", fontFamily: "sans-serif", fontSize: 30, fontWeight: 700 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 58, height: 58, borderRadius: 18, background: "#25231F", color: "#F5F1E8" }}>N</div>
          Nexo 21
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: 950 }}>
          <div style={{ fontSize: 72, lineHeight: 1.05, letterSpacing: "-2px" }}>Pequeños hábitos para volver a encontrarse.</div>
          <div style={{ fontFamily: "sans-serif", fontSize: 30, color: "#6E675F" }}>Una jornada cristiana educativa de 21 días para practicar atención, diálogo y conexión.</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", fontFamily: "sans-serif", fontSize: 24, color: "#B85C42" }}>
          21 días · diario · conversaciones · pequeñas acciones
        </div>
      </div>
    </div>,
    size,
  );
}
