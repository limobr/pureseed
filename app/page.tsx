import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe2, Handshake, Package, PackageCheck, ShieldCheck, Sprout, Tag, Factory, Ship } from "lucide-react";
import { HeroSearch } from "@/components/HeroSearch";
import { MobileSearchButton } from "@/components/MobileSearchButton";
import { NeedRow } from "@/components/NeedRow";
import { NeedTiles, type NeedTile } from "@/components/NeedTiles";
import { ProductCard } from "@/components/ProductCard";
import { buyers, processSteps, products, services, site, valueProps } from "@/lib/data";
import { bandPhoto, blurProps, featuredPhoto, heroBackground } from "@/lib/images";
import { buildSearchDocs } from "@/lib/searchIndex";
import { swipeItem, swipeList } from "@/lib/swipe";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const TRUST = [
  { icon: ShieldCheck, text: "Traceable from origin" },
  { icon: PackageCheck, text: "Export-ready packing" },
  { icon: Tag, text: "Bulk and private label" },
];

const VALUE_ICONS = [Sprout, Handshake, Factory, Ship];

export default function HomePage() {
  const searchDocs = buildSearchDocs();
  const [first, ...rest] = products;

  const tiles: NeedTile[] = [
    { href: `/product/${first.slug}`, name: first.name, hint: first.headline, featured: true, photo: featuredPhoto },
    ...rest.map((p) => ({ href: `/product/${p.slug}`, name: p.name, hint: p.headline, image: p.image })),
    { href: "/service/private-label", name: "Private label", hint: "Your product, your brand, our production", icon: Tag, wide: true },
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-hero text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-20">
          <Image
            src={heroBackground}
            alt=""
            fill
            quality={65}
            sizes="100vw"
            {...blurProps(heroBackground)}
            style={{ objectFit: "cover", objectPosition: "50% 45%" }}
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-hero/95 via-hero/85 to-hero/70 lg:from-hero/95 lg:via-hero/80 lg:to-hero/60" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-hero to-transparent" />
        <div className="mx-auto max-w-page px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-8">
          <div className="grid items-center gap-5 sm:gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <h1 className="max-w-xl text-[1.75rem] font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.4rem]">
                Value-added agricultural products, from Africa to global markets
              </h1>
              <p className="mt-4 hidden max-w-lg text-base leading-7 text-white/80 sm:block lg:hidden">
                Sesame, cashew, groundnuts and honey for food manufacturers, wholesalers and private-label brands.
              </p>

              <div className="mt-7 hidden lg:block">
                <HeroSearch docs={searchDocs} />
              </div>
              <div className="mt-4 sm:hidden">
                <MobileSearchButton />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-6 sm:flex lg:mt-5">
                <Link href="/contact-us" className="btn-light">Request a quote</Link>
                <Link href="/shop" className="btn-outline-light">Shop all</Link>
              </div>
            </div>

            <div className="min-w-0 lg:col-span-7">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-white/70 lg:mb-3">What do you need?</h2>
              <div className="hidden lg:block"><NeedTiles tiles={tiles} /></div>
              <div className="lg:hidden"><NeedRow tiles={tiles} /></div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <ul className="[contain:paint] sm:[contain:none] mx-auto flex max-w-page gap-x-5 overflow-x-auto whitespace-nowrap px-4 py-2.5 text-xs text-white/80 [scrollbar-width:none] sm:grid sm:grid-cols-3 sm:gap-y-2 sm:px-6 sm:py-3 sm:text-sm lg:px-8 [&::-webkit-scrollbar]:hidden">
            {TRUST.map(({ icon: Icon, text }) => (
              <li key={text} className="flex shrink-0 items-center gap-2 sm:gap-2.5">
                <Icon className="h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="featured-title" className="bg-bg">
        <div className="mx-auto max-w-page px-4 py-5 sm:px-6 sm:py-10 lg:px-8 lg:py-10">
          <div className="mb-3 flex items-end justify-between gap-4 sm:mb-6">
            <div>
              <h2 id="featured-title" className="text-xl font-bold tracking-tight sm:text-3xl">Our products</h2>
              <p className="mt-1 hidden text-sm text-slate sm:block sm:text-base">Five export-ready products, sourced and processed in Africa.</p>
            </div>
            <Link href="/shop" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink underline underline-offset-4">
              View all
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className={`${swipeList} xl:grid-cols-5`}>
            {products.map((p, i) => (
              <li key={p.slug} className={swipeItem}>
                <ProductCard product={p} priority={i < 2} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="services-title" className="border-t border-line bg-bg">
        <div className="mx-auto max-w-page px-4 py-5 sm:px-6 sm:py-10 lg:px-8 lg:py-10">
          <div className="mb-3 flex flex-col gap-1 sm:mb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <div>
              <h2 id="services-title" className="text-xl font-bold tracking-tight sm:text-3xl">Services and capabilities</h2>
              <p className="mt-1 hidden text-sm text-slate sm:block sm:text-base">One supply chain, managed from origin to shipment.</p>
            </div>
            <Link href="/our-services" className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-semibold text-ink underline underline-offset-4 max-sm:-mt-1">
              All services
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className={`${swipeList} xl:grid-cols-3`}>
            {services.map((s) => (
              <li key={s.slug} className="w-[72vw] max-w-[19rem] shrink-0 snap-start md:w-auto md:max-w-none">
                <Link href={`/service/${s.slug}`} className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-bg transition-colors hover:border-ink">
                  <span className="relative block h-32 shrink-0 overflow-hidden border-b border-line bg-tile sm:h-40">
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      quality={65}
                      sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, 72vw"
                      {...blurProps(s.image)}
                      style={{ objectFit: "cover" }}
                      className="photo-dim transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                    />
                  </span>
                  <span className="flex flex-1 flex-col gap-1.5 p-4">
                    <span className="text-base font-bold leading-tight text-ink">{s.name}</span>
                    <span className="flex-1 text-sm leading-6 text-charcoal">{s.headline}</span>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="why-title" className="border-t border-line bg-mist">
        <div className="mx-auto max-w-page px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <h2 id="why-title" className="text-xl font-bold tracking-tight sm:text-3xl">Why PureSeed</h2>
          <p className="mt-1 max-w-2xl text-sm text-slate sm:mt-2 sm:text-base">Quality you can rely on, shipment after shipment.</p>
          <ul className={`${swipeList} mt-5 sm:mt-8 lg:grid-cols-4`}>
            {valueProps.map((v, i) => {
              const Icon = VALUE_ICONS[i] ?? Globe2;
              return (
                <li key={v.h} className="w-[78vw] max-w-[20rem] shrink-0 snap-start md:w-auto md:max-w-none">
                  <div className="flex h-full flex-col rounded-lg border border-line bg-bg p-5">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-mist text-accent-text">
                      <Icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-3 text-lg font-bold leading-tight text-ink">{v.h}</h3>
                    <p className="mt-1.5 flex-1 text-sm leading-6 text-charcoal">{v.p}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="steps-title" className="border-t border-line bg-bg">
        <div className="mx-auto max-w-page px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <h2 id="steps-title" className="text-xl font-bold tracking-tight sm:text-3xl">From origin to shipment</h2>
          <p className="mt-1 max-w-2xl text-sm text-slate sm:mt-2 sm:text-base">What you specify is what arrives.</p>
          <ol className={`${swipeList} mt-5 sm:mt-8 lg:grid-cols-5`}>
            {processSteps.map((s, i) => (
              <li key={s.h} className="w-[70vw] max-w-[17rem] shrink-0 snap-start md:w-auto md:max-w-none">
                <div className="h-full rounded-lg border border-line bg-bg p-5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-inverse text-sm font-bold text-inverse-fg">{i + 1}</span>
                  <h3 className="mt-3 text-lg font-bold leading-tight text-ink">{s.h}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-charcoal">{s.p}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="buyers-title" className="border-t border-line bg-mist">
        <div className="mx-auto max-w-page px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <h2 id="buyers-title" className="text-xl font-bold tracking-tight sm:text-3xl">Who we supply</h2>
          <p className="mt-1 max-w-2xl text-sm text-slate sm:mt-2 sm:text-base">Businesses that need dependable volumes and consistent specifications.</p>
          <ul className={`${swipeList} mt-5 sm:mt-8 lg:grid-cols-4`}>
            {buyers.map((b) => (
              <li key={b.h} className="w-[78vw] max-w-[20rem] shrink-0 snap-start md:w-auto md:max-w-none">
                <div className="h-full rounded-lg border border-line bg-bg p-5">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-mist text-accent-text">
                    <Package className="h-5 w-5" aria-hidden="true" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-3 text-lg font-bold leading-tight text-ink">{b.h}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-charcoal">{b.p}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col items-start gap-3 rounded-lg border border-line bg-bg p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-base font-semibold text-ink">Your product. Your brand. Our production.</p>
            <Link href="/contact-us" className="btn-primary">Contact us today</Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-title" className="border-t border-line bg-bg">
        <div className="mx-auto grid max-w-page gap-4 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-3 lg:gap-8 lg:px-8">
          <h2 id="about-title" className="text-2xl font-bold tracking-tight sm:text-3xl">About PureSeed</h2>
          <div className="space-y-4 text-base leading-7 text-charcoal lg:col-span-2">
            <p>
              PureSeed is an integrated agricultural processor, manufacturer, and exporter delivering quality agricultural products from
              Africa to international markets. We are based in {site.locality}.
            </p>
            <p>
              We manage the journey from sourcing and processing to quality control, packaging, and export preparation, giving our
              customers greater consistency, traceability, and confidence in every shipment. Read more{" "}
              <Link href="/about-us" className="font-semibold text-ink underline underline-offset-4">about us</Link> or see our{" "}
              <Link href="/portfolio" className="font-semibold text-ink underline underline-offset-4">company portfolio</Link>.
            </p>
            <div className="relative h-44 overflow-hidden rounded-lg border border-line sm:h-56">
              <Image src={bandPhoto} alt="Grain being inspected at origin" fill quality={65} sizes="(min-width: 1024px) 700px, 100vw" {...blurProps(bandPhoto)} style={{ objectFit: "cover" }} className="photo-dim" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
