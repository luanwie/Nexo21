"use client";

import { Printer } from "lucide-react";
import { expandDetailsForPrint } from "@/lib/print-module";

export function PrintModuleButton({ label = "Imprimir o guardar como PDF" }: { label?: string }) {
  function printCompleteModule() {
    const restore = expandDetailsForPrint(Array.from(document.querySelectorAll("details")));
    window.addEventListener("afterprint", restore, { once: true });
    window.print();
  }
  return <button type="button" className="secondary-button print:hidden" onClick={printCompleteModule}>
    <Printer size={16} aria-hidden="true" /> {label}
  </button>;
}
