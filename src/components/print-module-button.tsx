"use client";

import { Printer } from "lucide-react";
import { expandDetailsForPrint } from "@/lib/print-module";

export function PrintModuleButton() {
  function printCompleteModule() {
    const restore = expandDetailsForPrint(Array.from(document.querySelectorAll("details")));
    window.addEventListener("afterprint", restore, { once: true });
    window.print();
  }
  return <button type="button" className="secondary-button print:hidden" onClick={printCompleteModule}>
    <Printer size={16} aria-hidden="true" /> Imprimir o guardar como PDF
  </button>;
}
