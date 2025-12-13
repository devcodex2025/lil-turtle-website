# 🐢 Lil Turtle

**Premium Memecoin & NFT Collection on Solana**

![Lil Turtle Website Preview](public/github_preview/github-preview-website.gif)

## 🌟 About

Lil Turtle is not just a memecoin; it's a lifestyle. We combine high-end aesthetics with community-driven tokenomics.

- **Token**: `$LILTURTLE` on Solana.
- **Vibe**: Chill, steady, and stylish. "Small steps matter."
- **Website**: [lillturtle.fun](https://lillturtle.fun)

## 🎨 3D Character

Meet Lil Turtle – the most stylish token in your portfolio.

![Lil Turtle 3D](public/github_preview/github-preview%203d.gif)

## 💎 NFT Collections

Our exclusive NFT collections features unique, hand-crafted digital art pieces on the **Abstract** blockchain.

- **Mini Collection**: 24 unique abstract pieces.
- **Crown Collection**: 16 exclusive royal turtles.

[**Explore the Collections**](https://www.lilturtle.fun/nfts)

## ⚙️ Configuration for NFT sold checks

The app supports server-side checks to mark NFTs as sold by querying on-chain data. To enable EVM-compatible chain checks (Abstract, Ethereum, Polygon, etc.), set the following environment variables when running the app:

- `NEXT_PUBLIC_ABSTRACT_RPC_URL`: RPC URL for Abstract chain (recommended for these collections).
- `NEXT_PUBLIC_ETHEREUM_RPC_URL`: RPC URL for Ethereum mainnet (optional fallback).
- `NEXT_PUBLIC_RPC_URL`: Generic fallback RPC URL if chain-specific values aren't set.

Populate `data/nft-mint-mapping.json` with a mapping for your collections. Example entry:

```
{
	"Mini-1": { "chain": "abstract", "contract": "0x65586...", "tokenId": 1 }
}
```

If you prefer, a Solana mapping still works using the old format with a mint address string.

Detection details:
- The API checks for on-chain ownership for mapped tokens.
- For EVM-like chains (Abstract, Ethereum, Polygon, Optimism, Base), the server tries `ownerOf(tokenId)` via JSON-RPC to detect if a token is minted/owned.
- If `ownerOf` fails or returns a null address, the server will attempt `tokenURI(tokenId)` as a fallback — many contracts return a tokenURI only for minted tokens.
- If both checks fail, the token is treated as unsold/unminted.

Scripts:
- `scripts/generate-mapping-from-nfts2me.js`: Scrapes `NFTCollections` links and writes `data/nfts2me-generated-mapping.json`.
- `scripts/merge-generated-mapping.js`: Merges `data/nfts2me-generated-mapping.json` into `data/nft-mint-mapping.json` by adding missing entries.
- `scripts/test-evm-owner-tokenuri.js`: Local test runner that attempts ownerOf and tokenURI checks for a contract/token using provided or default RPC candidates.

Indexer support:
- If you provide an Alchemy API key in `NEXT_PUBLIC_ALCHEMY_API_KEY` (or `ALCHEMY_API_KEY`), the server will use Alchemy's `getOwnersForToken` endpoint as a final fallback to detect minted tokens on chains Alchemy supports (Ethereum, Polygon, Base, Optimism).

Quick commands:
```
node scripts/generate-mapping-from-nfts2me.js   # create data/nfts2me-generated-mapping.json
node scripts/merge-generated-mapping.js        # merge generated mapping into data/nft-mint-mapping.json
node scripts/test-evm-owner-tokenuri.js <contract> <tokenId>  # run ownerOf/tokenURI test
```
