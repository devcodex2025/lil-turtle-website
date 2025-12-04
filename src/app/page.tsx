import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Statistics from "@/components/Statistics";
import Ticker from "@/components/Ticker";
import NFTCollections from "@/components/NFTCollections";
import TokenLaunch from "@/components/TokenLaunch";
import Footer from "@/components/Footer";
import PriceWidget from "@/components/PriceWidget";

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
