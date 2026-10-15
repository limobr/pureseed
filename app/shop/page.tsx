import Link from "next/link";
import CTA from "@/components/CTA";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import { meta } from "@/lib/seo";
import { products } from "@/lib/data";

export const metadata = meta("Products", "Sesame seeds, sesame oil, cashew nuts, groundnuts and organic honey: sourced in Africa, processed and prepared for international buyers.", "/shop");

export default function Shop() {
  return (
    <>
      <section className="page-hero"><div className="wrap"><h1>Our products</h1><p className="lead">A focused portfolio of agricultural products sourced, processed, and prepared for international buyers.</p></div></section>
      <section className="sec"><div className="wrap"><Reveal className="plist" anim="stagger">
        {products.map((p) => (
          <Link key={p.slug} href={`/product/${p.slug}`} className="prow">
            <Media src={p.image} alt={p.name} ratio="1/1" fit="contain" zoom sizes="170px" />
            <div><h2>{p.name}</h2><p>{p.intro[0]}</p><span className="more">View details &amp; request a quote</span></div>
          </Link>
        ))}
      </Reveal></div></section>
      <CTA label="Request a quote" />
    </>
  );
}
