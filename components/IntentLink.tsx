"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof Link>, "href" | "prefetch"> & { href: string };

/**
 * A link that does not prefetch every card in the viewport (that would compete with
 * image downloads). It prefetches the page only when the user shows intent: hover,
 * keyboard focus or the start of a touch.
 */
export function IntentLink({ href, children, ...rest }: Props) {
  const router = useRouter();
  const warm = () => router.prefetch(href);

  return (
    <Link
      href={href}
      prefetch={false}
      onMouseEnter={warm}
      onFocus={warm}
      onTouchStart={warm}
      {...rest}
    >
      {children}
    </Link>
  );
}
