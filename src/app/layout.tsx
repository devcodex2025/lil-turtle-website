import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { AppWalletProvider } from "@/components/AppWalletProvider";
import Navbar from "@/components/Navbar";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const isDev = process.env.NODE_ENV === 'development';
const baseUrl = isDev ? 'http://localhost:3000' : 'https://www.lilturtle.fun';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
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
    url: baseUrl,
    siteName: "Lil Turtle",
    images: [
      {
        url: `${baseUrl}/og-home.png`,
        width: 1200,
        height: 630,
        alt: "Lil Turtle - Premium Memecoin & NFT Collection",
      }
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lil Turtle - Premium Memecoin & NFT Collection",
    description: "Join the elite Lil Turtle community on Solana. Exclusive NFTs and community-driven tokenomics.",
    images: [`${baseUrl}/og-home.png`],
    site: "@lilturtlenft",
    creator: "@lilturtlenft",
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
    <html lang="en" className="dark scroll-smooth force-platform-font">
      <body className={`${outfit.variable} font-sans antialiased bg-[#050505] text-white selection:bg-primary-gold selection:text-black overflow-x-hidden`}>
        <AppWalletProvider>
          <Navbar />
          {children}
        </AppWalletProvider>
      </body>
    </html>
  );
}
