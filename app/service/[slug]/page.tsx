import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ChipScroller, chipClass } from "@/components/ChipScroller";
import { blurProps } from "@/lib/images";
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
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <div className="mx-auto max-w-page px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
      <Breadcrumbs items={[{ name: "Services", path: "/our-services" }, { name: s.name, path: `/service/${s.slug}` }]} />

      <h1 className="max-w-3xl text-2xl font-bold leading-tight tracking-tight sm:text-4xl">{s.name}</h1>
      <p className="mt-2 max-w-3xl text-base leading-7 text-slate sm:mt-4 sm:text-lg sm:leading-8">{s.headline}</p>

      <div className="relative mt-6 aspect-[934/474] overflow-hidden rounded-lg border border-line bg-tile sm:mt-8">
        <Image src={s.image} alt={s.headline} fill priority quality={70} sizes="(min-width: 1280px) 1200px, 100vw" {...blurProps(s.image)} style={{ objectFit: "cover" }} className="photo-dim" />
      </div>

      <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-3 lg:gap-14">
        <article className="lg:col-span-2">
          <p className="max-w-prose text-lg leading-8 text-charcoal">{s.intro}</p>
          <div className="rich mt-6">
            {s.sections.map((x) => (
              <section key={x.h}>
                <h2>{x.h}</h2>
                <p>{x.p}</p>
              </section>
            ))}
          </div>
        </article>

        <aside className="space-y-6">
          <div className="overflow-hidden rounded-lg border border-line bg-mist">
            <div className="relative aspect-[10/7] border-b border-line bg-tile">
              <Image src={s.listImage} alt={s.listTitle} fill quality={65} sizes="(min-width: 1024px) 400px, 100vw" {...blurProps(s.listImage)} style={{ objectFit: "cover" }} className="photo-dim" />
            </div>
            <div className="p-5">
              <h2 className="text-lg font-bold leading-tight text-ink">{s.listTitle}</h2>
              <ul className="mt-3 space-y-2">
                {s.list.map((l) => (
                  <li key={l} className="flex gap-3 text-sm leading-6 text-charcoal">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-accent-text" aria-hidden="true" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-lg bg-hero p-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-wider text-mint">Let’s talk</p>
            <h2 className="mt-1 text-lg font-bold leading-tight">{s.cta}</h2>
            <Link href="/contact-us" className="btn-light mt-4 w-full">Talk to our team</Link>
          </div>
        </aside>
      </div>

      <section aria-labelledby="more-title" className="mt-14 border-t border-line pt-10">
        <h2 id="more-title" className="mb-4 text-xl font-bold tracking-tight">More services</h2>
        <ChipScroller as="nav" label="More services">
          {others.map((o) => (
            <Link key={o.slug} href={`/service/${o.slug}`} className={chipClass()}>{o.name}</Link>
          ))}
        </ChipScroller>
      </section>
    </div>
  );
}
