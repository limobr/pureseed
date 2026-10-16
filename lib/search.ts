/**
 * Typo-tolerant search that runs in the browser over a small index (products, services and key pages).
 * "sesme" finds sesame, "cashw" finds cashew. Pure functions, no framework imports.
 */

export type SearchDoc = {
  id: string;
  kind: "product" | "page";
  title: string;
  sub?: string;
  href: string;
  image?: string;
  /** Extra words people may type that are not in the title. */
  keywords?: string;
};

export type SearchItem = {
  key: string;
  kind: "correction" | "term" | "product" | "page" | "all";
  label: string;
  sub?: string;
  href: string;
  image?: string;
};

export type SearchModel = {
  items: SearchItem[];
  fuzzy: boolean;
  correction?: string;
  productCount: number;
  empty: boolean;
  idle: boolean;
};

export const SHOP_PATH = "/shop";
export const shopSearchHref = (q: string) => `${SHOP_PATH}?q=${encodeURIComponent(q)}`;

const GENERIC = new Set(["and", "the", "for", "with", "of", "a", "to", "in", "by", "on", "our"]);

export const PHRASES = [
  "Sesame seeds",
  "Sesame oil",
  "Cashew nuts",
  "Groundnuts",
  "Peanuts",
  "Organic honey",
  "Bulk supply",
  "Private label",
  "Export logistics",
  "Packaging",
  "Quality and traceability",
  "Processing",
  "Request a quote",
];

export const POPULAR = ["Sesame seeds", "Sesame oil", "Cashew nuts", "Organic honey", "Private label", "Bulk supply"];

// ---------------------------------------------------------------- text helpers

const norm = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim();

const stem = (t: string) => (t.length > 3 && t.endsWith("s") && !t.endsWith("ss") ? t.slice(0, -1) : t);
const words = (s: string) => norm(s).split(" ").filter(Boolean);
const tokens = (s: string) => words(s).map(stem);
const weight = (t: string) => (GENERIC.has(t) ? 0.3 : 1);

function distance(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const prev2: number[] = [];
  let prev: number[] = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, (prev2[j - 2] ?? Infinity) + 1);
      cur[j] = v;
      if (v < rowMin) rowMin = v;
    }
    if (rowMin > max) return max + 1;
    prev2.length = 0;
    prev2.push(...prev);
    prev = cur;
  }
  return prev[b.length];
}

function isSubsequence(q: string, t: string) {
  let i = 0;
  for (let j = 0; j < t.length && i < q.length; j++) if (t[j] === q[i]) i++;
  return i === q.length;
}

export function tokenScore(q: string, t: string): number {
  if (q === t) return 1;
  if (q.length < 2) return 0;
  if (t.startsWith(q)) return 0.92;
  if (q.length >= 3 && t.includes(q)) return 0.7;
  if (q.length < 4) return 0;
  const maxEdits = q.length <= 6 ? 1 : 2;
  const d = distance(q, t, maxEdits);
  if (d <= maxEdits) return 0.88 - 0.1 * d;
  if (t.length > q.length) {
    const dp = distance(q, t.slice(0, q.length), maxEdits);
    if (dp <= maxEdits) return 0.8 - 0.08 * dp;
  }
  if (q[0] === t[0] && isSubsequence(q, t) && q.length / t.length >= 0.6) return 0.62;
  return 0;
}

// ---------------------------------------------------------------- ranking

type Prepared = { title: string[]; extra: string[]; titleNorm: string };
const cache = new WeakMap<SearchDoc, Prepared>();

function prepare(doc: SearchDoc): Prepared {
  let p = cache.get(doc);
  if (!p) {
    p = { title: tokens(doc.title), extra: tokens(`${doc.sub ?? ""} ${doc.keywords ?? ""}`), titleNorm: norm(doc.title) };
    cache.set(doc, p);
  }
  return p;
}

function scoreAgainst(qt: string[], title: string[], extra: string[]): number {
  let total = 0;
  let weights = 0;
  for (const q of qt) {
    const w = weight(q);
    weights += w;
    let best = 0;
    for (const t of title) best = Math.max(best, tokenScore(q, t));
    if (best < 1) for (const t of extra) best = Math.max(best, tokenScore(q, t) * 0.85);
    total += w * best;
  }
  return weights ? total / weights : 0;
}

export const MIN_SCORE = 0.5;
const STRONG = 0.85;

