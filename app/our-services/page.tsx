import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { blurProps } from "@/lib/images";
import { meta } from "@/lib/seo";
import { services } from "@/lib/data";

export const metadata = meta("Services & Capabilities", "Agricultural sourcing, bulk supply, processing, quality and traceability, packaging, private label and export logistics from one integrated supply chain.", "/our-services");

export default function Services() {
  return (
    <PageShell
      crumbs={[{ name: "Services", path: "/our-services" }]}
      title="Services and capabilities"
      lead="Responsible sourcing, modern processing, quality control and export capabilities."
    >
      <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {services.map((s, i) => (
          <li key={s.slug}>
            <Link href={`/service/${s.slug}`} className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-bg transition-colors hover:border-ink">
              <span className="relative block aspect-[3/2] overflow-hidden border-b border-line bg-tile">
                <Image src={s.image} alt={s.headline} fill priority={i < 2} quality={65} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" {...blurProps(s.image)} style={{ objectFit: "cover" }} className="photo-dim transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none" />
              </span>
              <span className="flex flex-1 flex-col gap-1.5 p-5">
                <h2 className="text-lg font-bold leading-tight text-ink">{s.name}</h2>
                <p className="flex-1 text-sm leading-6 text-charcoal">{s.headline}</p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex flex-col items-start gap-3 rounded-lg border border-line bg-mist p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-base font-semibold text-ink">Ready to discuss your requirements?</p>
        <Link href="/contact-us" className="btn-primary">Request a quote</Link>
      </div>
    </PageShell>
  );
}
