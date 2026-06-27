import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Custom Signature — Premium AI Email Signatures for Fortune 500",
  description:
    "Transform your email into a powerful brand touchpoint. AI-generated interactive email signatures with animated logos, social handles, and calendar links. Trusted by 50,000+ professionals.",
  keywords: "email signature, custom email signature, professional email signature, AI email signature, animated email signature",
  openGraph: {
    title: "Custom Signature — Premium AI Email Signatures",
    description: "42% higher reply rates. 3X more link clicks. Used by Fortune 500 companies.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-black text-white antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
