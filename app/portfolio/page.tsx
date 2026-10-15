import Image from "next/image";
import Link from "next/link";
import PrintButton from "@/components/PrintButton";
import Reveal from "@/components/Reveal";
import { meta } from "@/lib/seo";
import { mapLabel, products, services, site } from "@/lib/data";

export const metadata = meta("Company Portfolio", "PureSeed company portfolio: product range, capabilities and supply-chain services for international buyers of African agricultural products.", "/portfolio");

export default function Portfolio() {
  return (
    <>
      <section className="page-hero"><div className="wrap"><h1>Company portfolio</h1><p className="lead">An overview of PureSeed’s products and capabilities for international buyers.</p><div className="noprint"><PrintButton /></div></div></section>
      <section className="sec"><Reveal className="wrap">
        <h2>Who we are</h2>
        <p className="measure">PureSeed is an integrated agricultural processor, manufacturer, and exporter based in Nairobi, Kenya. We manage the journey from sourcing and processing to quality control, packaging, and export preparation.</p>
      </Reveal></section>
      <section className="sec alt"><Reveal className="wrap">
        <h2>Product portfolio</h2>
        <div className="tbl"><table>
          <thead><tr><th>Product</th><th>Preparation</th><th>Typical buyers</th></tr></thead>
          <tbody>{products.map((p) => (
            <tr key={p.slug}>
              <td data-label="Product"><Image src={p.image} alt="" width={56} height={56} sizes="56px" /> <Link href={`/product/${p.slug}`}>{p.name}</Link></td>
              <td data-label="Preparation">{p.form}</td><td data-label="Typical buyers">{p.applications}</td>
            </tr>))}
          </tbody>
        </table></div>
      </Reveal></section>
      <section className="sec"><Reveal className="wrap">
        <h2>Capabilities</h2>
        <div className="grid4">{services.map((s) => <div key={s.slug}><h3><Link href={`/service/${s.slug}`}>{s.name}</Link></h3><p>{s.headline}</p></div>)}</div>
      </Reveal></section>
      <section className="sec alt"><Reveal className="wrap">
        <h2>Contact</h2>
        <p><a href={site.map} target="_blank" rel="noopener noreferrer">{mapLabel}</a><br /><a href={`mailto:${site.email}`}>{site.email}</a> · <a href={`tel:${site.phone}`}>{site.phone}</a></p>
      </Reveal></section>
    </>
  );
}
