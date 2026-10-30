"use client";

import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import TokenChart from "@/components/TokenChart";
import Image from "next/image";
import { motion } from "framer-motion";
import { fetchTokenInfo, TokenInfo } from "@/services/tokenData";
import { TOKEN_ADDRESS } from "@/services/tokenData";
import TokenAddress from "@/components/TokenAddress";
import { useState, useEffect } from "react";

const PUMP_FUN_URL = `https://pump.fun/coin/${TOKEN_ADDRESS}`;
const JUPITER_URL = `https://jup.ag/tokens/${TOKEN_ADDRESS}`;

export default function BuyPageClient({ initialTokenInfo }: { initialTokenInfo: TokenInfo | null }) {
    const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(initialTokenInfo);

    const formatCurrency = (value: number) => {
        if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
        if (value >= 1000) return `$${(value / 1000).toFixed(2)}K`;
        return `$${value.toFixed(2)}`;
    };

    // Keep periodic updates client-side without blocking server render
    useEffect(() => {
        const loadData = async () => {
            try {
                const info = await fetchTokenInfo();
                if (info) setTokenInfo(info);
            } catch (e) {
                console.error("Error loading token data:", e);
            }
        };
        loadData(); // Fetch fresh data immediately on mount
        const interval = setInterval(loadData, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    return (
        <main className="min-h-screen bg-bg-dark">

            <section className="pt-28 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Page Title (full width) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8"
                    >
                        <h1 className="text-4xl md:text-5xl font-black text-white flex flex-wrap items-center gap-4">
                            ${tokenInfo?.symbol || "LILTURTLE"} <span className="text-primary-green text-2xl bg-primary-green/10 px-3 py-1 rounded-lg">{tokenInfo?.symbol || "..."}</span>
                        </h1>
                        <div className="mt-5">
                            <TokenAddress variant="full" />
                        </div>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left: Chart Section (Takes up 2 cols) */}
                        <div className="lg:col-span-2 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <TokenChart
                                    pairAddress={tokenInfo?.pairAddress}
                                    currentPrice={tokenInfo?.price ? parseFloat(tokenInfo.price) : undefined}
                                    priceChange={tokenInfo?.priceChange24h}
                                />
                            </motion.div>

                        {/* Token Info Grid */}
                        <div className="grid sm:grid-cols-3 gap-4">
                            {[
                                { label: "Market Cap", value: tokenInfo ? formatCurrency(tokenInfo.marketCap) : "..." },
                                { label: "Liquidity", value: tokenInfo ? formatCurrency(tokenInfo.liquidity) : "..." },
                                { label: "Volume (24h)", value: tokenInfo ? formatCurrency(tokenInfo.volume24h) : "..." },
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                    className="glass-card p-6 rounded-2xl text-center"
                                >
                                    <p className="text-gray-400 text-xs font-bold uppercase mb-2">{stat.label}</p>
                                    <p className="text-2xl font-black text-white">{stat.value}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Buy CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-1"
                    >
                        <div className="glass-card p-8 rounded-3xl lg:sticky top-24 border border-primary-gold/20 overflow-hidden text-center">
                            <h2 className="text-3xl font-black text-white mb-3">
                                BUY <span className="text-primary-green">$LILTURTLE</span>
                            </h2>
                            <p className="text-gray-400 text-sm mb-8">
                                Swap SOL for LILTURTLE on your favourite platform
                            </p>

                            <div className="flex flex-col gap-4">
                                <a
                                    href={PUMP_FUN_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 px-8 py-4 bg-primary-gold text-black font-black text-lg rounded-xl hover:bg-white transition-all duration-300 transform hover:scale-105 glow-gold shadow-xl"
                                >
                                    <span className="relative w-6 h-6 rounded-full shrink-0">
                                        <Image src="/pump-fun-logo.png" alt="Pump.fun" fill sizes="24px" className="object-contain drop-shadow" />
                                    </span>
                                    BUY ON PUMP.FUN
                                </a>

                                <a
                                    href={JUPITER_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 px-8 py-4 glass-card text-white font-bold text-lg rounded-xl hover:border-primary-gold hover:text-primary-gold transition-all duration-300"
                                >
                                    <span className="relative w-6 h-6 rounded-full overflow-hidden shrink-0">
                                        <Image src="/jup-logo.png" alt="Jupiter" fill sizes="24px" className="object-cover" />
                                    </span>
                                    BUY ON JUPITER
                                </a>
                            </div>

                            <p className="text-xs text-gray-500 mt-8">
                                Connect your wallet on the platform you choose
                            </p>
                        </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <FAQ />

            <Footer />
        </main>
    );
}
