"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import useMinWidth from '../hooks/useMinWidth';

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

    const [communityCount, setCommunityCount] = useState<string>("16");

    useEffect(() => {
        // Fetch real twitter follower count
        fetch('/api/social/twitter')
            .then(res => res.json())
            .then(data => {
                if (data.followers) {
                    // Format: 1.2K, 10K, etc if needed, or just raw number
                    // Simple formatter:
                    const num = data.followers;
                    let formatted = num.toString();
                    if (num >= 1000000) formatted = (num / 1000000).toFixed(1) + 'M';
                    else if (num >= 1000) formatted = (num / 1000).toFixed(1) + 'K';

                    setCommunityCount(formatted);
                }
            })
            .catch(err => console.error('Social stats error:', err));
    }, []);

    const stats = [
        { value: "29%", label: "Turtle Power" },
        { value: "100X", label: "Meme Potential" },
        { value: communityCount, label: "Community" },
    ];

    // Force grid columns to bypass CSS pollution
    const [cols, setCols] = useState(3);

    const gte768 = useMinWidth(768);
    useEffect(() => {
        if (!gte768) setCols(1);
        else setCols(3);
    }, [gte768]);

    return (
        <section className="relative py-20 border-y border-white/5 bg-black/40 backdrop-blur-sm" ref={ref}>
            <div className="max-w-7xl mx-auto">
                <div
                    className="grid gap-8 divide-y md:divide-y-0 divide-white/10"
                    style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
                >
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
