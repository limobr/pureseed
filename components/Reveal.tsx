"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Slide-in on scroll. Variants:
 *  up      – rises into place (default)
 *  left    – slides in from the left
 *  right   – slides in from the right
 *  zoom    – scales up gently
 *  stagger – each direct child rises in one after another
 *  sides   – first child slides in from the left, second from the right (two-column splits)
 *
 * Content is fully visible in the server HTML and without JS; it is only hidden after
 * hydration, and only for blocks that start below the fold. Does nothing under
 * prefers-reduced-motion. Animates once.
 */
export type RevealAnim = "up" | "left" | "right" | "zoom" | "stagger" | "sides";

export default function Reveal({
  children, className = "", anim = "up", delay = 0, as: Tag = "div",
}: { children: React.ReactNode; className?: string; anim?: RevealAnim; delay?: number; as?: "div" | "ol" | "ul" | "section" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return; // already on screen
    Array.from(el.children).forEach((c, i) => (c as HTMLElement).style.setProperty("--i", String(i)));
    setState("hidden");
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setState("shown"); io.disconnect(); }
    }, { rootMargin: "0px 0px -10% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`reveal ${className}`.trim()}
      data-anim={anim}
      data-reveal={state}
      style={delay ? ({ "--d": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
