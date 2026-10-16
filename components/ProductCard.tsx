import Image from "next/image";
import { IntentLink } from "./IntentLink";
import { FormatIcon } from "./FormatIcon";
import { blurProps } from "@/lib/images";
import { formats, type Product } from "@/lib/data";

/** Card images are lazy by default. Only above-the-fold images are marked as priority. */
export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const labels = formats.filter((f) => product.formats.includes(f.id));
  const retail = product.formats.includes("retail");

  return (
    <IntentLink
      href={`/product/${product.slug}`}
      className="group flex h-full flex-col rounded-lg border border-line bg-bg transition-colors hover:border-ink"
    >
      <div className="relative aspect-[5/4] overflow-hidden rounded-t-lg border-b border-line bg-tile sm:aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          quality={70}
          sizes="(min-width: 1280px) 240px, (min-width: 768px) 30vw, 46vw"
          style={{ objectFit: "cover" }}
          className="photo-dim"
          {...blurProps(product.image)}
        />
        {retail && (
          <span className="absolute left-2 top-2 rounded bg-hero px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-mint">
            Private label
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3 sm:gap-2 sm:p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-ink sm:text-base">{product.name}</h3>
        <p className="hidden line-clamp-2 text-sm leading-5 text-slate sm:block">{product.headline}</p>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-x-2 gap-y-1.5 pt-1 sm:gap-3 sm:pt-3">
          <p className="whitespace-nowrap text-sm font-bold text-ink sm:text-base">Request a quote</p>
          <ul className="flex items-center gap-1.5 text-slate" aria-label="Supplied as">
            {labels.map((f) => (
              <li key={f.id} title={f.label}>
                <FormatIcon id={f.id} />
                <span className="sr-only">{f.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </IntentLink>
  );
}
