"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { HeaderSearch } from "./HeaderSearch";
import { ShopMenu, type ShopLink } from "./ShopMenu";
import { ThemeToggle } from "./ThemeToggle";
import type { SearchDoc } from "@/lib/search";
import { site } from "@/lib/data";

const links = [
  { href: "/our-services", label: "Services" },
  { href: "/service/private-label", label: "Private label" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about-us", label: "About us" },
  { href: "/contact-us", label: "Contact us" },
];

export function Header({ shopLinks, searchDocs }: { shopLinks: ShopLink[]; searchDocs: SearchDoc[] }) {
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg print:hidden">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" data-logo className="flex items-center" aria-label="PureSeed home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav
          aria-label="Primary"
          className={`hidden items-center gap-6 transition-opacity duration-150 lg:flex ${
            searching ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <ShopMenu links={shopLinks} />
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-slate transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 lg:gap-3">
          <HeaderSearch docs={searchDocs} onOpenChange={setSearching} />
          <span className="hidden lg:inline-flex">
            <ThemeToggle />
          </span>
          <a href={site.phoneHref} className="hidden items-center gap-2 text-sm font-semibold text-ink xl:inline-flex">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {site.phone}
          </a>
          <Link href="/contact-us" className="btn-primary hidden lg:inline-flex">
            Request a quote
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-bg lg:hidden">
          <nav aria-label="Mobile" className="mx-auto flex max-w-page flex-col px-4 py-2 sm:px-6">
            <p className="pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-slate">Products</p>
            {shopLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-line py-3 text-base font-medium text-ink">
                {l.name}
              </Link>
            ))}
            <p className="pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-slate">Company</p>
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-line py-3.5 text-base font-medium text-ink">
                {l.label}
              </Link>
            ))}
            <div className="flex items-center justify-between border-b border-line py-2">
              <span className="text-base font-medium text-ink">Theme</span>
              <ThemeToggle />
            </div>
            <div className="grid grid-cols-2 gap-3 py-4">
              <a href={site.phoneHref} className="btn-outline">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call
              </a>
              <Link href="/contact-us" onClick={() => setOpen(false)} className="btn-primary">
                Get a quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
