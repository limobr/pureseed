import { notFound } from "next/navigation";
import Link from "next/link";
import CTA from "@/components/CTA";
import Faq from "@/components/Faq";
import Media from "@/components/Media";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { meta } from "@/lib/seo";
import { products, site } from "@/lib/data";

export const dynamicParams = false;
export function generateStaticParams() { return products.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) return {};
  return meta(p.name, `${p.headline}. ${p.intro[0]}`, `/product/${p.slug}`, p.image);
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();
  const ld = {
    "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.intro.join(" "), image: p.image,
    brand: { "@type": "Brand", name: site.name }, category: "Agricultural products",
  };
  const faqLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: p.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <section className="page-hero"><div className="wrap"><p className="crumb"><Link href="/shop">Products</Link></p><h1>{p.name}</h1><p className="lead">{p.headline}</p></div></section>
      <section className="sec"><div className="wrap split">
        <div className="pimg"><Media src={p.image} alt={p.name} ratio="1/1" fit="contain" priority sizes="(max-width:900px) 100vw, 540px" /></div>
        <div>
          {p.intro.map((t) => <p key={t}>{t}</p>)}
          <h2>Product highlights</h2>
          <ul className="ticks">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
          <h2>{p.blockTitle}</h2>
          {p.blockBody.map((t) => <p key={t}>{t}</p>)}
          <Link href={`/contact-us?product=${encodeURIComponent(p.name)}`} className="btn btn-amber">Request a quote</Link>
        </div>
      </div></section>
      <section className="sec"><Reveal className="wrap"><Media src={p.gallery} alt={`${p.name}: sourcing and processing`} ratio="16/7" sizes="(max-width:1200px) 100vw, 1136px" className="banner" /></Reveal></section>
      <section className="sec alt"><Reveal className="wrap">
        <div className="sec-head"><h2>Product details</h2><p>What this product is used for, what to specify when you enquire, and how it can be packed.</p></div>
        <div className="cards3">
          <div className="info"><h3>Common uses</h3><ul className="ticks">{p.uses.map((u) => <li key={u}>{u}</li>)}</ul></div>
          <div className="info"><h3>What to specify in your enquiry</h3><ul className="ticks">{p.specs.map((u) => <li key={u}>{u}</li>)}</ul></div>
          <div className="info"><h3>Packaging options</h3><ul className="ticks">{p.packaging.map((u) => <li key={u}>{u}</li>)}</ul></div>
        </div>
      </Reveal></section>
      <section className="sec"><Reveal className="wrap">
        <div className="sec-head"><h2>Questions about {p.name.toLowerCase()}</h2></div>
        <Faq items={p.faq} />
      </Reveal></section>
      <section className="sec alt"><Reveal className="wrap"><h2>Related products</h2>
        <div className="pgrid">{products.filter((x) => x.slug !== p.slug).map((x) => <ProductCard key={x.slug} p={x} />)}</div></Reveal></section>
      <CTA />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}
