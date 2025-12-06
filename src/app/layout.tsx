import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { AppWalletProvider } from "@/components/AppWalletProvider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://lil-turtle.com"),
  title: "Lil Turtle - Premium Memecoin & NFT Collection on Solana",
  description: "Join the elite Lil Turtle community. Premium memecoin with exclusive NFT collections, community-driven tokenomics, and unique digital assets on Solana blockchain.",
  keywords: [
    "Lil Turtle",
    "memecoin",
    "Solana memecoin",
    "NFT collection",
    "crypto",
    "blockchain",
    "digital art",
    "Abstract Turtle NFT",
    "LILTURTLE token",
    "Solana NFT",
    "boop.fun",
    "memecoin launch"
  ],
  openGraph: {
    title: "Lil Turtle - Premium Memecoin & NFT Collection",
    description: "Join the elite Lil Turtle community. Exclusive NFTs, community-driven tokenomics, and premium digital assets on Solana.",
    images: ["/logo.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lil Turtle - Premium Memecoin & NFT Collection",
    description: "Join the elite Lil Turtle community on Solana. Exclusive NFTs and community-driven tokenomics.",
    images: ["/logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${outfit.variable} font-sans antialiased bg-[#050505] text-white selection:bg-primary-gold selection:text-black`}>
        <AppWalletProvider>
          {children}
        </AppWalletProvider>
      </body>
    </html>
  );
}
