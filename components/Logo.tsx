import Image from "next/image";
import { logo, logoLight } from "@/lib/data";

/** PureSeed wordmark. Dark-green artwork in light mode, white artwork in dark mode (or on the always-dark footer). */
export function Logo({ tone = "auto", className = "h-9 w-auto" }: { tone?: "auto" | "onDark"; className?: string }) {
  if (tone === "onDark") {
    return <Image src={logoLight} alt="PureSeed" width={900} height={281} sizes="160px" className={className} />;
  }
  return (
    <>
      <Image src={logo} alt="PureSeed" width={900} height={281} priority sizes="160px" className={`show-in-light ${className}`} />
      <Image src={logoLight} alt="" aria-hidden="true" width={900} height={281} sizes="160px" className={`show-in-dark ${className}`} />
    </>
  );
}
