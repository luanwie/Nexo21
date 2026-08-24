import Image from "next/image";
import Link from "next/link";

export function BrandLogo({ inverted = false, compact = false }: { inverted?: boolean; compact?: boolean }) {
  if (compact) {
    return <Link href="/" aria-label="Nexo 21 — inicio"><Image src="/brand/symbol.svg" alt="Nexo 21" width={46} height={46} priority /></Link>;
  }
  return (
    <Link href="/" className="inline-flex items-center" aria-label="Nexo 21 — inicio">
      <Image
        src={inverted ? "/brand/dark.svg" : "/brand/horizontal.svg"}
        alt="Nexo 21"
        width={192}
        height={48}
        className="h-12 w-48 object-contain object-left"
        priority
      />
    </Link>
  );
}
