"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface NFT {
    id: string;
    title: string;
    image: string;
    collection: string;
    rarity: string;
    isSold?: boolean;
}

interface NFTGalleryClientProps {
    nfts: NFT[];
}

export default function NFTGalleryClient({ nfts }: NFTGalleryClientProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {nfts.map((nft, index) => (
                <motion.div
                    key={nft.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: nft.isSold ? 0.6 : 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`glass-card p-3 rounded-2xl group hover:-translate-y-2 transition-transform duration-300 border border-white/5 hover:border-primary-green/50 ${nft.isSold ? 'grayscale pointer-events-none' : ''}`}
                >
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-black/50">
                        <Image
                            src={nft.image}
                            alt={nft.title}
                            fill
                            className={`object-cover group-hover:scale-110 transition-transform duration-500 ${nft.isSold ? 'grayscale' : ''}`}
                        />
                        <div className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold backdrop-blur-md bg-black/60 text-white border border-white/10 z-10">
                            {nft.collection.includes("Crown") ? "👑 Crown" : "🐢 Mini"}
                        </div>

                        {nft.isSold && (
                            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-grayscale">
                                <div className="bg-black/80 border border-white/20 text-white text-sm font-bold px-4 py-2 rounded">Sold</div>
                            </div>
                        )}
                    </div>

                    <div className="px-2 pb-2">
                        <h3 className="text-sm font-bold text-white mb-1 truncate">{nft.title}</h3>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-400">Status</span>
                            <span className={`text-xs font-bold ${nft.isSold ? 'text-red-500' : 'text-primary-green'}`}>
                                {nft.isSold ? 'Sold' : 'Available'}
                            </span>
                        </div>
                        <a
                            href={nft.collection.includes("Crown")
                                ? "https://abstract-lil-turtle-crown-mini.nfts2.me/"
                                : "https://abstract-lil-turtle-mini.nfts2.me/"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block w-full mt-3 py-2 ${nft.isSold ? 'bg-white/10 text-gray-400 cursor-not-allowed' : 'bg-white/5 hover:bg-primary-green hover:text-black text-white'} text-center text-xs font-bold rounded-lg transition-colors`}
                        >
                            {nft.isSold ? 'Sold Out' : 'Mint / View'}
                        </a>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
