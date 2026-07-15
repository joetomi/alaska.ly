import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alaska.ly"),
  title: "شركة الاسكا لصناعة أكياس الأعلاف | ALASKA",
  description: "الموقع الرسمي لشركة الاسكا لصناعة أكياس الأعلاف والأكياس المنسوجة للأرز والفحم والخضروات والأسمدة في زليتن، ليبيا.",
  alternates: { canonical: "https://alaska.ly/" },
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
  openGraph: {
    title: "شركة الاسكا لصناعة أكياس الأعلاف | ALASKA",
    description: "شركة ليبية متخصصة في صناعة أكياس الأعلاف والأكياس المنسوجة للأرز والفحم والخضروات والأسمدة.",
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
    title: "شركة الاسكا لصناعة أكياس الأعلاف | ALASKA",
    description: "صناعة أكياس الأعلاف والأكياس المنسوجة في زليتن، ليبيا.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
