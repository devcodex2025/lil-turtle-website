"use client";

import { motion } from "framer-motion";
import Turtle3DViewer from "./Turtle3DViewer";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-green/20 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary-gold/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center lg:text-left"
                >
                    <div className="inline-block px-4 py-2 rounded-full glass-card mb-6 border border-primary-green/30">
                        <span className="text-primary-green font-bold tracking-wider text-sm uppercase">
                            Community Driven Token
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black leading-tight mb-6">
                        <span className="text-white">$LIL</span> <br />
                        <span className="text-gradient-gold">TURTLE</span>
                    </h1>

                    <p className="text-gray-400 text-xl md:text-2xl mb-8 max-w-lg mx-auto lg:mx-0 font-light">
                        The most stylish token in your portfolio. Join the elite club of holders.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <a
                            href="#about"
                            className="px-8 py-4 bg-primary-green text-black font-bold text-lg rounded-xl hover:bg-white transition-all duration-300 transform hover:scale-105 glow-green"
                        >
                            Explore Ecosystem
                        </a>
                        <a
                            href="https://boop.fun/tokens/14XEVKV9LJJFWc7epbdd1W9E1a1JivB2st8sx4nCboop"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 glass-card text-white font-bold text-lg rounded-xl hover:border-primary-gold hover:text-primary-gold transition-all duration-300"
                        >
                            Buy Token
                        </a>
                    </div>
                </motion.div>

                {/* 3D Model Viewer */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative"
                >
                    <div className="relative z-10">
                        <Turtle3DViewer />
                    </div>

                    {/* Decorative Ring */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-primary-green/20 rounded-full animate-[spin_20s_linear_infinite]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-primary-gold/10 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
                </motion.div>
            </div>

            {/* Scroll Indicator Removed */}

        </section>
    );
}
