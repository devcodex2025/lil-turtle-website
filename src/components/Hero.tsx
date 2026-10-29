"use client";

import HeroClient from "./HeroClient";

import { useState, useEffect } from "react";

export default function Hero() {

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-green/20 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary-gold/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
            </div>

            <div
                className="max-w-7xl mx-auto px-6 relative z-10 grid gap-12 items-center grid-cols-1 lg:grid-cols-2"
            >
                {/* Text Content */}
                <div className="text-center lg:text-left">
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
                            href="https://pump.fun/coin/CVGcZCShuPZJKAHe3VE4FBR4jo6jpL9Z9xP9Wigmpump"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 glass-card text-white font-bold text-lg rounded-xl hover:border-primary-gold hover:text-primary-gold transition-all duration-300"
                        >
                            Buy Token
                        </a>
                    </div>
                </div>

                {/* 3D Model Viewer – client component */}
                <HeroClient />
            </div>

            {/* Scroll Indicator Removed */}

        </section>
    );
}
