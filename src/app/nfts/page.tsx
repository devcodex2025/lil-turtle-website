import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NFTGalleryClient from "@/components/NFTGalleryClient";

export const metadata: Metadata = {
    title: "NFT Gallery - Lil Turtle | Abstract Turtle NFT Collection",
    description: "Explore the exclusive Abstract Lil Turtle NFT collection on Solana. Unique hand-crafted digital art featuring Mini and Crown collections. Premium memecoin NFTs.",
    keywords: ["Lil Turtle NFT", "Abstract Turtle NFT", "Solana NFT", "memecoin NFT", "digital collectibles", "crypto art", "NFT collection"],
    openGraph: {
        title: "NFT Gallery - Lil Turtle Collection",
        description: "Explore exclusive Abstract Lil Turtle NFTs. Unique digital collectibles on Solana blockchain.",
        images: ["/nfts/mini/1.webp"],
    },
};

// Collection Data
const collections = [
    {
        name: "Abstract Lil Turtle Mini",
        cid: "bafybeigu2jy6e33ellha43tbpzhhbucvvnkevgxoht6f7biygjoipz53mm",
        size: 24,
        ext: "webp",
        prefix: "Mini"
    },
    {
        name: "Abstract Lil Turtle Crown",
        cid: "bafybeieebib47wlpeqktbug47hemiudjrdt4uxt4yo45jxfzt4lslbdpby",
        size: 16,
        ext: "webp",
        prefix: "Crown"
    }
];

// Generate full list of NFTs on server
const allNFTs = collections.flatMap(col =>
    Array.from({ length: col.size }).map((_, i) => ({
        id: `${col.prefix}-${i + 1}`,
        title: `${col.name} #${i + 1}`,
        // Using local images
        image: `/nfts/${col.name.toLowerCase().includes('crown') ? 'crown' : 'mini'}/${i + 1}.${col.ext}`,
        collection: col.name,
        rarity: i < 5 ? "Legendary" : i < 10 ? "Rare" : "Common",
    }))
);

export default function NFTGallery() {
    return (
        <main className="min-h-screen bg-bg-dark">
            <Navbar />

            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
                            NFT <span className="text-gradient-gold">GALLERY</span>
                        </h1>
                        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                            Explore the exclusive collection of Abstract Lil Turtles.
                            Real items from the blockchain.
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {['All', 'Mini Collection', 'Crown Collection'].map((filter, i) => (
                            <button
                                key={filter}
                                className={`px-6 py-2 rounded-full border ${i === 0
                                    ? 'bg-primary-green text-black border-primary-green'
                                    : 'border-white/10 text-gray-400 hover:border-primary-green hover:text-white'
                                    } transition-all font-bold`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Grid - Client Component */}
                    <NFTGalleryClient nfts={allNFTs} />
                </div>
            </section>

            <Footer />
        </main>
    );
}
