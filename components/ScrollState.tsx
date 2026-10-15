"use client";
import { useEffect } from "react";

/** Sets data-scrolled on <html> once the page is scrolled, so the header can compact and gain a shadow. */
export default function ScrollState() {
  useEffect(() => {
    const root = document.documentElement;
    let ticking = false;
    const update = () => { ticking = false; if (window.scrollY > 24) root.setAttribute("data-scrolled", ""); else root.removeAttribute("data-scrolled"); };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}
