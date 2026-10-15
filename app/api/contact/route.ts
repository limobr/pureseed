import { NextResponse } from "next/server";

const esc = (s: unknown) => String(s ?? "").replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]!));

export async function POST(req: Request) {
  const d = await req.json().catch(() => null);
  if (!d || d.website) return NextResponse.json({ ok: true }); // honeypot
  if (!d.name || !/^\S+@\S+\.\S+$/.test(d.email ?? "") || !d.message) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ error: "not_configured" }, { status: 500 });

  const html = ["name", "email", "company", "country", "product", "volume", "message"].map((k) => `<p><b>${k}:</b> ${esc(d[k])}</p>`).join("");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "PureSeed Website <noreply@agrixco.com>",
      to: [process.env.CONTACT_TO ?? "sales@pureseed.com"], reply_to: d.email,
      subject: `Website enquiry: ${esc(d.product) || "General"} (${esc(d.name)})`, html,
    }),
  });
  return res.ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "send_failed" }, { status: 502 });
}
