"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { fetchTokenInfo, TokenInfo } from "@/services/tokenData";

export default function PriceWidget() {
    const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);

    useEffect(() => {
        const loadData = async () => {
            const info = await fetchTokenInfo();
            if (info) setTokenInfo(info);
        };
        loadData();
        const interval = setInterval(loadData, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    const formatPrice = (price: string) => {
        const p = parseFloat(price);
        if (p < 0.0001) return `$${p.toFixed(8)}`;
        return `$${p.toFixed(6)}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="fixed top-24 right-6 z-40 hidden md:flex items-center gap-3 px-4 py-2 glass-card rounded-full border border-primary-green/30 hover:border-primary-green transition-colors cursor-pointer group"
        >
            <div className="w-2 h-2 rounded-full bg-primary-green animate-pulse" />

            <div className="flex flex-col">
                <span className="text-xs text-gray-400 font-bold tracking-wider">
                    {tokenInfo?.symbol || "LILTURTLE"}
                </span>
                <span className="text-sm font-black text-white group-hover:text-primary-green transition-colors">
                    {tokenInfo ? formatPrice(tokenInfo.price) : "Loading..."}
                </span>
            </div>

            {tokenInfo && (
                <div className={`flex items-center text-xs font-bold px-2 py-0.5 rounded-md ${tokenInfo.priceChange24h >= 0 ? 'text-primary-green bg-primary-green/10' : 'text-red-500 bg-red-500/10'}`}>
                    <svg className={`w-3 h-3 mr-1 ${tokenInfo.priceChange24h < 0 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    {Math.abs(tokenInfo.priceChange24h).toFixed(2)}%
                </div>
            )}
        </motion.div>
    );
}
