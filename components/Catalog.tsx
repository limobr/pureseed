"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { FormatIcon } from "./FormatIcon";
import { ChipScroller, chipClass } from "./ChipScroller";
import { categories, formats, type CategoryId, type FormatId, type Product } from "@/lib/data";
import { buildVocab, correctQuery, rankDocs } from "@/lib/search";
import { productToDoc } from "@/lib/searchIndex";

type Sort = "featured" | "name";

const validCategory = (v: string | null): v is CategoryId => !!v && categories.some((c) => c.id === v);
const validFormat = (v: string): v is FormatId => formats.some((f) => f.id === v);

/** Reads ?category=, ?format= and ?q= from the URL. Renders nothing, so the catalogue stays in the static HTML. */
function UrlSync({ onChange }: { onChange: (c: CategoryId | "all", f: FormatId[], q: string) => void }) {
  const params = useSearchParams();
  useEffect(() => {
    const c = params.get("category");
    const f = (params.get("format") ?? "").split(",").filter(validFormat);
    onChange(validCategory(c) ? c : "all", f, (params.get("q") ?? "").slice(0, 80));
  }, [params, onChange]);
  return null;
}

const sortOptions = (
  <>
    <option value="featured">Featured</option>
    <option value="name">Name: A to Z</option>
  </>
);

export function Catalog({ products, headingLevel = "h2" }: { products: Product[]; headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;

  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [selected, setSelected] = useState<FormatId[]>([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("featured");
  const [panelOpen, setPanelOpen] = useState(false);

  const applyUrl = useCallback((c: CategoryId | "all", f: FormatId[], q: string) => {
    setCategory(c);
    setSelected(f);
    setQuery(q);
  }, []);

  const docs = useMemo(() => products.map(productToDoc), [products]);
  const vocab = useMemo(() => buildVocab(docs), [docs]);
  const ranked = useMemo(() => (query.trim() ? rankDocs(docs, query) : null), [docs, query]);
  const scores = useMemo(() => (ranked ? new Map(ranked.map((r) => [r.doc.id, r.score])) : null), [ranked]);
  const closeMatches = !!ranked && ranked.length > 0 && ranked[0].score < 0.85;
  const correction = ranked ? correctQuery(query, vocab) : undefined;

  const visible = useMemo(() => {
    const list = products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (selected.some((f) => !p.formats.includes(f))) return false;
      if (scores && !scores.has(p.slug)) return false;
      return true;
    });
    const sorted = [...list];
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (scores) sorted.sort((a, b) => (scores.get(b.slug) ?? 0) - (scores.get(a.slug) ?? 0));
    return sorted;
  }, [products, category, selected, scores, sort]);

  const toggleFormat = (id: FormatId) => setSelected((cur) => (cur.includes(id) ? cur.filter((m) => m !== id) : [...cur, id]));

  const filtersActive = category !== "all" || selected.length > 0 || query !== "" || sort !== "featured";
  const reset = () => {
    setCategory("all");
    setSelected([]);
    setQuery("");
    setSort("featured");
  };

  const selectClass = "min-h-11 w-full rounded-md border border-line bg-bg px-3 text-sm text-ink focus:border-ink";

  return (
    <section id="catalog" aria-labelledby="catalog-title" className="scroll-mt-16 bg-bg">
      <Suspense fallback={null}>
        <UrlSync onChange={applyUrl} />
      </Suspense>

      <div className="mx-auto max-w-page px-4 pb-12 pt-2 sm:px-6 lg:px-8 lg:pb-20 lg:pt-6">
        <div className="mb-3 flex items-baseline justify-between gap-4 sm:mb-5">
          <Heading id="catalog-title" className="text-2xl font-bold tracking-tight sm:text-4xl">
            Our products
          </Heading>
          <p className="hidden text-sm text-slate sm:block">Browse by type, or filter by how you want it supplied.</p>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            <label className="relative block min-w-0 flex-1 lg:max-w-sm">
              <span className="sr-only">Search products</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
                className="min-h-11 w-full rounded-md border border-line bg-bg pl-9 pr-3 text-sm text-ink placeholder:text-slate focus:border-ink"
              />
            </label>

            <button
              type="button"
              onClick={() => setPanelOpen((v) => !v)}
              aria-expanded={panelOpen}
              aria-controls="filter-panel"
              className={`${chipClass(panelOpen)} lg:hidden`}
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              Filters
              {selected.length > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-white">
                  {selected.length}
                </span>
              )}
            </button>

            <label className="ml-auto hidden w-56 lg:block">
              <span className="sr-only">Sort products</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className={selectClass}>
                {sortOptions}
              </select>
            </label>
          </div>

          <ChipScroller label="Browse by type">
            <button type="button" className={chipClass(category === "all")} onClick={() => setCategory("all")} aria-pressed={category === "all"}>
              All
            </button>
            {categories.map((c) => (
              <button key={c.id} type="button" className={chipClass(category === c.id)} onClick={() => setCategory(c.id)} aria-pressed={category === c.id}>
                {c.short}
              </button>
            ))}
          </ChipScroller>

          <div
            id="filter-panel"
            className={`${panelOpen ? "block" : "hidden"} space-y-4 rounded-lg border border-line bg-mist p-4 lg:block lg:space-y-0 lg:border-0 lg:bg-transparent lg:p-0`}
          >
            <div role="group" aria-label="Supplied as" className="flex flex-wrap items-center gap-2">
              <span className="mr-1 w-full text-sm font-semibold text-ink lg:w-auto">Supplied as</span>
              {formats.map((f) => {
                const active = selected.includes(f.id);
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => toggleFormat(f.id)}
                    aria-pressed={active}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-md border px-3.5 text-sm font-medium transition-colors ${
                      active ? "border-accent bg-accent text-white" : "border-line bg-bg text-charcoal hover:border-ink"
                    }`}
                  >
                    <FormatIcon id={f.id} />
                    {f.label}
                  </button>
                );
              })}
            </div>

            <label className="block lg:hidden">
              <span className="mb-1.5 block text-sm font-semibold text-ink">Sort by</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className={selectClass}>
                {sortOptions}
              </select>
            </label>

            <button type="button" onClick={() => setPanelOpen(false)} className="btn-primary w-full lg:hidden">
              Show results
            </button>
          </div>
        </div>

        <div className="mb-3 mt-3 flex min-h-11 items-center justify-between gap-4 sm:mb-5">
          <div aria-live="polite">
            {visible.length !== products.length && <p className="text-sm text-slate">Filtered results</p>}
            {ranked && (closeMatches || correction) && (
              <p className="mt-0.5 text-sm text-charcoal">
                Showing close matches for <strong className="font-semibold">“{query.trim()}”</strong>.
                {correction && (
                  <>
                    {" "}Did you mean{" "}
                    <button type="button" onClick={() => setQuery(correction)} className="font-semibold text-ink underline underline-offset-4">
                      {correction}
                    </button>
                    ?
                  </>
                )}
              </p>
            )}
          </div>
          {filtersActive && (
            <button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink underline underline-offset-4">
              <X className="h-4 w-4" aria-hidden="true" />
              Clear filters
            </button>
          )}
        </div>

        {visible.length > 0 ? (
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
            {visible.map((p) => (
              <li key={p.slug} className="cv-auto">
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-lg border border-line bg-mist px-6 py-14 text-center">
            <p className="text-lg font-semibold">No products match these filters</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate">Remove a filter or choose a different type to see more results.</p>
            <button type="button" onClick={reset} className="btn-primary mt-6">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
