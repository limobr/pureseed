import type { Metadata } from "next";
import { ogImage, site } from "./data";

export function meta(title: string, description: string, path: string, image?: string): Metadata {
  return {
    title, description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: site.name, type: "website", images: [{ url: image ?? ogImage }] },
    twitter: { card: "summary_large_image", title, description },
  };
}
