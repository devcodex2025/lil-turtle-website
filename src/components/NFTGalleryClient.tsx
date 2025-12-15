"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import useMinWidth from '../hooks/useMinWidth';

interface NFT {
    id: string;
    title: string;
    image: string;
    collection: string;
    rarity: string;
    isSold?: boolean;
    isSoldCheckFailed?: boolean;
}

interface NFTGalleryClientProps {
    nfts: NFT[];
}

export default function NFTGalleryClient({ nfts }: NFTGalleryClientProps) {
    // Force grid columns based on window width to bypass potential CSS/rem issues
    const [columns, setColumns] = useState(4); // Default to desktop

    // Use matchMedia hooks for robust breakpoints
    const gte1024 = useMinWidth(1024);
    const gte768 = useMinWidth(768);
    useEffect(() => {
        if (!gte768) setColumns(2);
        else if (!gte1024) setColumns(3);
        else setColumns(4);
    }, [gte768, gte1024]);

    return (
        <div
            className="grid gap-6 transition-all duration-300"
            style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
            }}
        >
            {nfts.map((nft, index) => (
                <motion.div
                    key={nft.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: nft.isSold ? 0.6 : 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`glass-card p-3 rounded-2xl group hover:-translate-y-2 transition-transform duration-300 border border-white/5 hover:border-primary-green/50 ${nft.isSold ? 'filter grayscale pointer-events-none opacity-70' : ''}`}
                >
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-black/50">
                        <Image
                            src={nft.image}
                            alt={nft.title}
                            fill
                            className={`object-cover group-hover:scale-110 transition-transform duration-500 ${nft.isSold ? 'filter grayscale' : ''}`}
                        />
                        <div className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold backdrop-blur-md bg-black/60 text-white border border-white/10 z-10">
                            {nft.collection.includes("Crown") ? "👑 Crown" : "🐢 Mini"}
                        </div>

                        {/* Centered 'Sold' overlay removed — status remains in the footer */}
                    </div>

                    <div className="px-2 pb-2">
                        <h3 className="text-sm font-bold text-white mb-1 truncate">{nft.title}</h3>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-400">Status</span>
                            <span className={`text-xs font-bold ${nft.isSold ? 'text-red-500' : nft.isSoldCheckFailed ? 'text-yellow-400' : 'text-primary-green'}`}>
                                {nft.isSold ? 'Sold' : nft.isSoldCheckFailed ? 'Unknown' : 'Available'}
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
