"use client";

import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics-client";

const CHECKOUT_URL = "/checkout?product=nexo-21";

type TrackedCtaProps = {
  children: React.ReactNode;
  source: string;
  variant?: "primary" | "dark" | "outline";
  className?: string;
  showArrow?: boolean;
};

const variants = {
  primary:
    "bg-[#B85C42] text-white shadow-[0_12px_30px_rgba(184,92,66,0.24)] hover:bg-[#A64F38] hover:-translate-y-0.5 focus-visible:outline-[#B85C42]",
  dark:
    "bg-[#25231F] text-white shadow-[0_12px_30px_rgba(37,35,31,0.18)] hover:bg-[#3A3731] hover:-translate-y-0.5 focus-visible:outline-[#25231F]",
  outline:
    "border border-[#25231F]/20 bg-white/55 text-[#25231F] hover:border-[#B85C42] hover:text-[#B85C42] focus-visible:outline-[#B85C42]",
};

export function TrackedCta({
  children,
  source,
  variant = "primary",
  className = "",
  showArrow = true,
}: TrackedCtaProps) {
  return (
    <a
      href={CHECKOUT_URL}
      onClick={() =>
        trackEvent("InitiateCheckout", {
          product: "nexo-21",
          source,
          value: 9.9,
          currency: "USD",
        })
      }
      className={`group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 py-3 text-center text-sm font-bold tracking-[0.01em] transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      {showArrow ? (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-200 group-hover:translate-x-1"
        />
      ) : null}
    </a>
  );
}
