import { notFound } from "next/navigation";
import Link from "next/link";
import CTA from "@/components/CTA";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import { meta } from "@/lib/seo";
import { services } from "@/lib/data";

export const dynamicParams = false;
export function generateStaticParams() { return services.map((s) => ({ slug: s.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return meta(s.name, `${s.headline}. ${s.intro}`.slice(0, 300), `/service/${s.slug}`, s.image);
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  return (
    <>
      <section className="page-hero"><div className="wrap"><p className="crumb"><Link href="/our-services">Services</Link></p><h1>{s.name}</h1><p className="lead">{s.headline}</p></div></section>
      <section className="sec"><div className="wrap side">
        <article>
          <Media src={s.image} alt={s.headline} ratio="934/474" priority sizes="(max-width:900px) 100vw, 840px" className="banner" />
          <p className="lead-p">{s.intro}</p>
          {s.sections.map((x) => <Reveal key={x.h} anim="left"><h2>{x.h}</h2><p>{x.p}</p></Reveal>)}
          <Reveal className="split" anim="sides">
            <div><h2>{s.listTitle}</h2><ul className="ticks">{s.list.map((l) => <li key={l}>{l}</li>)}</ul></div>
            <Media src={s.listImage} alt={s.listTitle} ratio="10/7" sizes="(max-width:900px) 100vw, 400px" className="banner" />
          </Reveal>
        </article>
        <aside>
          <h3>Our services</h3>
          {services.filter((x) => x.slug !== s.slug).map((x) => <Link key={x.slug} href={`/service/${x.slug}`}>{x.name}</Link>)}
        </aside>
      </div></section>
      <CTA title={s.cta} label="Talk to our team" />
    </>
  );
}
