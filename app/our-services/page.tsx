import Link from "next/link";
import CTA from "@/components/CTA";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import { meta } from "@/lib/seo";
import { services } from "@/lib/data";

export const metadata = meta("Services & Capabilities", "Agricultural sourcing, bulk supply, processing, quality and traceability, packaging, private label and export logistics from one integrated supply chain.", "/our-services");

export default function Services() {
  return (
    <>
      <section className="page-hero"><div className="wrap"><h1>Services and capabilities</h1><p className="lead">Responsible sourcing, modern processing, quality control and export capabilities.</p></div></section>
      <section className="sec"><div className="wrap"><Reveal className="sgrid" anim="stagger">
        {services.map((s) => (
          <Link key={s.slug} href={`/service/${s.slug}`} className="scard">
            <Media src={s.image} alt={s.headline} ratio="3/2" zoom sizes="(max-width:700px) 100vw, (max-width:1000px) 50vw, 380px" />
            <div><h2>{s.name}</h2><p>{s.headline}</p><span className="more">Learn more</span></div>
          </Link>
        ))}
      </Reveal></div></section>
      <CTA />
    </>
  );
}
