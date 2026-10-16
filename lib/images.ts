import blurData from "./blur-data.json";

const previews = blurData as Record<string, string>;

/** Spread onto next/image: shows the tiny inline preview while the real photo loads. */
export const blurProps = (src: string) =>
  previews[src] ? { placeholder: "blur" as const, blurDataURL: previews[src] } : {};

/** Photos used on the home page. */
export const heroBackground = "/images/service-bulk.jpg";
export const featuredPhoto = "/images/sesame-seeds-field.jpg";
export const bandPhoto = "/images/service-processing.jpg";
