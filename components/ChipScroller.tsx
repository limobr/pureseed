/**
 * A single row of chips that scrolls sideways on phones, so a long list of options
 * takes one line instead of pushing the products off the screen. The last chip is
 * cut off at the edge to show there is more. From the sm breakpoint it wraps.
 */
export function ChipScroller({
  children,
  label,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  label: string;
  as?: "div" | "nav";
}) {
  return (
    <Tag aria-label={label} className="no-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0">
      <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">{children}</div>
    </Tag>
  );
}

export const chipClass = (active = false) =>
  `inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-md border px-4 text-sm font-semibold transition-colors ${
    active ? "border-inverse bg-inverse text-inverse-fg" : "border-line bg-bg text-charcoal hover:border-ink"
  }`;
