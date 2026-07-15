import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alaska.ly"),
  title: "شركة ألاسكا لصناعة أكياس الأعلاف | ALASKA",
  description: "شركة ليبية في زليتن لصناعة أكياس الأعلاف والأرز والفحم والخضروات والأسمدة.",
  alternates: { canonical: "https://alaska.ly/" },
  icons: { icon: "/alaska-logo.webp", shortcut: "/alaska-logo.webp" },
  openGraph: {
    title: "شركة ألاسكا لصناعة أكياس الأعلاف",
    description: "حلول الأكياس المنسوجة من زليتن، ليبيا.",
    url: "https://alaska.ly/",
    siteName: "ALASKA",
    locale: "ar_LY",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
