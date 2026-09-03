import type { Metadata } from "next";
import localFont from "next/font/local";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageTransition } from "@/components/layout/page-transition";

import "./globals.css";

const inter = localFont({
  src: [
    {
      path: "./fonts/inter-latin-wght-normal.woff2",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "./fonts/inter-latin-wght-italic.woff2",
      style: "italic",
      weight: "100 900",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Attendez - Transforming Business with AI-based Solutions",
    template: "%s | Attendez",
  },
  description:
    "Attendez helps B2B teams transform their business with AI. Discovery-first consulting, automations, AI voice and WhatsApp agents, websites, and SEO/AEO/GEO.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <PageTransition />
      </body>
    </html>
  );
}
