import { Package, Tag } from "lucide-react";
import type { FormatId } from "@/lib/data";

export function FormatIcon({ id, className = "h-4 w-4" }: { id: FormatId; className?: string }) {
  const Icon = id === "bulk" ? Package : Tag;
  return <Icon className={className} aria-hidden="true" strokeWidth={1.75} />;
}
