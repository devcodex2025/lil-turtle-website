"use client";

import { motion } from "framer-motion";

export default function TokenChart() {
    // Simulated chart data points
    const points = [
        [0, 80], [10, 75], [20, 85], [30, 82], [40, 90],
        [50, 88], [60, 95], [70, 92], [80, 100], [90, 98], [100, 110]
    ];

    const pathD = `M ${points.map(p => `${p[0] * 8},${200 - p[1]}`).join(" L ")}`;

    return (
        <div className="w-full h-[400px] glass-card rounded-3xl p-6 relative overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="text-gray-400 text-sm font-bold tracking-widest uppercase mb-1">Current Price</h3>
                    <div className="flex items-baseline gap-4">
                        <span className="text-5xl font-black text-white">$0.000420</span>
                        <span className="text-primary-green font-bold text-lg">+12.5% (24h)</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    {['1H', '24H', '7D', '1M'].map((tf, i) => (
                        <button
                            key={tf}
                            className={`px-3 py-1 rounded-lg text-sm font-bold ${i === 1 ? 'bg-primary-green text-black' : 'text-gray-500 hover:text-white'}`}
                        >
                            {tf}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chart Area */}
            <div className="relative h-[250px] w-full">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between text-gray-700 text-xs">
                    {[0.000500, 0.000450, 0.000400, 0.000350].map(price => (
                        <div key={price} className="border-b border-white/5 w-full h-full relative">
                            <span className="absolute -top-3 right-0">{price}</span>
                        </div>
                    ))}
                </div>

                {/* SVG Chart */}
                <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#00ff9d" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#00ff9d" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Area Fill */}
                    <motion.path
                        d={`${pathD} L 800,200 L 0,200 Z`}
                        fill="url(#gradientArea)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    />

                    {/* Line */}
                    <motion.path
                        d={pathD}
                        fill="none"
                        stroke="#00ff9d"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />

                    {/* Glowing Dot at end */}
                    <motion.circle
                        cx="800"
                        cy="90"
                        r="6"
                        fill="#00ff9d"
                        className="glow-green"
                        animate={{ r: [6, 8, 6], opacity: [1, 0.8, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </svg>
            </div>
        </div>
    );
}
