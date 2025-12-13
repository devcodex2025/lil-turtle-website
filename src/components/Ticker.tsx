"use client";
import Link from "next/link";

export default function Ticker() {
    const text = "LIL TURTLE • TWO NFT COLLECTIONS ON ABSTRACT • MEMECOIN ON SOLANA ";
    const repeatedText = text.repeat(10);

    return (
        <section className="relative py-8 overflow-hidden border-y border-primary-green/20 bg-black/50 backdrop-blur-sm">
            {/* Background */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,157,0.2) 50%, transparent 100%)',
                }}
            />

            {/* Scrolling Text (clickable) */}
            <Link href="/buy" aria-label="Buy Lil Turtle token" className="relative flex whitespace-nowrap overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-gold rounded">
                <div className="animate-slide flex">
                    <span className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-green via-primary-gold to-primary-green pr-8">
                        {repeatedText}
                    </span>
                    <span className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-green via-primary-gold to-primary-green pr-8">
                        {repeatedText}
                    </span>
                </div>
            </Link>
        </section>
    );
}
