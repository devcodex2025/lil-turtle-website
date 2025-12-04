"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";

// Collection Data
const collections = [
    {
        name: "Abstract Lil Turtle Mini",
        cid: "bafybeigu2jy6e33ellha43tbpzhhbucvvnkevgxoht6f7biygjoipz53mm",
        size: 24,
        ext: "webp",
        prefix: "Mini"
    },
    {
        name: "Abstract Lil Turtle Crown",
        cid: "bafybeieebib47wlpeqktbug47hemiudjrdt4uxt4yo45jxfzt4lslbdpby",
        size: 16,
        ext: "webp",
        prefix: "Crown"
    }
];

// Generate full list of NFTs
const allNFTs = collections.flatMap(col =>
    Array.from({ length: col.size }).map((_, i) => ({
        id: `${col.prefix}-${i + 1}`,
        title: `${col.name} #${i + 1}`,
        // Using Cloudflare IPFS gateway for better performance
        image: `https://cloudflare-ipfs.com/ipfs/${col.cid}/${i + 1}.${col.ext}`,
        collection: col.name,
        rarity: i < 5 ? "Legendary" : i < 10 ? "Rare" : "Common", // Simulated rarity for now
    }))
);

export default function NFTGallery() {
    return (
        <main className="min-h-screen bg-bg-dark">
            <Navbar />

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

                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {['All', 'Mini Collection', 'Crown Collection'].map((filter, i) => (
                            <button
                                key={filter}
                                className={`px-6 py-2 rounded-full border ${i === 0
                                    ? 'bg-primary-green text-black border-primary-green'
                                    : 'border-white/10 text-gray-400 hover:border-primary-green hover:text-white'
                                    } transition-all font-bold`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {allNFTs.map((nft, index) => (
                            <motion.div
                                key={nft.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="glass-card p-3 rounded-2xl group hover:-translate-y-2 transition-transform duration-300 border border-white/5 hover:border-primary-green/50"
                            >
                                <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-black/50">
                                    <Image
                                        src={nft.image}
                                        alt={nft.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        unoptimized // Needed for external IPFS images
                                    />
                                    <div className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold backdrop-blur-md bg-black/60 text-white border border-white/10">
                                        {nft.collection.includes("Crown") ? "👑 Crown" : "🐢 Mini"}
                                    </div>
                                </div>

                                <div className="px-2 pb-2">
                                    <h3 className="text-sm font-bold text-white mb-1 truncate">{nft.title}</h3>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-xs text-gray-400">Price</span>
                                        <span className="text-xs font-bold text-primary-green">Check Market</span>
                                    </div>
                                    <a
                                        href={nft.collection.includes("Crown")
                                            ? "https://abstract-lil-turtle-crown-mini.nfts2.me/"
                                            : "https://abstract-lil-turtle-mini.nfts2.me/"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full mt-3 py-2 bg-white/5 hover:bg-primary-green hover:text-black text-white text-center text-xs font-bold rounded-lg transition-colors"
                                    >
                                        Mint / View
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
