import type { Metadata } from "next";
import { Aleo } from "next/font/google";
import "./globals.css";

const aleo = Aleo({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kushal",
  description: "Software Engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${aleo.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
