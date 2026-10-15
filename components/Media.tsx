"use client";
import Image from "next/image";
import { useState } from "react";
import blurData from "@/lib/blur-data.json";

type Props = {
  src: string;
  alt: string;
  /** CSS aspect-ratio, e.g. "4/3". Reserves space so nothing shifts while loading. */
  ratio: string;
  sizes: string;
  /** Above-the-fold image: eager + high priority. It un-blurs with a pure-CSS animation, so it never waits for JavaScript. */
  priority?: boolean;
  /** "contain" for product cut-outs, "cover" for photography. */
  fit?: "cover" | "contain";
  /** Opt-in hover zoom. */
  zoom?: boolean;
  className?: string;
};

const previews = blurData as Record<string, string>;

/**
 * Blur-up image. A tiny inline preview (lib/blur-data.json) paints immediately,
 * the real image is lazy-loaded (native lazy + next/image AVIF/WebP), then it
 * sharpens and fades in over the preview.
 */
export default function Media({ src, alt, ratio, sizes, priority = false, fit = "cover", zoom = false, className = "" }: Props) {
  const [loaded, setLoaded] = useState(false);
  const preview = previews[src];
  return (
    <div
      className={`media ${className}`.trim()}
      style={{ aspectRatio: ratio }}
      data-fit={fit}
      data-zoom={zoom || undefined}
      data-fade={priority ? undefined : ""}
      data-eager={priority ? "" : undefined}
      data-loaded={loaded || undefined}
    >
      {preview && <span className="media-blur" aria-hidden="true" style={{ backgroundImage: `url(${preview})` }} />}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={loaded ? "is-loaded" : undefined}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        ref={(el) => { if (el?.complete) setLoaded(true); }}
      />
    </div>
  );
}
