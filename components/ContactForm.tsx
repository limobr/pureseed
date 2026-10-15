"use client";
import { useState } from "react";
import { products, site } from "@/lib/data";

export default function ContactForm({ defaultProduct = "" }: { defaultProduct?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setState(res.ok ? "ok" : "error");
    } catch { setState("error"); }
  }

  if (state === "ok") return <p className="note" role="status">Thank you. We have your message and will reply by email.</p>;

  return (
    <form onSubmit={onSubmit} className="form">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <label><span>Name<span className="req" aria-hidden="true">*</span></span><input name="name" required autoComplete="name" /></label>
      <label><span>Email<span className="req" aria-hidden="true">*</span></span><input name="email" type="email" required autoComplete="email" inputMode="email" /></label>
      <label><span>Company</span><input name="company" autoComplete="organization" /></label>
      <label><span>Country</span><input name="country" autoComplete="country-name" /></label>
      <label><span>Product interested in</span>
        <select name="product" defaultValue={defaultProduct}>
          <option value="">Select a product</option>
          {products.map((p) => <option key={p.slug} value={p.name}>{p.name}</option>)}
          <option value="Other">Other</option>
        </select>
      </label>
      <label><span>Quantity and destination</span><input name="volume" placeholder="e.g. 1 x 20ft container, Rotterdam" /></label>
      <label className="full"><span>Message<span className="req" aria-hidden="true">*</span></span><textarea name="message" rows={5} required /></label>
      <p className="hint">Fields marked * are required.</p>
      <button className="btn" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send message"}</button>
      {state === "error" && <p className="err" role="alert">Something went wrong. Please email {site.email} directly.</p>}
    </form>
  );
}
