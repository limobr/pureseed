import Link from "next/link";
import Reveal from "./Reveal";
import { site } from "@/lib/data";

export default function CTA({ title = "Ready to discuss your requirements?", label = "Request a quote" }) {
  return (
    <section className="cta">
      <Reveal className="wrap" anim="sides">
        <div>
          <p className="eyebrow">Let’s talk</p>
          <h2>{title}</h2>
        </div>
        <div className="row">
          <Link href="/contact-us" className="btn btn-amber btn-lg btn-go">{label}</Link>
          <a href={site.whatsapp} className="btn btn-ghost btn-lg" rel="noopener" target="_blank">WhatsApp</a>
        </div>
      </Reveal>
    </section>
  );
}
