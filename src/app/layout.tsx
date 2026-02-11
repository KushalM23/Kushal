import type { Metadata } from "next";
import { IBM_Plex_Mono, Special_Elite } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
});

const specialElite = Special_Elite({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
});

export const metadata: Metadata = {
  title: "KUSHAL_OS // Portfolio",
  description: "Full-Stack Developer. Builder. Problem Solver.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ibmPlexMono.variable} ${specialElite.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
