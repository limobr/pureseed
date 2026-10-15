import CTA from "@/components/CTA";
import Media from "@/components/Media";
import Process from "@/components/Process";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { meta } from "@/lib/seo";
import { buyers, products, valueProps } from "@/lib/data";

export const metadata = meta("About Us", "PureSeed combines agricultural sourcing, processing, quality control, packaging and export coordination under one integrated supply chain.", "/about-us");

export default function About() {
  return (
    <>
      <section className="page-hero"><div className="wrap"><p className="eyebrow">About us</p><h1>About PureSeed</h1><p className="lead">We transform agricultural raw materials into processed, market-ready products.</p></div></section>
      <section className="sec"><Reveal className="wrap split" anim="sides">
        <div>
          <h2>More than agricultural supply</h2>
          <p>PureSeed combines agricultural sourcing, processing, quality control, packaging, and export coordination under one integrated supply chain.</p>
        </div>
        <div>
          <h3>Quality &amp; consistency</h3>
          <p>We apply controlled processes and quality standards throughout our operations to deliver products that meet customer and market requirements.</p>
          <h3>Traceability &amp; control</h3>
          <p>From origin to shipment, PureSeed maintains visibility across key stages of the supply chain, supporting transparency and dependable sourcing.</p>
        </div>
      </Reveal></section>
      <section className="sec alt"><Reveal className="wrap split" anim="sides">
        <Media src="/images/service-sourcing-origin.jpg" alt="Harvested crops drying at origin" ratio="10/7" zoom sizes="(max-width:900px) 100vw, 540px" />
        <div>
        <h2>Turning African agriculture into global value</h2>
        <p className="measure">PureSeed goes beyond sourcing agricultural commodities. We add value through processing, preparation, packaging, and product development designed for international markets.</p>
        <ul className="ticks"><li>Flexible product solutions</li><li>Built for market needs</li><li>From raw to ready</li></ul>
        </div>
      </Reveal></section>
      <section className="sec"><div className="wrap">
        <Reveal className="sec-head" anim="left"><p className="eyebrow">How it works</p><h2>From origin to shipment</h2><p>How a PureSeed product moves from the field to your warehouse.</p></Reveal>
        <Process />
      </div></section>
      <section className="sec alt"><div className="wrap">
        <Reveal className="sec-head" anim="left"><h2>What we stand for</h2></Reveal>
        <Reveal className="cards4" anim="stagger">{valueProps.map((v) => <div key={v.h} className="info"><h3>{v.h}</h3><p>{v.p}</p></div>)}</Reveal>
      </div></section>
      <section className="sec"><div className="wrap">
        <Reveal className="sec-head" anim="left"><h2>Who we work with</h2><p>Our customers are businesses that buy at commercial scale.</p></Reveal>
        <Reveal className="cards4" anim="stagger">{buyers.map((b) => <div key={b.h} className="info"><h3>{b.h}</h3><p>{b.p}</p></div>)}</Reveal>
      </div></section>
      <section className="sec alt"><div className="wrap">
        <Reveal className="sec-head" anim="left"><h2>Our products</h2></Reveal>
        <Reveal className="pgrid" anim="stagger">{products.map((p) => <ProductCard key={p.slug} p={p} />)}</Reveal>
      </div></section>
      <CTA />
    </>
  );
}
