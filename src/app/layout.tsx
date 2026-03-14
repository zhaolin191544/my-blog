import { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://linlin.works";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lin's Blog",
    template: "%s | Lin's Blog",
  },
  description:
    "Welcome to my little corner of the internet. A personal blog about frontend development, life, stories, and everything in between.",
  keywords: [
    "Lin",
    "blog",
    "frontend",
    "Next.js",
    "React",
    "web development",
    "personal blog",
  ],
  authors: [{ name: "Lin" }],
  creator: "Lin",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: "en_US",
    siteName: "Lin's Blog",
    title: "Lin's Blog",
    description:
      "Welcome to my little corner of the internet.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lin's Blog",
    description:
      "Welcome to my little corner of the internet.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#222222",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <Analytics/>
      <body>{children}</body>
    </html>
  );
}
