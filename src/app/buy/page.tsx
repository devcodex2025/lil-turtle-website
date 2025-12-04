"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TokenChart from "@/components/TokenChart";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function BuyPage() {
    // Load Jupiter Terminal script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://terminal.jup.ag/main-v2.js";
        script.onload = () => {
            if (window.Jupiter) {
                window.Jupiter.init({
                    displayMode: "integrated",
                    integratedTargetId: "integrated-terminal",
                    endpoint: "https://api.mainnet-beta.solana.com",
                    formProps: {
                        fixedOutputMint: true,
                        initialOutputMint: "14XEVKV9LJJFWc7epbdd1W9E1a1JivB2st8sx4nCboop", // LIL TURTLE
                    },
                });
            }
        };
        document.head.appendChild(script);
    }, []);

    return (
        <main className="min-h-screen bg-bg-dark">
            <Navbar />

            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
                    {/* Left: Chart Section (Takes up 2 cols) */}
                    <div className="lg:col-span-2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 flex items-center gap-4">
                                $LILTURTLE <span className="text-primary-green text-2xl bg-primary-green/10 px-3 py-1 rounded-lg">LIL</span>
                            </h1>
                            <TokenChart />
                        </motion.div>

                        {/* Token Info Grid */}
                        <div className="grid sm:grid-cols-3 gap-4">
                            {[
                                { label: "Market Cap", value: "$420K" },
                                { label: "Liquidity", value: "$50K" },
                                { label: "Volume (24h)", value: "$12K" },
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

                    {/* Right: Jupiter Swap Terminal */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-1"
                    >
                        <div className="glass-card p-4 rounded-3xl sticky top-32 border border-primary-gold/20 overflow-hidden">
                            <h2 className="text-xl font-bold text-white mb-4 px-4">Swap Token</h2>
                            {/* Jupiter Terminal Container */}
                            <div id="integrated-terminal" className="w-full min-h-[400px] rounded-2xl overflow-hidden" />

                            <p className="text-center text-xs text-gray-500 mt-4">
                                Powered by Jupiter Aggregator
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

// Add types for window.Jupiter
declare global {
    interface Window {
        Jupiter: any;
    }
}
