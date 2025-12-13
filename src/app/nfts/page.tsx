import { Metadata } from "next";
import { Suspense } from "react";

import Footer from "@/components/Footer";
import NFTListContainer from "@/components/NFTListContainer";

export const metadata: Metadata = {
    title: "NFT Gallery - Lil Turtle | Abstract Turtle NFT Collection",
    description: "Explore the exclusive Abstract Lil Turtle NFT collection on Solana. Unique hand-crafted digital art featuring Mini and Crown collections. Premium memecoin NFTs.",
    keywords: ["Lil Turtle NFT", "Abstract Turtle NFT", "Solana NFT", "memecoin NFT", "digital collectibles", "crypto art", "NFT collection"],
    openGraph: {
        title: "NFT Gallery - Lil Turtle Collection",
        description: "Explore exclusive Abstract Lil Turtle NFTs. Unique digital collectibles on Solana blockchain.",
        images: ["/og-nfts.png"],
    },
    twitter: {
        card: "summary_large_image",
        title: "NFT Gallery - Lil Turtle Collection",
        description: "Explore exclusive Abstract Lil Turtle NFTs. Unique digital collectibles on Solana blockchain.",
        images: ["/og-nfts.png"],
    },
};

// Collection Data moved to NFTListContainer to isolate fetching

export default function NFTGallery() {
    return (
        <main className="min-h-screen bg-bg-dark">

            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
                            NFT <span className="text-gradient-gold">GALLERY</span>
                        </h1>
                        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                            Explore the exclusive collection of Abstract Lil Turtles.
                            Real items from the blockchain.
                        </p>
                    </div>

                    {/* Filters + Sort + Grid */}
                    <div className="relative">
                        <Suspense fallback={<div className="text-center py-20 text-gray-500 animate-pulse">Loading collection status...</div>}>
                            <NFTListContainer />
                        </Suspense>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
