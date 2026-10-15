import Link from "next/link";
import CTA from "@/components/CTA";
import Media from "@/components/Media";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import Process from "@/components/Process";
import { buyers, heroImage, processSteps, products, services, valueProps } from "@/lib/data";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Processor &amp; exporter · Nairobi, Kenya</p>
            <h1>Value-added agricultural products, from Africa to global markets.</h1>
            <p className="lead">PureSeed sources, processes and delivers sesame seeds, sesame oil, cashew nuts, groundnuts and organic honey, with quality control, traceability and flexible packaging for international buyers.</p>
            <div className="row">
              <Link href="/shop" className="btn btn-lg btn-go">Explore our products</Link>
              <Link href="/contact-us" className="btn btn-lg btn-ghost">Request a quote</Link>
            </div>
            <ul className="trust">
              <li>Traceable from origin</li><li>Export-ready packing</li><li>Bulk &amp; private label</li>
            </ul>
          </div>
          <div className="hero-art">
            <Media src={heroImage} alt="PureSeed product range: sesame, cashew nuts, groundnuts and honey" ratio="4/5" priority sizes="(max-width:900px) 100vw, 480px" />
            <div className="hero-badge">Sourced in Africa · Ready to ship</div>
          </div>
        </div>
      </section>

      <section className="strip" aria-label="PureSeed at a glance">
        <Reveal className="wrap" anim="up">
          <ul>
            <li><strong>{products.length}</strong><span>Core products</span></li>
            <li><strong>{processSteps.length} steps</strong><span>Origin to shipment</span></li>
            <li><strong>{services.length}</strong><span>Supply-chain services</span></li>
            <li><strong>Bulk + brand</strong><span>Private label available</span></li>
          </ul>
        </Reveal>
      </section>

      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head" anim="left">
            <p className="eyebrow">What we supply</p>
            <h2>Our products</h2>
            <p>Five export-ready products. Pick one to see specifications, packaging options and how to enquire.</p>
          </Reveal>
          <Reveal className="pgrid" anim="stagger">{products.map((p) => <ProductCard key={p.slug} p={p} />)}</Reveal>
          <div className="sec-actions"><Link href="/shop" className="btn btn-ghost btn-go">See all products</Link></div>
        </div>
      </section>

      <section className="sec alt">
        <div className="wrap">
          <Reveal className="sec-head center" anim="up">
            <p className="eyebrow">Why PureSeed</p>
            <h2>Quality you can rely on, shipment after shipment</h2>
          </Reveal>
          <Reveal className="grid4" anim="stagger">
            {valueProps.map((v) => <div key={v.h} className="vp-card"><h3>{v.h}</h3><p>{v.p}</p></div>)}
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head" anim="left">
            <p className="eyebrow">How it works</p>
            <h2>From origin to shipment</h2>
            <p>One supply chain, managed end to end, so what you specify is what arrives.</p>
          </Reveal>
          <Process />
        </div>
      </section>

      <section className="sec alt">
        <Reveal className="wrap split" anim="sides">
          <div>
            <p className="eyebrow">About PureSeed</p>
            <h2>From African origins to global markets</h2>
            <p>PureSeed is an integrated agricultural processor, manufacturer, and exporter delivering quality agricultural products from Africa to international markets.</p>
            <p>We manage the journey from sourcing and processing to quality control, packaging, and export preparation, giving our customers greater consistency, traceability, and confidence in every shipment.</p>
            <ul className="ticks">
              <li>Reliable global supply</li><li>Quality &amp; traceability</li><li>Bulk &amp; private label solutions</li><li>Export-ready products</li>
            </ul>
            <Link href="/about-us" className="btn btn-ghost btn-go">More about us</Link>
          </div>
          <div className="svc-list">
            {services.map((s) => (
              <Link key={s.slug} href={`/service/${s.slug}`}><strong>{s.name}</strong><span>{s.headline}</span></Link>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head" anim="left">
            <p className="eyebrow">Our customers</p>
            <h2>Who we supply</h2>
            <p>We work with businesses that need dependable volumes and consistent specifications.</p>
          </Reveal>
          <Reveal className="cards4" anim="stagger">{buyers.map((b) => <div key={b.h} className="info"><h3>{b.h}</h3><p>{b.p}</p></div>)}</Reveal>
        </div>
      </section>

      <CTA title="Your product. Your brand. Our production." label="Contact us today" />
    </>
  );
}
