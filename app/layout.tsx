import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alaska.ly"),
  title: "شركة ألاسكا لصناعة أكياس الأعلاف | ALASKA",
  description:
    "الموقع الرسمي لشركة ألاسكا لصناعة أكياس الأعلاف والأكياس المنسوجة للأرز والفحم والخضروات والأسمدة في زليتن، ليبيا.",
  alternates: { canonical: "https://alaska.ly/" },
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
  openGraph: {
    title: "شركة ألاسكا لصناعة أكياس الأعلاف | ALASKA",
    description:
      "شركة ليبية متخصصة في صناعة أكياس الأعلاف والأكياس المنسوجة للأرز والفحم والخضروات والأسمدة.",
    url: "https://alaska.ly/",
    siteName: "ALASKA",
    locale: "ar_LY",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1672,
        height: 941,
        alt: "ALASKA — ننسج القوة، نحمي منتجك",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "شركة ألاسكا لصناعة أكياس الأعلاف | ALASKA",
    description: "صناعة أكياس الأعلاف والأكياس المنسوجة في زليتن، ليبيا.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          rel="preload"
          href="/fonts/JumanArabic-Normal.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link rel="preload" href="/alaska-logo.png" as="image" type="image/png" />
        <link rel="preload" href="/hero-factory-v2.png" as="image" type="image/png" />
        <noscript>
          <style>{`.alaska-preloader{display:none!important}.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
