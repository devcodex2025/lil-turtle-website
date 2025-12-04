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
  title: "Lil Turtle - Premium Memecoin & NFT Collection",
  description: "Join the elite community of Lil Turtle. Exclusive NFTs, community-driven tokenomics, and premium digital assets.",
  keywords: ["Lil Turtle", "memecoin", "NFT", "crypto", "luxury", "digital art"],
  openGraph: {
    title: "Lil Turtle - Premium Memecoin & NFT Collection",
    description: "Join the elite community of Lil Turtle. Exclusive NFTs, community-driven tokenomics, and premium digital assets.",
    images: ["/hero-turtle.png"],
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
