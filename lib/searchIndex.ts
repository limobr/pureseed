import { products, services, type Product } from "./data";
import type { SearchDoc } from "./search";

const CATEGORY_WORDS: Record<string, string> = {
  "seeds-oil": "sesame seed seeds oil cold pressed tahini",
  nuts: "cashew groundnut peanut nut nuts kernel snack",
  honey: "honey organic natural apiary",
};

export const productToDoc = (p: Product): SearchDoc => ({
  id: p.slug,
  kind: "product",
  title: p.name,
  sub: p.headline,
  href: `/product/${p.slug}`,
  image: p.image,
  keywords: `${CATEGORY_WORDS[p.category]} ${p.formats.includes("retail") ? "retail private label" : ""} bulk wholesale export`,
});

/** Everything the search box can find. Built on the server, searched in the browser. */
export function buildSearchDocs(): SearchDoc[] {
  const pages: SearchDoc[] = [
    ...services.map<SearchDoc>((s) => ({ id: `s-${s.slug}`, kind: "page", title: s.name, sub: s.headline, href: `/service/${s.slug}`, keywords: "service capability supply chain" })),
    { id: "about", kind: "page", title: "About PureSeed", sub: "Processor and exporter, Nairobi", href: "/about-us", keywords: "company who we are" },
    { id: "portfolio", kind: "page", title: "Company portfolio", sub: "Products and capabilities overview", href: "/portfolio", keywords: "pdf print brochure catalogue" },
    { id: "contact", kind: "page", title: "Contact us", sub: "Request a quote", href: "/contact-us", keywords: "contact phone whatsapp email quote enquiry location" },
  ];
  return [...pages, ...products.map(productToDoc)];
}
