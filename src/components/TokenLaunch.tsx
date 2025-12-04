"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function TokenLaunch() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="relative py-32 px-6 overflow-hidden" ref={ref}>
            {/* Background Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[800px] h-[800px] bg-primary-green/10 rounded-full blur-[150px] animate-pulse-slow" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8 }}
                    className="glass-card p-12 md:p-20 rounded-[3rem] border border-primary-gold/20 relative overflow-hidden"
                >
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shine pointer-events-none" />

                    <span className="inline-block px-6 py-2 rounded-full bg-primary-gold/20 text-primary-gold font-bold mb-8 border border-primary-gold/50">
                        🚀 OFFICIAL LAUNCH
                    </span>

                    <h2 className="text-5xl md:text-7xl font-black text-white mb-8">
                        BUY <span className="text-primary-green">$LILTURTLE</span>
                    </h2>

                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                        Join the movement. Secure your bag early and become part of the most stylish community in crypto.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <a
                            href="https://boop.fun/tokens/14XEVKV9LJJFWc7epbdd1W9E1a1JivB2st8sx4nCboop"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-10 py-5 bg-primary-gold text-black font-black text-xl rounded-2xl hover:bg-white transition-all duration-300 transform hover:scale-105 glow-gold shadow-xl"
                        >
                            BUY ON BOOP.FUN
                        </a>

                        <a
                            href="https://x.com/lilturtlenft"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-10 py-5 glass-card text-white font-bold text-xl rounded-2xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            JOIN TWITTER
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
