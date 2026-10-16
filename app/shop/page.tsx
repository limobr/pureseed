import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Catalog } from "@/components/Catalog";
import { JsonLd } from "@/components/JsonLd";
import { meta } from "@/lib/seo";
import { products } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

export const metadata = meta("Products", "Sesame seeds, sesame oil, cashew nuts, groundnuts and organic honey: sourced in Africa, processed and prepared for international buyers.", "/shop");

export default function Shop() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "PureSeed products",
    itemListElement: products.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(`/product/${p.slug}`), name: p.name })),
  };
  return (
    <>
      <JsonLd data={ld} />
      <div className="mx-auto max-w-page px-4 pt-4 sm:px-6 sm:pt-8 lg:px-8 lg:pt-12">
        <Breadcrumbs items={[{ name: "Products", path: "/shop" }]} />
      </div>
      <Catalog products={products} headingLevel="h1" />
    </>
  );
}
