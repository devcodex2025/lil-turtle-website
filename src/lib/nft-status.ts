import fs from 'fs';
import path from 'path';
import { Connection, PublicKey } from '@solana/web3.js';

const TOKEN_MINTS_FILE = path.join(process.cwd(), 'data', 'nft-mint-mapping.json');
const CACHE_DURATION = 60 * 1000; // 60 seconds
let nftStatusCache: Record<string, { sold: boolean; timestamp: number }> = {};

export async function getNftStatuses(collection: string, requestIds: string[]) {
    // Load mapping from disk, if exists
    let mapping: Record<string, any> = {};
    try {
        const raw = fs.readFileSync(TOKEN_MINTS_FILE, 'utf-8');
        mapping = JSON.parse(raw) as Record<string, any>;
    } catch {
        // ignore — file may not exist or be empty
    }

    // Setup Solana connection
    const conn = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com', 'confirmed');

    const results: Record<string, boolean> = {};
    const checks: Array<Promise<void>> = [];

    for (const id of requestIds) {
        // Return cached value if still fresh
        const cached = nftStatusCache[id];
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            results[id] = cached.sold;
            continue;
        }
        const mint = mapping[id];
        if (!mint) {
            // No mapping — fallback: mark as sold if id number <= 3
            const parts = id.split('-');
            const num = parseInt(parts[1] || '0', 10);
            results[id] = num <= 3;
            continue;
        }

        checks.push((async () => {
            try {
                // mapping value can be either a Solana mint string or an object describing the chain
                if (typeof mint === 'string') {
                    const pub = new PublicKey(mint);
                    const supply = await conn.getTokenSupply(pub);
                    const amountStr = supply?.value?.amount ?? '0';
                    const amount = BigInt(amountStr || '0');
                    const sold = amount > BigInt(0);
                    results[id] = sold;
                    nftStatusCache[id] = { sold, timestamp: Date.now() };
                    return;
                }

                // Expect object mapping for EVM chains
                const mapObj = mint as any;
                if (mapObj.chain && (mapObj.chain === 'eth' || mapObj.chain === 'abstract' || mapObj.chain === 'polygon' || mapObj.chain === 'base' || mapObj.chain === 'op')) {
                    const contract = mapObj.contract;
                    const tokenId = mapObj.tokenId || mapObj.index;
                    if (!contract || tokenId === undefined) {
                        results[id] = false;
                        nftStatusCache[id] = { sold: false, timestamp: Date.now() };
                        return;
                    }

                    // Pick RPC for chain
                    const chain = mapObj.chain;
                    let rpc = process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL || process.env.NEXT_PUBLIC_RPC_URL;
                    if (chain === 'abstract') rpc = process.env.NEXT_PUBLIC_ABSTRACT_RPC_URL || rpc || 'https://rpc.abstract.xyz';
                    if (chain === 'polygon') rpc = process.env.NEXT_PUBLIC_POLYGON_RPC_URL || rpc;
                    if (chain === 'base') rpc = process.env.NEXT_PUBLIC_BASE_RPC_URL || rpc;
                    if (chain === 'op') rpc = process.env.NEXT_PUBLIC_OP_MAINNET_RPC_URL || rpc;
                    if (!rpc) rpc = 'https://cloudflare-eth.com';

                    // ownerOf selector and tokenId encode
                    const selector = '0x6352211e'; // ownerOf(uint256)
                    const bn = BigInt(tokenId);
                    const hex = bn.toString(16).padStart(64, '0');
                    const data = selector + hex;
                    try {
                        const body = {
                            jsonrpc: '2.0',
                            id: 1,
                            method: 'eth_call',
                            params: [
                                { to: contract, data },
                                'latest',
                            ],
                        };
                        const resp = await fetch(rpc, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });
                        const text = await resp.text();
                        let json: any = null;
                        let hasWarned = false;
                        try { json = JSON.parse(text); } catch (e) {
                            if (!hasWarned) {
                                console.warn('eth_call returned non-json response', rpc, text?.slice?.(0,160));
                                hasWarned = true;
                            }
                        }
                        const result = json?.result;
                        let sold = !!(result && result !== '0x' && result !== '0x0000000000000000000000000000000000000000000000000000000000000000');

                        // If ownerOf failed or returned zero address, try tokenURI (some contracts allow tokenURI only for minted tokens)
                        if (!sold) {
                            const tokenURISelector = '0xc87b56dd'; // tokenURI(uint256)
                            const tokenHex = BigInt(tokenId).toString(16).padStart(64, '0');
                            const tokenURIData = tokenURISelector + tokenHex;
                            try {
                                const body2 = {
                                    jsonrpc: '2.0',
                                    id: 1,
                                    method: 'eth_call',
                                    params: [
                                        { to: contract, data: tokenURIData },
                                        'latest',
                                    ],
                                };
                                const resp2 = await fetch(rpc, { method: 'POST', body: JSON.stringify(body2), headers: { 'Content-Type': 'application/json' } });
                                const text2 = await resp2.text();
                                let json2: any = null;
                                let hasWarned2 = false;
                                try { json2 = JSON.parse(text2); } catch (e) {
                                    if (!hasWarned2) {
                                        console.warn('tokenURI returned non-json response', rpc, text2?.slice?.(0,160));
                                        hasWarned2 = true;
                                    }
                                }
                                const res2 = json2?.result;
                                // If tokenURI returns something non-empty, assume token minted
                                if (res2 && res2 !== '0x') {
                                    sold = true;
                                }
                            } catch (err2) {
                                console.warn('tokenURI check failed for', contract, tokenId, err2);
                            }
                        }

                        results[id] = sold;
                        nftStatusCache[id] = { sold, timestamp: Date.now() };
                        // If still not sold and an Alchemy API key is provided, try Alchemy NFT API for owners
                        if (!sold) {
                            const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || process.env.ALCHEMY_API_KEY;
                            // Only attempt Alchemy for chains it supports
                            const alchemyChains = ['eth', 'polygon', 'base', 'op'];
                            if (alchemyKey && alchemyChains.includes(chain)) {
                                try {
                                    const network = chain === 'polygon' ? 'polygon-mainnet' : 'eth-mainnet';
                                    const endpoint = `https://eth-${network}.g.alchemy.com/nft/v2/${alchemyKey}/getOwnersForToken?contractAddress=${contract}&tokenId=${tokenId}`;
                                    const resp3 = await fetch(endpoint);
                                    const text3 = await resp3.text();
                                    let json3: any = null;
                                    let hasWarned3 = false;
                                    try { json3 = JSON.parse(text3); } catch (e) {
                                        if (!hasWarned3) {
                                            console.warn('Alchemy returned non-json response', endpoint, text3?.slice?.(0,160));
                                            hasWarned3 = true;
                                        }
                                    }
                                    const owners = json3?.owners || [];
                                    if (owners.length > 0) {
                                        results[id] = true;
                                        nftStatusCache[id] = { sold: true, timestamp: Date.now() };
                                        sold = true;
                                    }
                                } catch (err3) {
                                    console.warn('Alchemy fallback failed', err3);
                                }
                            }
                        }
                        return;
                    } catch (err) {
                        console.error('eth_call failed for', contract, tokenId, err);
                        results[id] = false;
                        nftStatusCache[id] = { sold: false, timestamp: Date.now() };
                        return;
                    }
                }
                // (No-op here; specific branches already wrote to results)
            } catch (err) {
                console.error('Failed to check token supply for', mint, err);
                // On error, set false (unsold)
                results[id] = false;
                nftStatusCache[id] = { sold: false, timestamp: Date.now() };
            }
        })());
    }

    await Promise.all(checks);

    return results;
}
