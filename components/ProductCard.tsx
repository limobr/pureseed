import Link from "next/link";
import Media from "./Media";
import type { Product } from "@/lib/data";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/product/${p.slug}`} className="pcard">
      <Media src={p.image} alt={p.name} ratio="1/1" fit="contain" zoom sizes="(max-width:640px) 45vw, (max-width:1000px) 30vw, 200px" />
      <span>{p.name}</span>
      <small>{p.headline}</small>
      <em>View details</em>
    </Link>
  );
}
