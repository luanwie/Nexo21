type BrandMarkProps = {
  inverted?: boolean;
};

export function BrandMark({ inverted = false }: BrandMarkProps) {
  const ink = inverted ? "#F5F1E8" : "#25231F";

  return (
    <span className="inline-flex items-center gap-2.5" aria-label="Nexo 21">
      <svg
        aria-hidden="true"
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        className="shrink-0"
      >
        <circle cx="17" cy="17" r="15.5" stroke={ink} strokeWidth="1" opacity="0.28" />
        <path
          d="M9 21.5C11.8 15.5 14 12.5 17 12.5C20 12.5 22.2 15.5 25 21.5"
          stroke={ink}
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <circle cx="11" cy="12" r="2" fill="#B85C42" />
        <circle cx="23" cy="12" r="2" fill="#74836B" />
        <path d="M17 7.5V10" stroke={ink} strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <span
        className="text-[15px] font-bold uppercase tracking-[0.22em]"
        style={{ color: ink }}
      >
        Nexo <span className="font-normal opacity-65">21</span>
      </span>
    </span>
  );
}
