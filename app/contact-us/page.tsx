import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { PageShell } from "@/components/PageShell";
import { enquiryChecklist, mapLabel, nextSteps, site } from "@/lib/data";
import { meta } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";
import { Check } from "lucide-react";

export const metadata = meta("Contact Us", "Contact PureSeed for premium African agricultural products: sesame, cashew, groundnuts and honey. Request a quote for bulk or private-label supply.", "/contact-us");

export default async function Contact({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const { product } = await searchParams;
  return (
    <PageShell
      crumbs={[{ name: "Contact us", path: "/contact-us" }]}
      title="Get in touch"
      lead="Tell us what you need and we will reply by email."
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <ul className="space-y-5 text-base">
            <li className="flex gap-4">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-accent-text" aria-hidden="true" />
              <div>
                <h2 className="text-base font-semibold">Email address</h2>
                <a href={`mailto:${site.email}`} className="break-all text-charcoal underline underline-offset-4">{site.email}</a>
              </div>
            </li>
            <li className="flex gap-4">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-accent-text" aria-hidden="true" />
              <div>
                <h2 className="text-base font-semibold">Phone and WhatsApp</h2>
                <a href={site.phoneHref} className="text-charcoal underline underline-offset-4">{site.phone}</a>
              </div>
            </li>
            <li className="flex gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent-text" aria-hidden="true" />
              <div>
                <h2 className="text-base font-semibold">Location</h2>
                <a href={site.map} target="_blank" rel="noopener noreferrer" className="text-charcoal underline underline-offset-4">{mapLabel}</a>
              </div>
            </li>
          </ul>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={whatsappLink("Hello, I would like to enquire about your products.")} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Message on WhatsApp
            </a>
            <a href={site.phoneHref} className="btn-outline">Call now</a>
          </div>
        </div>

        <ContactForm defaultProduct={product} />
      </div>

      <section className="-mx-4 mt-14 border-y border-line bg-mist px-4 py-10 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Help us quote faster</h2>
            <p className="mt-2 max-w-prose text-base leading-7 text-charcoal">The more we know about what you need, the faster we can respond. Where you can, include:</p>
            <ul className="mt-4 space-y-2">
              {enquiryChecklist.map((c) => (
                <li key={c} className="flex gap-3 text-base leading-7 text-charcoal">
                  <Check className="mt-1.5 h-4 w-4 shrink-0 text-accent-text" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">What happens next</h2>
            <ol className="mt-4 space-y-4">
              {nextSteps.map((n, i) => (
                <li key={n.h} className="flex gap-4 rounded-lg border border-line bg-bg p-4">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-inverse text-sm font-bold text-inverse-fg">{i + 1}</span>
                  <div>
                    <h3 className="text-base font-bold leading-tight text-ink">{n.h}</h3>
                    <p className="mt-1 text-sm leading-6 text-charcoal">{n.p}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
