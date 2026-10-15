import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { logoTagline, mapLabel, nav, products, site } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="ftr">
      <Reveal className="wrap grid3" anim="stagger">
        <div>
          <Image src={logoTagline} alt="PureSeed: processor and exporter of sesame seeds, sesame oil, cashew nuts, groundnuts and organic honey" width={1000} height={357} sizes="280px" className="ftr-logo" />
          <p>Sesame, cashew, groundnuts and honey, processed and exported from Nairobi, Kenya to buyers worldwide.</p>
        </div>
        <div>
          <h3>Contact</h3>
          <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
          <p><a href={`tel:${site.phone}`}>{site.phone}</a></p>
          <p><a href={site.whatsapp} rel="noopener">WhatsApp</a></p>
          <p><a href={site.map} target="_blank" rel="noopener noreferrer">{mapLabel}</a></p>
        </div>
        <div>
          <h3>Company</h3>
          {nav.map((n) => <p key={n.href}><Link href={n.href}>{n.label}</Link></p>)}
          <p><Link href="/contact-us">Contact Us</Link></p>
        </div>
        <div>
          <h3>Products</h3>
          {products.map((p) => <p key={p.slug}><Link href={`/product/${p.slug}`}>{p.name}</Link></p>)}
        </div>
      </Reveal>
      <div className="wrap sub">
        <span>© {new Date().getFullYear()} PureSeed. All rights reserved.</span>
        <nav aria-label="Footer">{nav.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}</nav>
      </div>
    </footer>
  );
}
