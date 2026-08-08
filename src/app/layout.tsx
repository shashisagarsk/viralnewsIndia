import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "News24 - Latest News",
  description:
    "Latest breaking news, India news, world news, business, technology and sports.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}