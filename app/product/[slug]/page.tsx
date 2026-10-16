import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, MessageCircle, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/FaqList";
import { FormatIcon } from "@/components/FormatIcon";
import { Gallery } from "@/components/Gallery";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { categories, formats, products, site } from "@/lib/data";
import { meta } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";

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

  const category = categories.find((c) => c.id === p.category)!;
  const supplied = formats.filter((f) => p.formats.includes(f.id));
  const related = products.filter((x) => x.slug !== p.slug);
  const quote = `/contact-us?product=${encodeURIComponent(p.name)}`;

  const ld = [
    {
      "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.intro.join(" "), image: p.image,
      brand: { "@type": "Brand", name: site.name }, category: "Agricultural products",
    },
    {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: p.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <div className="mx-auto max-w-page px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <JsonLd data={ld} />
      <Breadcrumbs items={[{ name: "Products", path: "/shop" }, { name: p.name, path: `/product/${p.slug}` }]} />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <Gallery images={[p.image, p.gallery]} name={p.name} />

        <div>
          <p className="text-sm font-medium text-slate">
            <Link href={`/shop?category=${category.id}`} className="hover:text-ink hover:underline">{category.name}</Link>
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{p.name}</h1>
          <p className="mt-3 text-base leading-7 text-slate">{p.headline}</p>

          <div className="mt-6 space-y-4 text-base leading-7 text-charcoal">
            {p.intro.map((t) => <p key={t}>{t}</p>)}
          </div>

          <div className="mt-8">
            <h2 className="text-base font-semibold">Supplied as</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {supplied.map((f) => (
                <li key={f.id} className="inline-flex items-center gap-2 rounded-md border border-line bg-mist px-3 py-2 text-sm font-medium text-charcoal">
                  <FormatIcon id={f.id} />
                  {f.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={quote} className="btn-primary sm:flex-1">Request a quote</Link>
            <a href={whatsappLink(`Hello, I would like a quote for ${p.name}.`)} target="_blank" rel="noopener noreferrer" className="btn-outline sm:flex-1">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
          <p className="mt-4 text-sm text-slate">
            Or call{" "}
            <a href={site.phoneHref} className="inline-flex items-center gap-1 font-semibold text-ink underline underline-offset-4">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {site.phone}
            </a>
            . Samples can be discussed once we know your specification and destination.
          </p>
        </div>
      </div>

      <section aria-labelledby="desc-title" className="mt-14 border-t border-line pt-10">
        <h2 id="desc-title" className="mb-6 text-2xl font-bold tracking-tight">Product highlights</h2>
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {p.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-base text-charcoal">
              <Check className="mt-1 h-4 w-4 shrink-0 text-accent-text" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>
        <div className="rich mt-10">
          <h2>{p.blockTitle}</h2>
          {p.blockBody.map((t) => <p key={t}>{t}</p>)}
        </div>
      </section>

      <section aria-labelledby="details-title" className="mt-14 border-t border-line pt-10">
        <h2 id="details-title" className="text-2xl font-bold tracking-tight">Product details</h2>
        <p className="mt-1 max-w-2xl text-base text-slate">What this product is used for, what to specify when you enquire, and how it can be packed.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3 sm:gap-5">
          {[
            { t: "Common uses", items: p.uses },
            { t: "What to specify in your enquiry", items: p.specs },
            { t: "Packaging options", items: p.packaging },
          ].map((c) => (
            <div key={c.t} className="rounded-lg border border-line bg-mist p-5">
              <h3 className="text-lg font-bold leading-tight text-ink">{c.t}</h3>
              <ul className="mt-3 space-y-2">
                {c.items.map((i) => (
                  <li key={i} className="flex gap-3 text-sm leading-6 text-charcoal">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-accent-text" aria-hidden="true" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="faq-title" className="mt-14 max-w-3xl border-t border-line pt-10">
        <h2 id="faq-title" className="mb-5 text-2xl font-bold tracking-tight">Questions about {p.name.toLowerCase()}</h2>
        <FaqList faqs={p.faq} />
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href={quote} className="btn-primary">Request a quote</Link>
          <Link href="/service/private-label" className="btn-outline">Private label</Link>
        </div>
      </section>

      <section aria-labelledby="related-title" className="mt-16 border-t border-line pt-10">
        <h2 id="related-title" className="mb-6 text-2xl font-bold tracking-tight">Related products</h2>
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {related.map((x) => (
            <li key={x.slug}><ProductCard product={x} /></li>
          ))}
        </ul>
      </section>
    </div>
  );
}
