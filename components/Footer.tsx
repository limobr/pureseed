import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeSwitch } from "./ThemeToggle";
import { mapLabel, products, site } from "@/lib/data";

const li = "inline-flex min-h-11 items-center hover:text-white sm:min-h-0";

export function Footer() {
  return (
    <footer id="contact" className="bg-footer text-white print:hidden">
      <div className="mx-auto grid max-w-page gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <Logo tone="onDark" className="h-10 w-auto" />
          <p className="max-w-xs text-sm leading-6 text-white/75">
            Sesame, cashew, groundnuts and honey, processed and exported from {site.locality} to buyers worldwide.
          </p>
          <p className="max-w-xs text-sm leading-6 text-white/75">Bulk supply and private label, packed to your specification.</p>
        </div>

        <div>
          <h2 className="mb-4 text-base font-semibold">Products</h2>
          <ul className="space-y-0 text-sm text-white/75 sm:space-y-2.5">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/product/${p.slug}`} className={li}>{p.name}</Link>
              </li>
            ))}
            <li><Link href="/shop" className={li}>All products</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-base font-semibold">Company</h2>
          <ul className="space-y-0 text-sm text-white/75 sm:space-y-2.5">
            <li><Link href="/our-services" className={li}>Services</Link></li>
            <li><Link href="/service/quality-traceability" className={li}>Quality and traceability</Link></li>
            <li><Link href="/service/private-label" className={li}>Private label</Link></li>
            <li><Link href="/portfolio" className={li}>Portfolio</Link></li>
            <li><Link href="/about-us" className={li}>About us</Link></li>
            <li><Link href="/contact-us" className={li}>Contact us</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-base font-semibold">Contact</h2>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <a href={site.phoneHref} className={li}>{site.phone}</a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <a href={`mailto:${site.email}`} className={`${li} break-all`}>{site.email}</a>
            </li>
            <li className="flex gap-3">
              <MessageCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className={li}>WhatsApp</a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <a href={site.map} target="_blank" rel="noopener noreferrer" className={li}>{mapLabel}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-page flex-col gap-4 px-4 pb-24 pt-5 sm:flex-row sm:items-center sm:justify-between sm:pb-5 sm:px-6 lg:px-8">
          <p className="text-sm text-white/60">
            {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  );
}
