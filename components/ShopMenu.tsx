"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

export type ShopLink = { href: string; name: string; hint: string };

/** Desktop "Products" dropdown: every product one click from any page. */
export function ShopMenu({ links }: { links: ShopLink[] }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={root}
      className="relative"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="shop-menu"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 text-sm font-medium text-slate transition-colors hover:text-ink"
      >
        Products
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {open && (
        <div id="shop-menu" className="absolute left-1/2 top-full z-50 mt-5 w-[22rem] -translate-x-1/2 rounded-lg border border-line bg-bg p-2 shadow-xl">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="block rounded-md px-3 py-2.5 transition-colors hover:bg-mist">
                  <span className="block text-sm font-semibold text-ink">{l.name}</span>
                  <span className="block text-[0.8rem] leading-snug text-slate">{l.hint}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/shop"
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center justify-between border-t border-line px-3 pb-2 pt-3 text-sm font-semibold text-ink"
          >
            View all products
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
}
