"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface NFTCardProps {
    title: string;
    image: string;
    link: string;
    delay: number;
    isInView: boolean;
}

function NFTCard({ title, image, link, delay, isInView }: NFTCardProps) {
    return (
        <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay }}
            className="group relative block"
        >
            <div className="glass-card p-4 rounded-3xl transition-all duration-500 group-hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative aspect-square mb-6 rounded-2xl overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                    {/* Badge */}
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        <span className="text-xs font-bold text-primary-gold">ERC-721</span>
                    </div>
                </div>

                {/* Content */}
                <div className="px-2 pb-2">
                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-primary-green transition-colors">
                        {title}
                    </h3>

                    <div className="flex items-center justify-between mt-4">
                        <span className="text-gray-400 text-sm">Total Supply: 1000</span>
                        <div className="flex items-center gap-2 text-primary-gold font-bold">
                            <span>MINT NOW</span>
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </motion.a>
    );
}

export default function NFTCollections() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const collections = [
        {
            title: "Abstract Lil Turtle Mini",
            image: "/nft-1.png",
            link: "https://abstract-lil-turtle-mini.nfts2.me/",
        },
        {
            title: "Abstract Lil Turtle Crown",
            image: "/nft-2.png",
            link: "https://abstract-lil-turtle-crown-mini.nfts2.me/",
        },
    ];

    return (
        <section id="nfts" className="relative py-32 px-6" ref={ref}>
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="text-primary-green font-bold tracking-widest uppercase mb-4 block">
                        Digital Collectibles
                    </span>
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
                        NFT <span className="text-gradient-gold">COLLECTIONS</span>
                    </h2>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                        Exclusive hand-crafted artworks featuring unique traits and premium aesthetics.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {collections.map((collection, index) => (
                        <NFTCard
                            key={collection.title}
                            title={collection.title}
                            image={collection.image}
                            link={collection.link}
                            delay={0.2 + index * 0.2}
                            isInView={isInView}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
