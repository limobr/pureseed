import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { blurProps } from "@/lib/images";

export type NeedTile = {
  href: string;
  name: string;
  hint: string;
  image?: string;
  icon?: LucideIcon;
  /** Wide photo for the featured tile. */
  photo?: string;
  featured?: boolean;
  wide?: boolean;
};

/** "Browse our range" as photo tiles for large screens, built for the dark hero: translucent tiles, light text. */
export function NeedTiles({ tiles }: { tiles: NeedTile[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3">
      {tiles.map((t, i) => {
        const Icon = t.icon;
        const big = !!t.featured;

        if (big && t.photo) {
          return (
            <li key={t.href} className="col-span-2">
              <Link
                href={t.href}
                className="group relative flex h-full min-h-[11rem] overflow-hidden rounded-lg border border-mint/50 bg-hero shadow-lg shadow-black/20 transition-colors hover:border-mint"
              >
                <span className="relative block w-[46%] shrink-0 overflow-hidden">
                  <Image
                    src={t.photo}
                    alt=""
                    fill
                    quality={70}
                    sizes="(min-width: 1280px) 330px, 280px"
                    {...blurProps(t.photo)}
                    style={{ objectFit: "cover", objectPosition: "40% 50%" }}
                    className="transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-hero" />
                </span>
                <span className="relative -ml-6 flex min-w-0 flex-1 flex-col justify-center py-5 pl-0 pr-5">
                  <span className="inline-flex w-fit items-center rounded bg-mint/15 px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wider text-mint">
                    Featured
                  </span>
                  <span className="mt-2.5 text-xl font-bold leading-tight text-white xl:text-[1.375rem]">{t.name}</span>
                  <span className="mt-1.5 text-sm leading-snug text-white/70">{t.hint}</span>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-mint">
                    Explore
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </li>
          );
        }

        return (
          <li key={t.href} className={t.wide ? "col-span-2" : undefined}>
            <Link
              href={t.href}
              className="group flex h-full items-center gap-3.5 rounded-lg border border-white/15 bg-white/[0.07] p-3 transition-colors hover:border-white/50 hover:bg-white/[0.14]"
            >
              <span className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-md ${t.image ? "bg-tile" : "flex items-center justify-center bg-white/10"}`}>
                {t.image ? (
                  <Image src={t.image} alt="" fill quality={60} priority={i < 3} sizes="56px" {...blurProps(t.image)} style={{ objectFit: "cover" }} />
                ) : (
                  Icon && <Icon className="h-6 w-6 text-mint" aria-hidden="true" strokeWidth={1.75} />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-[0.95rem] font-semibold leading-tight text-white">{t.name}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-white/40 transition-colors group-hover:text-white" aria-hidden="true" />
                </span>
                <span className="mt-0.5 block truncate text-[0.8rem] leading-snug text-white/65">{t.hint}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
