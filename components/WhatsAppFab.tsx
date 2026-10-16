"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { products } from "@/lib/data";

/** Opening message depends on the page, so the first message already says what the visitor is looking at. */
function messageFor(pathname: string) {
  const m = pathname.match(/^\/product\/([^/]+)/);
  const product = m && products.find((p) => p.slug === m[1]);
  if (product) return `Hello, I would like a quote for ${product.name}. Quantity and destination: `;
  if (pathname.startsWith("/service/private-label")) return "Hello, I would like to start a private label project.";
  return "Hello, I would like to enquire about your products.";
}

/**
 * A message is one tap away on every page. Phones get a bottom bar (Call + WhatsApp) that slides away
 * while scrolling down so it never covers content; from sm up it is a round button with a label.
 */
export function WhatsAppFab({ number, phoneHref }: { number: string; phoneHref: string }) {
  const pathname = usePathname() ?? "/";
  const href = `https://wa.me/${number}?text=${encodeURIComponent(messageFor(pathname))}`;
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    last.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - last.current;
      if (Math.abs(dy) < 8) return;
      setHidden(dy > 0 && y > 200);
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="print:hidden">
      <div
        className={`fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-3 border-t border-line bg-bg px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] transition-transform duration-200 motion-reduce:transition-none sm:hidden ${
          hidden ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <a href={phoneHref} className="btn-outline">
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call
        </a>
        <a href={href} target="_blank" rel="noopener noreferrer" className="btn-accent">
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp
        </a>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-30 hidden h-14 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-white shadow-lg ring-1 ring-black/10 transition-colors hover:bg-accent/90 sm:inline-flex"
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
        Chat with us
      </a>
    </div>
  );
}
