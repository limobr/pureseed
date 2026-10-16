import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { ArrowRight, MessageCircle, Search } from "lucide-react";
import { blurProps } from "@/lib/images";
import type { SearchItem, SearchModel } from "@/lib/search";
import { whatsappLink } from "@/lib/site";

type Props = {
  model: SearchModel;
  query: string;
  active: number;
  listId: string;
  onPick: (item: SearchItem) => void;
  onHover: (index: number) => void;
};

function heading(kind: SearchItem["kind"], model: SearchModel) {
  switch (kind) {
    case "term":
      return model.idle ? "Popular searches" : "Suggested searches";
    case "product":
      return model.fuzzy ? "Products (close matches)" : "Products";
    case "page":
      return model.idle ? "Browse" : "Pages";
    default:
      return null;
  }
}

/** The suggestion list: corrections, suggested searches, products and pages, with keyboard highlight. */
export function SearchResults({ model, query, active, listId, onPick, onHover }: Props) {
  if (model.empty) {
    return (
      <div className="px-4 py-8 text-center">
        <p className="text-base font-semibold text-ink">No close matches for “{query.trim()}”</p>
        <p className="mx-auto mt-1 max-w-xs text-sm text-slate">Try a shorter word, or tell us what you need and we will find it.</p>
        <a
          href={whatsappLink(`Hello, I am looking for: ${query.trim()}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-4"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Ask on WhatsApp
        </a>
      </div>
    );
  }

  let prev: SearchItem["kind"] | undefined;
  return (
    <div role="listbox" id={listId} aria-label="Search suggestions" className="py-2" onMouseDown={(e) => e.preventDefault()}>
      {model.items.map((it, i) => {
        const head = heading(it.kind, model);
        const showHead = head && prev !== it.kind;
        prev = it.kind;
        const on = i === active;
        return (
          <Fragment key={it.key}>
            {showHead && (
              <p role="presentation" className="px-4 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-slate first:pt-1">
                {head}
              </p>
            )}
            <Link
              href={it.href}
              prefetch={false}
              role="option"
              id={`${listId}-${i}`}
              aria-selected={on}
              onClick={() => onPick(it)}
              onMouseMove={() => onHover(i)}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm text-ink transition-colors ${on ? "bg-mist" : ""}`}
            >
              {it.kind === "correction" && (
                <>
                  <Search className="h-4 w-4 shrink-0 text-accent-text" aria-hidden="true" />
                  <span>
                    Did you mean <strong className="font-semibold">{it.label}</strong>?
                  </span>
                </>
              )}
              {it.kind === "term" && (
                <>
                  <Search className="h-4 w-4 shrink-0 text-slate" aria-hidden="true" />
                  <span>{it.label}</span>
                </>
              )}
              {it.kind === "product" && (
                <>
                  <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-line bg-tile">
                    {it.image && (
                      <Image src={it.image} alt="" fill quality={50} sizes="40px" style={{ objectFit: "cover" }} {...blurProps(it.image)} />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold">{it.label}</span>
                    <span className="block truncate text-xs text-slate">{it.sub || "Product"}</span>
                  </span>
                </>
              )}
              {it.kind === "page" && (
                <>
                  <ArrowRight className="h-4 w-4 shrink-0 text-slate" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold">{it.label}</span>
                    {it.sub && <span className="block truncate text-xs text-slate">{it.sub}</span>}
                  </span>
                </>
              )}
              {it.kind === "all" && (
                <>
                  <span className="flex-1 font-semibold">See all results for “{it.label}”</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </>
              )}
            </Link>
          </Fragment>
        );
      })}
    </div>
  );
}
