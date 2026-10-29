import Hero from "@/components/Hero";
import About from "@/components/About";
import Statistics from "@/components/Statistics";
import Ticker from "@/components/Ticker";
import TokenLaunch from "@/components/TokenLaunch";
import Footer from "@/components/Footer";
import PriceWidget from "@/components/PriceWidget";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lil Turtle - Community Memecoin on Solana",
  description: "Join the elite Lil Turtle community. Community-driven memecoin on Solana blockchain. Swap instantly on Jupiter and join the movement.",
  keywords: ["Lil Turtle", "memecoin", "Solana", "crypto", "blockchain", "LILTURTLE token", "$LILTURTLE", "pump.fun", "Jupiter swap"],
  openGraph: {
    title: "Lil Turtle - Community Memecoin on Solana",
    description: "Join the elite Lil Turtle community. Community-driven tokenomics on Solana.",
    images: ["/og-home.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lil Turtle - Community Memecoin on Solana",
    description: "Join the elite Lil Turtle community on Solana blockchain.",
    images: ["/og-home.png"],
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-dark">
      <PriceWidget />
      <Hero />
      <About />
      <Statistics />
      <Ticker />
      <Ticker />
      <TokenLaunch />
      <Footer />
    </main>
  );
}
