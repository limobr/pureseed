import Link from "next/link";
import { products } from "@/lib/data";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-page px-4 py-24 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-3 max-w-md text-slate">This page does not exist or has moved. Try the products, or choose one below.</p>
      <Link href="/shop" className="btn-primary mt-8">View all products</Link>
      <ul className="mt-10 flex flex-wrap gap-2">
        {products.map((p) => (
          <li key={p.slug}>
            <Link href={`/product/${p.slug}`} className="inline-flex min-h-11 items-center rounded-md border border-line px-4 text-sm font-medium text-charcoal hover:border-ink">{p.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
