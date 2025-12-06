import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Statistics from "@/components/Statistics";
import Ticker from "@/components/Ticker";
import NFTCollections from "@/components/NFTCollections";
import TokenLaunch from "@/components/TokenLaunch";
import Footer from "@/components/Footer";
import PriceWidget from "@/components/PriceWidget";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lil Turtle - Premium Memecoin & NFT Collection on Solana",
  description: "Join the elite Lil Turtle community. Premium memecoin with exclusive NFT collections on Solana blockchain. Community-driven tokenomics and unique digital assets.",
  keywords: ["Lil Turtle", "memecoin", "Solana", "NFT", "crypto", "blockchain", "digital art", "Abstract Turtle", "LILTURTLE token"],
  openGraph: {
    title: "Lil Turtle - Premium Memecoin & NFT Collection",
    description: "Join the elite Lil Turtle community. Exclusive NFTs and community-driven tokenomics on Solana.",
    images: ["/logo.png"],
  },
};

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <PriceWidget />
      <Hero />
      <About />
      <Statistics />
      <Ticker />
      <NFTCollections />
      <Ticker />
      <TokenLaunch />
      <Footer />
    </main>
  );
}
