import type { Faq as FaqItem } from "@/lib/data";

/** Native <details> accordion: keyboard accessible, no JavaScript, content stays in the HTML for search engines. */
export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
