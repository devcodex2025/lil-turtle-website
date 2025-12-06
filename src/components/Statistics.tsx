"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface StatItemProps {
    value: string;
    label: string;
    delay: number;
    isInView: boolean;
}

function StatItem({ value, label, delay, isInView }: StatItemProps) {
    const [count, setCount] = useState(0);
    const targetNumber = parseInt(value.replace(/\D/g, ""));
    const suffix = value.replace(/[0-9]/g, "");

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const duration = 2000;
        const increment = targetNumber / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= targetNumber) {
                setCount(targetNumber);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isInView, targetNumber]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay }}
            className="text-center p-8 border-r border-white/10 last:border-r-0"
        >
            <motion.div
                className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 mb-4"
            >
                {count}{suffix}
            </motion.div>
            <p className="text-primary-green text-xl font-bold tracking-widest uppercase">
                {label}
            </p>
        </motion.div>
    );
}

export default function Statistics() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const stats = [
        { value: "94%", label: "Turtle Power" },
        { value: "100X", label: "Meme Potential" },
        { value: "16", label: "Community" },
    ];

    return (
        <section className="relative py-20 border-y border-white/5 bg-black/40 backdrop-blur-sm" ref={ref}>
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 divide-y md:divide-y-0 divide-white/10">
                    {stats.map((stat, index) => (
                        <StatItem
                            key={stat.label}
                            value={stat.value}
                            label={stat.label}
                            delay={index * 0.2}
                            isInView={isInView}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
