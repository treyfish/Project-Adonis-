import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { BottomNav } from "./components/BottomNav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Project Adonis",
  description:
    "Measure your proportions against classical male aesthetic standards. Ranked along a Greek-statue progression, grounded in Stoic philosophy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pb-20 md:pb-0">
        <main className="flex-1">{children}</main>
        <BottomNav />
        <footer className="px-5 py-6 text-center text-xs text-stone-muted border-t border-[var(--color-line)]">
          Aesthetic heuristic, not a health metric. 18+. Consult a doctor for medical advice.
        </footer>
      </body>
    </html>
  );
}
