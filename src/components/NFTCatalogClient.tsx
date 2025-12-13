"use client";

import { useState, useMemo } from "react";
import NFTGalleryClient from "./NFTGalleryClient";

interface NFT {
    id: string;
    title: string;
    image: string;
    collection: string;
    rarity: string;
    isSold?: boolean;
}

export default function NFTCatalogClient({ nfts }: { nfts: NFT[] }) {
    const [filter, setFilter] = useState<'All' | 'Mini' | 'Crown'>('All');
    const [sort, setSort] = useState<'default' | 'newest' | 'rarity' | 'alpha'>('default');

    const filtered = useMemo(() => {
        let result = [...nfts];
        if (filter === 'Mini') result = result.filter(n => n.collection.includes('Mini'));
        if (filter === 'Crown') result = result.filter(n => n.collection.includes('Crown'));

        switch (sort) {
            case 'newest':
                result.sort((a, b) => b.id.localeCompare(a.id));
                break;
            case 'rarity':
                const mapRank = (r: string) => (r === 'Legendary' ? 3 : r === 'Rare' ? 2 : 1);
                result.sort((a, b) => mapRank(b.rarity) - mapRank(a.rarity));
                break;
            case 'alpha':
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                result.sort((a, b) => a.id.localeCompare(b.id));
        }
        return result;
    }, [nfts, filter, sort]);

    return (
        <div>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
                <button
                    onClick={() => setFilter('All')}
                    className={`px-4 py-2 rounded-full font-bold ${filter === 'All' ? 'bg-primary-green text-black' : 'bg-white/5 text-white border border-white/10 hover:bg-primary-green hover:text-black'}`}
                >All</button>
                <button
                    onClick={() => setFilter('Mini')}
                    className={`px-4 py-2 rounded-full font-bold ${filter === 'Mini' ? 'bg-primary-green text-black' : 'bg-white/5 text-white border border-white/10 hover:bg-primary-green hover:text-black'}`}
                >Mini Collection</button>
                <button
                    onClick={() => setFilter('Crown')}
                    className={`px-4 py-2 rounded-full font-bold ${filter === 'Crown' ? 'bg-primary-green text-black' : 'bg-white/5 text-white border border-white/10 hover:bg-primary-green hover:text-black'}`}
                >Crown Collection</button>
            </div>

            <div className="flex items-center justify-center gap-4 mb-8">
                <label className="text-sm text-gray-400">Sort:</label>
                <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="bg-white/5 rounded px-3 py-2 text-white">
                    <option value="default">Default</option>
                    <option value="newest">Newest</option>
                    <option value="rarity">Rarity</option>
                    <option value="alpha">Alphabetical</option>
                </select>
            </div>

            <NFTGalleryClient nfts={filtered} />
        </div>
    );
}
