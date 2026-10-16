"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Search } from "lucide-react";
import { SearchResults } from "./SearchResults";
import { useSearchBox } from "./useSearchBox";
import { shopSearchHref, type SearchDoc } from "@/lib/search";

const suggestions = ["Sesame", "Cashew", "Honey", "Private label"];

/**
 * Search box for visitors who already know what they want. It suggests products and
 * corrects typos as they type, and hands the query to the shop page (?q=) on Enter.
 */
export function HeroSearch({ docs }: { docs: SearchDoc[] }) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const box = useSearchBox(docs, () => setOpen(false));

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div ref={wrap} className="relative">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          box.submit();
        }}
        className="flex gap-2"
      >
        <label className="relative block min-w-0 flex-1">
          <span className="sr-only">Search products</span>
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4F6056]"
            aria-hidden="true"
          />
          <input
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-activedescendant={box.active >= 0 ? `${listId}-${box.active}` : undefined}
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
            value={box.query}
            onChange={(e) => {
              box.setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
              else {
                setOpen(true);
                box.onKeyDown(e);
              }
            }}
            placeholder="Search products, e.g. sesame"
            className="h-12 w-full rounded-md border border-transparent bg-white pl-10 pr-3 text-sm text-[#122119] placeholder:text-[#4F6056] focus:border-white"
          />
        </label>
        <button type="submit" className="btn-accent h-12 px-5">
          Search
        </button>
      </form>

      {open && (
        <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-lg border border-line bg-bg text-ink shadow-xl">
          <div className="max-h-[22rem] overflow-y-auto">
            <SearchResults
              model={box.model}
              query={box.query}
              active={box.active}
              listId={listId}
              onPick={box.pick}
              onHover={box.setActive}
            />
          </div>
        </div>
      )}

      <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/70">
        <span>Popular:</span>
        {suggestions.map((s) => (
          <Link
            key={s}
            href={shopSearchHref(s)}
            className="font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
          >
            {s}
          </Link>
        ))}
      </p>
    </div>
  );
}
