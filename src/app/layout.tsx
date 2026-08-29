import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/src/context/LanguageContext";

export const metadata: Metadata = {
  title: "ViralNewsIndia - Latest News",
  description:
    "Latest breaking news, India news, world news, business, technology and sports.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}