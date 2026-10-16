import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/data";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-line rounded-lg border border-line">
      {faqs.map((f) => (
        <details key={f.q} className="group px-5 py-4">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink">
            {f.q}
            <ChevronDown
              className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="mt-2 max-w-prose text-base leading-7 text-charcoal">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
