import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lin's Blog",
  description: "Welcome to my little corner of the internet.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}
