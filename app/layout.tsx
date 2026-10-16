import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { JsonLd } from "@/components/JsonLd";
import { logo, ogImage, products, site } from "@/lib/data";
import { buildSearchDocs } from "@/lib/searchIndex";
import { themeInitScript } from "@/lib/theme";

// Self-hosted, latin subset only. next/font preloads it and sizes the fallback to avoid layout shift.
const sans = localFont({
  src: "./fonts/schibsted-grotesk-latin-wght-normal.woff2",
  variable: "--font-sans",
  weight: "400 900",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Roboto", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "PureSeed | Sesame, Cashew, Groundnuts & Honey Processor and Exporter", template: "%s | PureSeed" },
  description:
    "PureSeed sources, processes and exports sesame seeds, sesame oil, cashew nuts, groundnuts and organic honey from Tanzania and Africa. Bulk supply and private label.",
  applicationName: site.name,
  icons: { icon: "/images/favicon.png" },
  openGraph: { type: "website", siteName: site.name, images: [ogImage] },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0B140F" },
  ],
};

const org = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}${logo}`,
  email: site.email,
  telephone: site.phone,
  address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
  hasMap: site.map,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <JsonLd data={org} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-bg focus:px-4 focus:py-2 focus:text-ink focus:ring-2 focus:ring-accent"
        >
          Skip to content
        </a>
        <Header
          shopLinks={products.map((p) => ({ href: `/product/${p.slug}`, name: p.name, hint: p.headline }))}
          searchDocs={buildSearchDocs()}
        />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFab number={site.whatsappNumber} phoneHref={site.phoneHref} />
      </body>
    </html>
  );
}
