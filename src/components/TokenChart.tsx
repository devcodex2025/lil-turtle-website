import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { fetchChartData, ChartDataPoint } from "@/services/tokenData";

interface TokenChartProps {
    pairAddress?: string;
    currentPrice?: number;
    priceChange?: number;
}

type Timeframe = '1H' | '24H' | '7D' | '1M';

export default function TokenChart({ pairAddress, currentPrice, priceChange }: TokenChartProps) {
    const [timeframe, setTimeframe] = useState<Timeframe>('24H');
    const [data, setData] = useState<ChartDataPoint[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!pairAddress) return;

        const loadChart = async () => {
            setLoading(true);
            const points = await fetchChartData(pairAddress, timeframe);
            setData(points);
            setLoading(false);
        };

        loadChart();
        const interval = setInterval(loadChart, 60000); // Update every minute
        return () => clearInterval(interval);
    }, [pairAddress, timeframe]);

    // Calculate chart path
    const { pathD, minPrice, maxPrice } = useMemo(() => {
        if (data.length < 2) return { pathD: "", minPrice: 0, maxPrice: 0 };

        const prices = data.map(d => d.value);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const range = maxPrice - minPrice;

        // SVG dimensions: 800x200
        const width = 800;
        const height = 200;

        const points = data.map((d, i) => {
            const x = (i / (data.length - 1)) * width;
            // Normalize price to 0-1 range, then map to height (inverted because SVG y goes down)
            // Add some padding (10%) to top and bottom
            const normalizedPrice = (d.value - minPrice) / range;
            const y = height - (normalizedPrice * (height * 0.8) + (height * 0.1));
            return `${x},${y}`;
        });

        return {
            pathD: `M ${points.join(" L ")}`,
            minPrice,
            maxPrice
        };
    }, [data]);

    const formatPrice = (price: number) => {
        if (price < 0.0001) return `$${price.toFixed(8)}`;
        if (price < 0.01) return `$${price.toFixed(6)}`;
        return `$${price.toFixed(4)}`;
    };

    return (
        <div className="w-full h-[400px] glass-card rounded-3xl p-6 relative overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="text-gray-400 text-sm font-bold tracking-widest uppercase mb-1">Current Price</h3>
                    <div className="flex items-baseline gap-4">
                        <span className="text-5xl font-black text-white">
                            {currentPrice ? formatPrice(currentPrice) : "Loading..."}
                        </span>
                        {priceChange !== undefined && (
                            <span className={`font-bold text-lg ${priceChange >= 0 ? 'text-primary-green' : 'text-red-500'}`}>
                                {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}% (24h)
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex gap-2">
                    {(['1H', '24H', '7D', '1M'] as Timeframe[]).map((tf) => (
                        <button
                            key={tf}
                            onClick={() => setTimeframe(tf)}
                            className={`px-3 py-1 rounded-lg text-sm font-bold transition-colors ${timeframe === tf
                                    ? 'bg-primary-green text-black'
                                    : 'text-gray-500 hover:text-white'
                                }`}
                        >
                            {tf}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chart Area */}
            <div className="relative h-[250px] w-full">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 backdrop-blur-sm">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-green"></div>
                    </div>
                )}

                {/* Grid Lines (Dynamic) */}
                <div className="absolute inset-0 flex flex-col justify-between text-gray-700 text-xs pointer-events-none">
                    {[maxPrice, minPrice + (maxPrice - minPrice) * 0.66, minPrice + (maxPrice - minPrice) * 0.33, minPrice].map((price, i) => (
                        <div key={i} className="border-b border-white/5 w-full h-full relative last:border-0">
                            <span className="absolute -top-3 right-0">{price ? formatPrice(price) : ''}</span>
                        </div>
                    ))}
                </div>

                {/* SVG Chart */}
                {pathD && (
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
                            transition={{ duration: 0.5 }}
                        />

                        {/* Line */}
                        <motion.path
                            d={pathD}
                            fill="none"
                            stroke="#00ff9d"
                            strokeWidth="3"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                        />

                        {/* Glowing Dot at end */}
                        <motion.circle
                            cx="800"
                            cy={pathD.split(" ").pop()?.split(",")[1] || "0"} // Extract Y from last point
                            r="6"
                            fill="#00ff9d"
                            className="glow-green"
                            animate={{ r: [6, 8, 6], opacity: [1, 0.8, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </svg>
                )}
            </div>
        </div>
    );
}
