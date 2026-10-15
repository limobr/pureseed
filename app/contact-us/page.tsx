import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { meta } from "@/lib/seo";
import { enquiryChecklist, mapLabel, nextSteps, site } from "@/lib/data";

export const metadata = meta("Contact Us", "Contact PureSeed for premium African agricultural products: sesame, cashew, groundnuts and honey. Request a quote for bulk or private-label supply.", "/contact-us");

export default async function Contact({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const { product } = await searchParams;
  return (
    <>
      <section className="page-hero"><div className="wrap"><h1>Contact us</h1><p className="lead">Tell us what you need and we will reply by email.</p></div></section>
      <section className="sec"><div className="wrap split">
        <ContactForm defaultProduct={product} />
        <div className="panel">
          <h3>Email</h3><p><a href={`mailto:${site.email}`}>{site.email}</a></p>
          <h3>Phone and WhatsApp</h3><p><a href={`tel:${site.phone}`}>{site.phone}</a> · <a href={site.whatsapp} rel="noopener">WhatsApp</a></p>
          <h3>Location</h3><p><a href={site.map} target="_blank" rel="noopener noreferrer">{mapLabel}</a></p>
        </div>
      </div></section>
      <section className="sec alt"><Reveal className="wrap facts" anim="sides">
        <div>
          <h2>Help us quote faster</h2>
          <p className="measure">The more we know about what you need, the faster we can respond. Where you can, include:</p>
          <ul className="ticks">{enquiryChecklist.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
        <div>
          <h2>What happens next</h2>
          <ol className="steps-v">{nextSteps.map((n) => <li key={n.h}><h3>{n.h}</h3><p>{n.p}</p></li>)}</ol>
        </div>
      </Reveal></section>
    </>
  );
}
