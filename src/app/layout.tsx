import "./globals.css";
import type { Metadata } from "next";
import { getMessages, getRequestConfig } from "next-intl/server";


export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const messages = await getMessages();

  return (
    <html lang="zh">
      <body>
        {children}
      </body>
    </html>
  );
}

