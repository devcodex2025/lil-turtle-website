"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const milestones = [
    {
        date: "JULY 2025",
        title: "THE HATCHING",
        text: "Lil Turtle appears on X. One turtle, one philosophy — \u201CSmall steps matter\u201D.",
    },
    {
        date: "DECEMBER 2025",
        title: "BUILDING THE SHELL",
        text: "The mobile version gets rebuilt, community campaigns and referral rewards kick off, and the token is submitted for Jupiter verification.",
    },
    {
        date: "DEC 31, 2025",
        title: "PUMP.FUN LAUNCH",
        text: "$LILTURTLE relaunches fresh on pump.fun — a slow, steady start. Exactly how turtles move.",
    },
    {
        date: "TODAY",
        title: "ONWARD",
        text: "Steady progress, steady community. Hold the shell, share the memes, take one small step every day.",
    },
];

export default function Story() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="story" className="relative py-32 px-6 overflow-hidden" ref={ref}>
            {/* Background Decor */}
            <div className="absolute left-0 top-1/4 w-1/2 h-1/2 bg-gradient-to-b from-primary-gold/5 to-transparent blur-3xl -z-10" />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-none">
                        THE <span className="text-gradient-gold">STORY</span>
                    </h2>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto font-light">
                        From an idea on X to $LILTURTLE on pump.fun. One small step at a time.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-green/40 via-primary-gold/40 to-transparent md:-translate-x-1/2" />

                    <div className="space-y-12">
                        {milestones.map((m, i) => (
                            <motion.div
                                key={m.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                                className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-12 items-center"
                            >
                                {/* Node dot */}
                                <span
                                    className={`absolute left-4 md:left-1/2 top-1 w-4 h-4 rounded-full border-2 -translate-x-1/2 ${
                                        i % 2 === 0
                                            ? "bg-primary-green border-primary-green glow-green"
                                            : "bg-primary-gold border-primary-gold glow-gold"
                                    }`}
                                />

                                <div
                                    className={`glass-card p-6 rounded-2xl border-l-4 ${
                                        i % 2 === 0 ? "border-primary-green" : "border-primary-gold"
                                    } md:col-span-1 ${
                                        i % 2 === 0
                                            ? "md:mr-auto md:text-right"
                                            : "md:col-start-2 md:ml-auto"
                                    }`}
                                >
                                    <span
                                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-3 ${
                                            i % 2 === 0
                                                ? "bg-primary-green/10 text-primary-green"
                                                : "bg-primary-gold/10 text-primary-gold"
                                        }`}
                                    >
                                        {m.date}
                                    </span>
                                    <h3 className="text-2xl font-black text-white mb-2">{m.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{m.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center mt-16"
                >
                    <a
                        href="https://x.com/lilturtlenft"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 glass-card text-white font-bold rounded-xl hover:border-primary-gold hover:text-primary-gold transition-all duration-300"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        FOLLOW THE STORY ON X
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
