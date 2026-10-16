import { site } from "./data";

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
export const absoluteUrl = (path: string) => `${site.url}${path === "/" ? "" : path}`;
