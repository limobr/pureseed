"use client";

import { Search } from "lucide-react";

/** Phone-only search field in the hero. Looks like an input; tapping opens the full-screen search. */
export function MobileSearchButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("pureseed:open-search"))}
      className="flex h-12 w-full items-center gap-2.5 rounded-md bg-white px-3.5 text-left text-sm text-[#4F6056] shadow-sm"
    >
      <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="truncate">Search products, e.g. sesame</span>
    </button>
  );
}
