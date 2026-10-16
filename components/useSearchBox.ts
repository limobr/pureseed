"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { SHOP_PATH, buildModel, buildVocab, shopSearchHref, type SearchDoc, type SearchItem } from "@/lib/search";

/** State and keyboard handling shared by the header search and the hero search. */
export function useSearchBox(docs: SearchDoc[], onDone?: () => void) {
  const router = useRouter();
  const vocab = useMemo(() => buildVocab(docs), [docs]);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(-1);
  const model = useMemo(() => buildModel(docs, vocab, query), [docs, vocab, query]);
  const done = useRef(onDone);
  done.current = onDone;

  useEffect(() => setActive(-1), [query]);

  const go = (href: string) => {
    done.current?.();
    router.push(href);
  };
  const pick = (item: SearchItem) => go(item.href);

  const submit = () => {
    const item = model.items[active];
    if (item) return pick(item);
    const q = query.trim();
    go(q ? shopSearchHref(q) : SHOP_PATH);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const n = model.items.length;
    if (!n) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % n);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a <= 0 ? n - 1 : a - 1));
    }
  };

  return { query, setQuery, model, active, setActive, submit, pick, onKeyDown };
}
