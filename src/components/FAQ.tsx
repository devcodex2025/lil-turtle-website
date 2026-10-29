"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ_ITEMS } from "@/app/buy/faqData";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="pb-16 md:pb-24 px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-black text-white mb-10 text-center"
                >
                    FAQ - <span className="text-primary-green">FREQUENTLY ASKED QUESTIONS</span>
                </motion.h2>

                <div className="space-y-4">
                    {FAQ_ITEMS.map((item, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <motion.div
                                key={item.question}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5, delay: i * 0.06 }}
                                className="glass-card rounded-2xl overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
                                    className="w-full flex items-center justify-between gap-4 text-left px-6 md:px-8 py-5 md:py-6 group"
                                    aria-expanded={isOpen}
                                >
                                    <span className={`text-base md:text-lg font-bold transition-colors ${isOpen ? "text-primary-green" : "text-white group-hover:text-primary-green"}`}>
                                        {item.question}
                                    </span>
                                    <span
                                        className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-lg font-black transition-all duration-300 ${isOpen ? "border-primary-green text-primary-green rotate-45" : "border-white/20 text-white group-hover:border-primary-green group-hover:text-primary-green"}`}
                                    >
                                        +
                                    </span>
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 md:px-8 pb-6 -mt-1">
                                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                                    {item.answer}
                                                </p>
                                                {item.linkHref && (
                                                    <a
                                                        href={item.linkHref}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 mt-4 text-primary-green text-sm font-bold hover:text-white transition-colors"
                                                    >
                                                        {item.linkLabel}
                                                        <span aria-hidden="true">→</span>
                                                    </a>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
