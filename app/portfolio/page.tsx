import Image from "next/image";
import Link from "next/link";
import PrintButton from "@/components/PrintButton";
import { PageShell } from "@/components/PageShell";
import { meta } from "@/lib/seo";
import { mapLabel, products, services, site } from "@/lib/data";

export const metadata = meta("Company Portfolio", "PureSeed company portfolio: product range, capabilities and supply-chain services for international buyers of African agricultural products.", "/portfolio");

export default function Portfolio() {
  return (
    <PageShell
      crumbs={[{ name: "Portfolio", path: "/portfolio" }]}
      title="Company portfolio"
      lead="An overview of PureSeed’s products and capabilities for international buyers."
    >
      <div className="print:hidden"><PrintButton /></div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold tracking-tight">Who we are</h2>
        <p className="mt-3 max-w-prose text-base leading-7 text-charcoal">
          PureSeed is an integrated agricultural processor, manufacturer, and exporter based in Nairobi, Kenya. We manage the journey from sourcing and processing to quality control, packaging, and export preparation.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="text-2xl font-bold tracking-tight">Product portfolio</h2>
        <div className="mt-6 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <thead className="bg-mist text-ink">
              <tr>
                <th className="px-4 py-3 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">Preparation</th>
                <th className="px-4 py-3 font-semibold">Typical buyers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {products.map((p) => (
                <tr key={p.slug}>
                  <td className="px-4 py-3">
                    <Link href={`/product/${p.slug}`} className="inline-flex items-center gap-3 font-semibold text-ink underline-offset-4 hover:underline">
                      <Image src={p.image} alt="" width={48} height={48} sizes="48px" className="h-12 w-12 rounded-md border border-line object-cover" />
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-charcoal">{p.form}</td>
                  <td className="px-4 py-3 text-charcoal">{p.applications}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="text-2xl font-bold tracking-tight">Capabilities</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug} className="rounded-lg border border-line bg-bg p-5">
              <h3 className="text-lg font-bold leading-tight text-ink"><Link href={`/service/${s.slug}`} className="hover:underline underline-offset-4">{s.name}</Link></h3>
              <p className="mt-1.5 text-sm leading-6 text-charcoal">{s.headline}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="text-2xl font-bold tracking-tight">Contact</h2>
        <p className="mt-3 space-y-1 text-base leading-7 text-charcoal">
          <a href={site.map} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{mapLabel}</a><br />
          <a href={`mailto:${site.email}`} className="underline underline-offset-4">{site.email}</a> · <a href={site.phoneHref} className="underline underline-offset-4">{site.phone}</a>
        </p>
      </section>
    </PageShell>
  );
}
