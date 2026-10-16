import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blurProps } from "@/lib/images";
import type { NeedTile } from "./NeedTiles";

/** "Browse our range" for phones and tablets: a swipeable row of photo cards inside the dark hero. */
export function NeedRow({ tiles }: { tiles: NeedTile[] }) {
  return (
    <ul
      aria-label="Browse our range"
      className="[contain:paint] -mx-4 flex snap-x snap-proximity scroll-px-4 sm:scroll-px-6 gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
    >
      {tiles.map((t) => {
        const Icon = t.icon;
        if (t.featured && t.photo) {
          return (
            <li key={t.href} className="w-[17.5rem] shrink-0 snap-start">
              <Link href={t.href} className="group relative flex h-full min-h-[8.5rem] overflow-hidden rounded-lg border border-mint/50 bg-hero">
                <span className="relative block w-[42%] shrink-0 overflow-hidden">
                  <Image src={t.photo} alt="" fill quality={65} sizes="130px" {...blurProps(t.photo)} style={{ objectFit: "cover", objectPosition: "40% 50%" }} />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-hero" />
                </span>
                <span className="relative -ml-4 flex min-w-0 flex-1 flex-col justify-center py-3 pr-3">
                  <span className="inline-flex w-fit rounded bg-mint/15 px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-mint">Featured</span>
                  <span className="mt-1.5 text-base font-bold leading-tight text-white">{t.name}</span>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-mint">
                    Explore
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </li>
          );
        }
        return (
          <li key={t.href} className="w-[8.75rem] shrink-0 snap-start">
            <Link href={t.href} className="flex h-full flex-col overflow-hidden rounded-lg border border-white/15 bg-white/[0.07]">
              <span className={`relative block h-[4.5rem] shrink-0 ${t.image ? "bg-tile" : "flex items-center justify-center bg-white/10"}`}>
                {t.image ? (
                  <Image src={t.image} alt="" fill quality={55} sizes="140px" {...blurProps(t.image)} style={{ objectFit: "cover" }} />
                ) : (
                  Icon && <Icon className="h-7 w-7 text-mint" aria-hidden="true" strokeWidth={1.75} />
                )}
              </span>
              <span className="flex flex-1 flex-col p-2.5">
                <span className="text-sm font-semibold leading-tight text-white">{t.name}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
