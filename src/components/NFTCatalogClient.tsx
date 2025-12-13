"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import NFTGalleryClient from "./NFTGalleryClient";

interface NFT {
    id: string;
    title: string;
    image: string;
    collection: string;
    rarity: string;
    isSold?: boolean;
    isSoldChecked?: boolean;
}

export default function NFTCatalogClient({ nfts }: { nfts: NFT[] }) {
    const router = useRouter();

    const searchParams = useSearchParams();

    // Initialize state with default values to avoid hydration mismatch
    // Then sync with URL params in useEffect
    const [filter, setFilter] = useState<'All' | 'Mini' | 'Crown'>('All');
    const [sort, setSort] = useState<'default' | 'newest' | 'rarity' | 'alpha'>('default');

    useEffect(() => {
        if (!searchParams) return;
        const f = searchParams.get('filter');
        if (f && (f === 'All' || f === 'Mini' || f === 'Crown')) setFilter(f);

        const s = searchParams.get('sort');
        if (s && (s === 'default' || s === 'newest' || s === 'rarity' || s === 'alpha')) setSort(s);
    }, [searchParams]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (filter !== 'All') params.set('filter', filter);
        else params.delete('filter');

        if (sort !== 'default') params.set('sort', sort);
        else params.delete('sort');

        const newUrl = `${window.location.pathname}?${params.toString()}`;
        router.replace(newUrl, { scroll: false });
    }, [filter, sort, router]);

    const [items, setItems] = useState<NFT[]>(() => nfts.map(n => ({ ...n, isSold: n.isSold ?? false, isSoldChecked: n.isSoldChecked ?? false })));

    const filtered = useMemo(() => {
        let result = [...items];
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
    }, [items, filter, sort]);

    // Fetch on-chain sold status for visible NFTs
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                // Skip fetching if all filtered items were already checked server-side
                const needCheck = filtered.some(f => !f.isSoldChecked);
                if (!needCheck) return;
                const ids = filtered.map(f => f.id).join(',');
                if (!ids) return;
                // derive collection from first id (Mini-1, Crown-1)
                const col = filtered[0]?.id?.split('-')[0] || 'Mini';
                const res = await fetch(`/api/nfts/status?collection=${encodeURIComponent(col)}&ids=${encodeURIComponent(ids)}`);
                if (!res.ok) return;
                const json = await res.json();
                const results: Record<string, boolean> = json.results || {};
                if (cancelled) return;
                setItems(prev => prev.map(it => ({ ...it, isSold: results[it.id] ?? it.isSold, isSoldChecked: (results[it.id] !== undefined) || it.isSoldChecked })));
            } catch {
                // ignore fetch errors — keep demo values
            }
        })();
        return () => { cancelled = true; };
    }, [filtered]);

    return (
        <div>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
                <button
                    onClick={() => setFilter('All')}
                    aria-label="All collections"
                    aria-pressed={filter === 'All'}
                    className={`px-4 py-2 rounded-full font-bold ${filter === 'All' ? 'bg-primary-green text-black' : 'bg-white/5 text-white border border-white/10 hover:bg-primary-green hover:text-black'}`}
                >All</button>
                <button
                    onClick={() => setFilter('Mini')}
                    aria-label="Mini collection"
                    aria-pressed={filter === 'Mini'}
                    className={`px-4 py-2 rounded-full font-bold ${filter === 'Mini' ? 'bg-primary-green text-black' : 'bg-white/5 text-white border border-white/10 hover:bg-primary-green hover:text-black'}`}
                >Mini Collection</button>
                <button
                    onClick={() => setFilter('Crown')}
                    aria-label="Crown collection"
                    aria-pressed={filter === 'Crown'}
                    className={`px-4 py-2 rounded-full font-bold ${filter === 'Crown' ? 'bg-primary-green text-black' : 'bg-white/5 text-white border border-white/10 hover:bg-primary-green hover:text-black'}`}
                >Crown Collection</button>
            </div>

            <div className="flex items-center justify-center gap-4 mb-8">
                <label className="text-sm text-gray-400">Sort:</label>
                <select
                    aria-label="Sort items"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as 'default' | 'newest' | 'rarity' | 'alpha')}
                    className="bg-black/80 backdrop-blur text-white border border-white/20 rounded px-4 py-2 appearance-none cursor-pointer hover:border-primary-green transition-colors focus:outline-none focus:ring-1 focus:ring-primary-green"
                    style={{ colorScheme: 'dark' }} // Force dark scrollbar/options in supported browsers
                >
                    <option value="default" className="bg-black text-white">Default</option>
                    <option value="newest" className="bg-black text-white">Newest</option>
                    <option value="rarity" className="bg-black text-white">Rarity</option>
                    <option value="alpha" className="bg-black text-white">Alphabetical</option>
                </select>
            </div>

            <NFTGalleryClient nfts={filtered} />
        </div>
    );
}
