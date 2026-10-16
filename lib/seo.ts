import type { Metadata } from "next";
import { ogImage, site } from "./data";
import { absoluteUrl } from "./site";

export function meta(title: string, description: string, path: string, image?: string): Metadata {
  return {
    title, description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: site.name, type: "website", images: [{ url: image ?? ogImage }] },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: absoluteUrl(item.path) })),
  };
}
