import NFTCatalogClient from "./NFTCatalogClient";

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

export default async function NFTListContainer() {
    // Build NFTs list server-side and fetch on-chain sold status for each collection
    const allNFTS = collections.flatMap(col =>
        Array.from({ length: col.size }).map((_, i) => ({
            id: `${col.prefix}-${i + 1}`,
            title: `${col.name} #${i + 1}`,
            image: `/nfts/${col.name.toLowerCase().includes('crown') ? 'crown' : 'mini'}/${i + 1}.${col.ext}`,
            collection: col.name,
            rarity: i < 5 ? 'Legendary' : i < 10 ? 'Rare' : 'Common',
            isSold: undefined,
            isSoldChecked: false,
        }))
    );

    // Build mapping id -> index for easy updates
    const idIndexMap: Record<string, number> = {};
    allNFTS.forEach((item, idx) => (idIndexMap[item.id] = idx));

    // We no longer fetch statuses server-side to prevent blocking the UI.
    // The client component will fetch proper statuses.
    // This allows the page to load instantly.

    return <NFTCatalogClient nfts={allNFTS} />;
}