export function rankDocs<T extends SearchDoc>(docs: T[], query: string, min = MIN_SCORE): { doc: T; score: number }[] {
  const qt = tokens(query);
  if (!qt.length) return [];
  const qn = norm(query);
  const out: { doc: T; score: number }[] = [];
  for (const doc of docs) {
    const p = prepare(doc);
    let score = scoreAgainst(qt, p.title, p.extra);
    if (score > 0 && p.titleNorm.startsWith(qn)) score = Math.min(1, score + 0.05);
    if (score >= min) out.push({ doc, score });
  }
  return out.sort((a, b) => b.score - a.score);
}

export function buildVocab(docs: SearchDoc[]): Set<string> {
  const vocab = new Set<string>();
  const add = (s: string) => {
    for (const t of tokens(s)) if (t.length >= 3 && !/^\d+$/.test(t)) vocab.add(t);
  };
  for (const d of docs) add(`${d.title} ${d.sub ?? ""} ${d.keywords ?? ""}`);
  for (const p of PHRASES) add(p);
  return vocab;
}

export function correctQuery(query: string, vocab: Set<string>): string | undefined {
  const split = words(query);
  if (!split.length) return undefined;
  let changed = false;
  const raw: string[] = [];
  for (let i = 0; i < split.length; i++) {
    const joined = i + 1 < split.length ? split[i] + split[i + 1] : "";
    if (joined && !vocab.has(stem(split[i])) && vocab.has(stem(joined))) {
      raw.push(joined);
      changed = true;
      i++;
    } else raw.push(split[i]);
  }
  const fixed = raw.map((w) => {
    const s = stem(w);
    if (vocab.has(s) || w.length < 4) return w;
    for (const v of vocab) if (v.startsWith(s)) return w;
    let best = "";
    let bestScore = 0;
    for (const v of vocab) {
      const sc = tokenScore(s, v);
      if (sc > bestScore || (sc === bestScore && sc > 0 && v.length < best.length)) {
        best = v;
        bestScore = sc;
      }
    }
    if (bestScore >= 0.6) {
      changed = true;
      return best;
    }
    return w;
  });
  return changed ? fixed.join(" ") : undefined;
}

export function suggestPhrases(query: string, limit = 3): string[] {
  const qt = tokens(query);
  if (!qt.length) return [];
  const qn = norm(query);
  return PHRASES.map((phrase) => ({ phrase, score: scoreAgainst(qt, tokens(phrase), []) }))
    .filter((r) => r.score >= 0.6 && norm(r.phrase) !== qn)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.phrase);
}

export function buildModel(docs: SearchDoc[], vocab: Set<string>, query: string): SearchModel {
  const q = query.trim();

  if (!q) {
    const items: SearchItem[] = [
      ...POPULAR.map<SearchItem>((p) => ({ key: `t:${p}`, kind: "term", label: p, href: shopSearchHref(p) })),
      ...docs
        .filter((d) => d.kind === "page" && d.sub)
        .slice(0, 6)
        .map<SearchItem>((d) => ({ key: `p:${d.id}`, kind: "page", label: d.title, sub: d.sub, href: d.href })),
    ];
    return { items, fuzzy: false, productCount: 0, empty: false, idle: true };
  }

  const ranked = rankDocs(docs, q);
  const products = ranked.filter((r) => r.doc.kind === "product");
  const pages = ranked.filter((r) => r.doc.kind === "page");
  const fuzzy = ranked.length > 0 && ranked[0].score < STRONG;
  const correction = correctQuery(q, vocab);

  const items: SearchItem[] = [];
  if (correction && norm(correction) !== norm(q)) items.push({ key: "fix", kind: "correction", label: correction, href: shopSearchHref(correction) });
  for (const phrase of suggestPhrases(correction ?? q)) items.push({ key: `t:${phrase}`, kind: "term", label: phrase, href: shopSearchHref(phrase) });
  for (const { doc } of products.slice(0, 5)) items.push({ key: `p:${doc.id}`, kind: "product", label: doc.title, sub: doc.sub, href: doc.href, image: doc.image });
  for (const { doc } of pages.slice(0, 3)) items.push({ key: `g:${doc.id}`, kind: "page", label: doc.title, sub: doc.sub, href: doc.href });
  if (products.length) items.push({ key: "all", kind: "all", label: q, href: shopSearchHref(correction ?? q) });

  return {
    items,
    fuzzy,
    correction: correction && norm(correction) !== norm(q) ? correction : undefined,
    productCount: products.length,
    empty: products.length === 0 && pages.length === 0,
    idle: false,
  };
}
