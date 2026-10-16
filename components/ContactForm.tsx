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
    } catch {
      setState("error");
    }
  }

  if (state === "ok") {
    return (
      <p role="status" className="rounded-lg border border-line bg-mist p-6 text-base font-semibold text-ink">
        Thank you. We have your message and will reply by email.
      </p>
    );
  }

  const label = "block text-sm font-semibold text-ink";
  const req = <span className="ml-0.5 text-accent-text" aria-hidden="true">*</span>;

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-lg border border-line bg-bg p-5 sm:grid-cols-2 sm:p-6">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label className="block"><span className={label}>Name{req}</span><input name="name" required autoComplete="name" className="field mt-1.5" /></label>
      <label className="block"><span className={label}>Email{req}</span><input name="email" type="email" required autoComplete="email" inputMode="email" className="field mt-1.5" /></label>
      <label className="block"><span className={label}>Company</span><input name="company" autoComplete="organization" className="field mt-1.5" /></label>
      <label className="block"><span className={label}>Country</span><input name="country" autoComplete="country-name" className="field mt-1.5" /></label>
      <label className="block"><span className={label}>Product interested in</span>
        <select name="product" defaultValue={defaultProduct} className="field mt-1.5">
          <option value="">Select a product</option>
          {products.map((p) => <option key={p.slug} value={p.name}>{p.name}</option>)}
          <option value="Other">Other</option>
        </select>
      </label>
      <label className="block"><span className={label}>Quantity and destination</span><input name="volume" placeholder="e.g. 1 x 20ft container, Rotterdam" className="field mt-1.5" /></label>
      <label className="block sm:col-span-2"><span className={label}>Message{req}</span><textarea name="message" rows={5} required className="field mt-1.5 py-2.5" /></label>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <button className="btn-primary" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send message"}</button>
        <p className="text-sm text-slate">Fields marked * are required.</p>
      </div>
      {state === "error" && (
        <p role="alert" className="text-sm font-semibold text-[#B42318] sm:col-span-2">
          Something went wrong. Please email {site.email} directly.
        </p>
      )}
    </form>
  );
}
