import type { Metadata } from "next";
import { Fredoka, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollState from "@/components/ScrollState";
import WhatsAppFab from "@/components/WhatsAppFab";
import { logo, ogImage, site } from "@/lib/data";
import "./globals.css";

const display = Fredoka({ subsets: ["latin"], variable: "--f-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--f-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "PureSeed | Sesame, Cashew, Groundnuts & Honey Processor and Exporter", template: "%s | PureSeed" },
  description: "PureSeed sources, processes and exports sesame seeds, sesame oil, cashew nuts, groundnuts and organic honey from Tanzania and Africa. Bulk supply and private label.",
  icons: { icon: "/images/favicon.png" },
  openGraph: { images: [ogImage] },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large" } },
};

const org = {
  "@context": "https://schema.org", "@type": "Organization", name: site.name, url: site.url, logo: `${site.url}${logo}`,
  email: site.email, telephone: site.phone,
  address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
  hasMap: site.map,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        {/* Lets CSS know JS is running, so image fade-ins can never hide content for no-JS visitors. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFab />
        <ScrollState />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      </body>
    </html>
  );
}
