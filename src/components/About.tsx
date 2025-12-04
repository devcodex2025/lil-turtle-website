"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const characteristics = [
        { label: "TURTLE POWER", value: 100, color: "bg-[#00ff9d]" },
        { label: "MEME POTENTIAL", value: 100, color: "bg-[#ffd700]" },
        { label: "COMMUNITY", value: 100, color: "bg-[#9d00ff]" },
    ];

    return (
        <section id="about" className="relative py-32 px-6 overflow-hidden" ref={ref}>
            {/* Background Decor */}
            <div className="absolute right-0 top-1/4 w-1/2 h-1/2 bg-gradient-to-b from-primary-green/5 to-transparent blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                {/* Left: Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-none">
                        WHO IS <br />
                        <span className="text-gradient-gold">LIL TURTLE?</span>
                    </h2>

                    <div className="glass-card p-8 rounded-3xl border-l-4 border-primary-green">
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            Lil Turtle isn't just another memecoin. It's a philosophy. A symbol of steady progress in a chaotic market.
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            While others rush and crash, Lil Turtle moves with purpose. Smart, resilient, and unstoppable. We believe that even small steps, when taken consistently, lead to massive results.
                        </p>
                    </div>
                </motion.div>

                {/* Right: Stats/Bars */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-10"
                >
                    {characteristics.map((char, index) => (
                        <div key={char.label}>
                            <div className="flex justify-between items-end mb-4">
                                <h4 className="text-xl font-bold text-white tracking-wider">
                                    {char.label}
                                </h4>
                                <span className="text-2xl font-black text-white">
                                    {char.value}%
                                </span>
                            </div>

                            <div className="h-6 bg-white/5 rounded-full overflow-hidden p-1 border border-white/10">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={isInView ? { width: `${char.value}%` } : {}}
                                    transition={{
                                        duration: 1.5,
                                        delay: 0.4 + index * 0.2,
                                        ease: "circOut"
                                    }}
                                    className={`h-full rounded-full ${char.color} shadow-[0_0_15px_rgba(0,255,157,0.5)] relative overflow-hidden`}
                                >
                                    <div className="absolute inset-0 bg-[url('/bg-texture.png')] opacity-30 mix-blend-overlay" />
                                    <motion.div
                                        animate={{ x: ["-100%", "100%"] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
