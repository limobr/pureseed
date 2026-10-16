"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { SearchResults } from "./SearchResults";
import { useSearchBox } from "./useSearchBox";
import type { SearchDoc } from "@/lib/search";

const PLACEHOLDER = "Search sesame, cashew, honey…";

/**
 * Search in the header. On large screens it is an icon that grows into a field (covering the menu
 * while open) and shrinks back when closed. On phones it opens a full-screen search.
 * Press / or Ctrl+K anywhere to open it.
 */
export function HeaderSearch({
  docs,
  onOpenChange,
}: {
  docs: SearchDoc[];
  onOpenChange?: (open: boolean) => void;
}) {
  const uid = useId();
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(480);
  const wrap = useRef<HTMLDivElement>(null);
  const slot = useRef<HTMLDivElement>(null);
  const deskInput = useRef<HTMLInputElement>(null);
  const mobInput = useRef<HTMLInputElement>(null);
  const closeRef = useRef<() => void>(() => {});

  const box = useSearchBox(docs, () => closeRef.current());

  const close = useCallback(() => {
    setOpen(false);
    box.setQuery("");
    onOpenChange?.(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onOpenChange]);
  closeRef.current = close;

  const openSearch = useCallback(() => {
    // Grow leftwards from the icon, up to the logo, never wider than 35rem
    const right = slot.current?.getBoundingClientRect().right ?? 0;
    const logo = slot.current?.closest("header")?.querySelector("[data-logo]")?.getBoundingClientRect().right ?? 0;
    const room = right - logo - 24;
    setWidth(Math.max(280, Math.min(560, room || 480)));
    setOpen(true);
    onOpenChange?.(true);
  }, [onOpenChange]);

  // Focus whichever input is visible when the search opens
  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    (desktop ? deskInput : mobInput).current?.focus();
  }, [open]);

  // Other parts of the page (the phone hero) can open the search with a custom event
  useEffect(() => {
    const onOpen = () => openSearch();
    window.addEventListener("pureseed:open-search", onOpen);
    return () => window.removeEventListener("pureseed:open-search", onOpen);
  }, [openSearch]);

  // Keep the page still behind the full-screen phone search
  useEffect(() => {
    if (!open || window.matchMedia("(min-width: 1024px)").matches) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Shortcuts: "/" or Ctrl/Cmd+K opens, Escape closes, clicking elsewhere closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing = !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
      if (e.key === "Escape" && open) return close();
      if (!open && ((e.key === "/" && !typing) || (e.key.toLowerCase() === "k" && (e.ctrlKey || e.metaKey)))) {
        e.preventDefault();
        openSearch();
      }
    };
    const onDown = (e: MouseEvent) => {
      if (open && wrap.current && !wrap.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open, close, openSearch]);

  const deskList = `${uid}-d`;
  const mobList = `${uid}-m`;
  const activeId = (list: string) => (box.active >= 0 ? `${list}-${box.active}` : undefined);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    box.submit();
  };

  const results = (list: string) => (
    <SearchResults
      model={box.model}
      query={box.query}
      active={box.active}
      listId={list}
      onPick={box.pick}
      onHover={box.setActive}
    />
  );

  return (
    <div ref={wrap} className="contents">
      {/* Large screens: icon that expands */}
      <div ref={slot} className="relative hidden h-10 w-10 lg:block">
        <form
          role="search"
          onSubmit={onSubmit}
          style={{ width: open ? width : 40 }}
          className={`absolute right-0 top-0 z-10 flex h-10 items-center overflow-hidden rounded-md border transition-[width,background-color,border-color] duration-200 ease-out motion-reduce:transition-none ${
            open ? "border-line bg-bg shadow-sm focus-within:border-ink" : "border-transparent hover:bg-mist"
          }`}
        >
          <button
            type="button"
            onClick={open ? undefined : openSearch}
            aria-label="Search products"
            aria-expanded={open}
            tabIndex={open ? -1 : 0}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-ink"
          >
            <Search className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
          <input
            ref={deskInput}
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-controls={deskList}
            aria-activedescendant={activeId(deskList)}
            aria-autocomplete="list"
            aria-label="Search products"
            autoComplete="off"
            spellCheck={false}
            tabIndex={open ? 0 : -1}
            value={box.query}
            onChange={(e) => box.setQuery(e.target.value)}
            onKeyDown={box.onKeyDown}
            placeholder={PLACEHOLDER}
            className="min-w-0 flex-1 bg-transparent pr-2 text-sm text-ink placeholder:text-slate focus-visible:outline-none"
          />
          {open && (
            <button
              type="button"
              onClick={close}
              aria-label="Close search"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-slate hover:text-ink"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </form>

        {open && (
          <div
            style={{ width }}
            className="absolute right-0 top-full z-20 mt-2 overflow-hidden rounded-lg border border-line bg-bg shadow-xl"
          >
            <div className="max-h-[70vh] overflow-y-auto">{results(deskList)}</div>
            <p className="hidden border-t border-line px-4 py-2 text-xs text-slate xl:block">
              Press <kbd className="rounded border border-line px-1">↑</kbd>{" "}
              <kbd className="rounded border border-line px-1">↓</kbd> to move,{" "}
              <kbd className="rounded border border-line px-1">Enter</kbd> to open,{" "}
              <kbd className="rounded border border-line px-1">Esc</kbd> to close
            </p>
          </div>
        )}
      </div>

      {/* Phones and tablets: search icon, then a full-screen search */}
      <button
        type="button"
        onClick={openSearch}
        aria-label="Search products"
        className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line text-ink lg:hidden"
      >
        <Search className="h-5 w-5" aria-hidden="true" />
      </button>

      {open && (
        <div role="dialog" aria-label="Search" className="fixed inset-0 z-50 flex flex-col bg-bg lg:hidden">
          <form role="search" onSubmit={onSubmit} className="flex h-16 shrink-0 items-center gap-2 border-b border-line px-4">
            <label className="relative block min-w-0 flex-1">
              <span className="sr-only">Search products</span>
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate"
                aria-hidden="true"
              />
              <input
                ref={mobInput}
                type="text"
                role="combobox"
                aria-expanded
                aria-controls={mobList}
                aria-activedescendant={activeId(mobList)}
                aria-autocomplete="list"
                autoComplete="off"
                spellCheck={false}
                enterKeyHint="search"
                value={box.query}
                onChange={(e) => box.setQuery(e.target.value)}
                onKeyDown={box.onKeyDown}
                placeholder={PLACEHOLDER}
                className="h-11 w-full rounded-md border border-line bg-bg pl-9 pr-3 text-base text-ink placeholder:text-slate focus:border-ink"
              />
            </label>
            <button type="button" onClick={close} className="inline-flex h-11 items-center px-2 text-sm font-semibold text-ink">
              Cancel
            </button>
          </form>
          <div className="min-h-0 flex-1 overflow-y-auto">{results(mobList)}</div>
        </div>
      )}
    </div>
  );
}
