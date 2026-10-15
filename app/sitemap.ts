import type { MetadataRoute } from "next";
import { products, services, site } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about-us", "/shop", "/our-services", "/portfolio", "/contact-us",
    ...products.map((p) => `/product/${p.slug}`), ...services.map((s) => `/service/${s.slug}`)];
  return paths.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
