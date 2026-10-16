import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { ProductCard } from "@/components/ProductCard";
import { blurProps } from "@/lib/images";
import { meta } from "@/lib/seo";
import { buyers, processSteps, products, valueProps } from "@/lib/data";

export const metadata = meta("About Us", "PureSeed combines agricultural sourcing, processing, quality control, packaging and export coordination under one integrated supply chain.", "/about-us");

const card = "h-full rounded-lg border border-line bg-bg p-5";

export default function About() {
  return (
    <PageShell
      crumbs={[{ name: "About us", path: "/about-us" }]}
      title="About PureSeed"
      lead="We transform agricultural raw materials into processed, market-ready products."
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="rich">
          <h2>More than agricultural supply</h2>
          <p>PureSeed combines agricultural sourcing, processing, quality control, packaging, and export coordination under one integrated supply chain.</p>
          <h3>Quality &amp; consistency</h3>
          <p>We apply controlled processes and quality standards throughout our operations to deliver products that meet customer and market requirements.</p>
          <h3>Traceability &amp; control</h3>
          <p>From origin to shipment, PureSeed maintains visibility across key stages of the supply chain, supporting transparency and dependable sourcing.</p>
        </div>
        <div className="relative aspect-[10/7] overflow-hidden rounded-lg border border-line bg-tile">
          <Image src="/images/service-sourcing-origin.jpg" alt="Harvested crops drying at origin" fill priority quality={70} sizes="(min-width: 1024px) 560px, 100vw" {...blurProps("/images/service-sourcing-origin.jpg")} style={{ objectFit: "cover" }} className="photo-dim" />
        </div>
      </div>

      <section className="mt-14 border-t border-line pt-10">
        <h2 className="text-2xl font-bold tracking-tight">Turning African agriculture into global value</h2>
        <p className="mt-3 max-w-prose text-base leading-7 text-charcoal">
          PureSeed goes beyond sourcing agricultural commodities. We add value through processing, preparation, packaging, and product development designed for international markets.
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {["Flexible product solutions", "Built for market needs", "From raw to ready"].map((t) => (
            <li key={t} className="rounded-md border border-line bg-mist px-3 py-2 text-sm font-medium text-charcoal">{t}</li>
          ))}
        </ul>
      </section>

      <section className="mt-14 border-t border-line pt-10">
        <h2 className="text-2xl font-bold tracking-tight">From origin to shipment</h2>
        <p className="mt-1 text-base text-slate">How a PureSeed product moves from the field to your warehouse.</p>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((s, i) => (
            <li key={s.h} className={card}>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-inverse text-sm font-bold text-inverse-fg">{i + 1}</span>
              <h3 className="mt-3 text-lg font-bold leading-tight text-ink">{s.h}</h3>
              <p className="mt-1.5 text-sm leading-6 text-charcoal">{s.p}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="-mx-4 mt-14 border-y border-line bg-mist px-4 py-10 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight">What we stand for</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((v) => (
            <li key={v.h} className={card}>
              <h3 className="text-lg font-bold leading-tight text-ink">{v.h}</h3>
              <p className="mt-1.5 text-sm leading-6 text-charcoal">{v.p}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight">Who we work with</h2>
        <p className="mt-1 text-base text-slate">Our customers are businesses that buy at commercial scale.</p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {buyers.map((b) => (
            <li key={b.h} className={card}>
              <h3 className="text-lg font-bold leading-tight text-ink">{b.h}</h3>
              <p className="mt-1.5 text-sm leading-6 text-charcoal">{b.p}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 border-t border-line pt-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Our products</h2>
          <Link href="/shop" className="text-sm font-semibold text-ink underline underline-offset-4">View all</Link>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-5">
          {products.map((p) => <li key={p.slug}><ProductCard product={p} /></li>)}
        </ul>
      </section>

      <div className="mt-12 flex flex-col items-start gap-3 rounded-lg border border-line bg-mist p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-base font-semibold text-ink">Ready to discuss your requirements?</p>
        <Link href="/contact-us" className="btn-primary">Request a quote</Link>
      </div>
    </PageShell>
  );
}
