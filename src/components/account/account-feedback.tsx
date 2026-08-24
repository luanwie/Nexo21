import type { ReactNode } from "react";

type AccountFeedbackProps = {
  kind: "error" | "success";
  children: ReactNode;
};

export function AccountFeedback({ kind, children }: AccountFeedbackProps) {
  const isError = kind === "error";

  return (
    <p
      role={isError ? "alert" : "status"}
      aria-live="polite"
      className={`mt-4 rounded-xl border px-4 py-3 text-sm leading-5 ${
        isError
          ? "border-[#b74f4f]/20 bg-[#fff0ed] text-[#8d3434]"
          : "border-[#41745a]/20 bg-[#edf7f0] text-[#315f48]"
      }`}
    >
      {children}
    </p>
  );
}
