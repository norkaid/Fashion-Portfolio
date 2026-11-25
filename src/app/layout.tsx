import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/300-italic.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource-variable/jost";
import "./globals.css";
import { site } from "@/content/site";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Loader from "@/components/Loader";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: Fashion Designer`,
    template: `%s · ${site.name}`,
  },
  description: `${site.name} is an emerging fashion designer and the founder of Norkai. ${site.intro}`,
  keywords: [
    "Donna Norkai Omaboe",
    "Norkai",
    "fashion designer",
    "Ghana",
    "Accra",
    "couture",
    "Afro-contemporary",
    "fashion portfolio",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    title: `${site.name}: Fashion Designer`,
    description: site.intro,
    siteName: site.name,
    images: [{ url: "/images/temp/hero.jpg", width: 2400, height: 2400 }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#F7F2EA",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Fashion Designer",
  url: site.url,
  sameAs: [site.linkedin, site.instagram].filter(Boolean),
  worksFor: { "@type": "Organization", name: "Norkai" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ivory focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Loader />
        <SmoothScroll />
        <Cursor />
        <Nav />
        {children}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
