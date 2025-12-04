"use client";

import { motion } from "framer-motion";

export default function PriceWidget() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="fixed top-24 right-6 z-40 hidden md:flex items-center gap-3 px-4 py-2 glass-card rounded-full border border-primary-green/30 hover:border-primary-green transition-colors cursor-pointer group"
        >
            <div className="w-2 h-2 rounded-full bg-primary-green animate-pulse" />

            <div className="flex flex-col">
                <span className="text-xs text-gray-400 font-bold tracking-wider">LILTURTLE</span>
                <span className="text-sm font-black text-white group-hover:text-primary-green transition-colors">
                    $0.000420
                </span>
            </div>

            <div className="flex items-center text-primary-green text-xs font-bold bg-primary-green/10 px-2 py-0.5 rounded-md">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                +12.5%
            </div>
        </motion.div>
    );
}
