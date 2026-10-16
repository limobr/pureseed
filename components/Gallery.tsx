"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { blurProps } from "@/lib/images";

type Props = { images: string[]; name: string };

/**
 * The first image is the priority image. Once it has loaded the rest are fetched at low priority
 * and stacked underneath, so switching images is instant and never competes with the first paint.
 */
export function Gallery({ images, name }: Props) {
  const [index, setIndex] = useState(0);
  const [warm, setWarm] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = images.length;

  useEffect(() => {
    const t = setTimeout(() => setWarm(true), 2500);
    return () => clearTimeout(t);
  }, []);

  const go = (next: number) => {
    setWarm(true);
    setIndex((next + count) % count);
  };

  return (
    <div className="space-y-3">
      <div
        className="relative aspect-square overflow-hidden rounded-lg border border-line bg-tile"
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null || count < 2) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
          touchX.current = null;
        }}
      >
        {images.map((src, i) => {
          if (i > 0 && !warm && i !== index) return null;
          const active = i === index;
          return (
            <Image
              key={src}
              src={src}
              alt={active ? `${name}, image ${i + 1} of ${count}` : ""}
              aria-hidden={!active}
              fill
              {...blurProps(src)}
              {...(i === 0 ? { priority: true, onLoad: () => setWarm(true) } : { loading: "lazy" as const, fetchPriority: "low" as const })}
              sizes="(min-width: 1024px) 600px, 100vw"
              style={{ objectFit: "cover" }}
              className={`photo-dim transition-opacity duration-150 ${active ? "opacity-100" : "opacity-0"}`}
            />
          );
        })}

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-bg text-ink hover:border-ink"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-bg text-ink hover:border-ink"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <p className="absolute bottom-3 right-3 z-10 rounded-md bg-bg px-2.5 py-1 text-xs font-semibold text-ink ring-1 ring-line">
              {index + 1} of {count}
            </p>
          </>
        )}
      </div>

      {count > 1 && (
        <ul className="grid grid-cols-4 gap-3" aria-label="Product images">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === index}
                className={`relative block aspect-square w-full overflow-hidden rounded-md border bg-tile ${
                  i === index ? "border-ink ring-1 ring-ink" : "border-line hover:border-slate"
                }`}
              >
                <Image src={src} alt="" fill quality={60} sizes="(min-width: 1024px) 140px, 22vw" style={{ objectFit: "cover" }} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
