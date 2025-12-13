import fs from 'fs';
import path from 'path';
import { Connection, PublicKey } from '@solana/web3.js';

const TOKEN_MINTS_FILE = path.join(process.cwd(), 'data', 'nft-mint-mapping.json');
const CACHE_DURATION = 60 * 1000; // 60 seconds
let nftStatusCache: Record<string, { sold: boolean; timestamp: number }> = {};
// Keep track of endpoints we've warned about to avoid log spam during builds
const rpcWarnedMap: Record<string, boolean> = {};

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
            // No mapping — small pragmatic fallback: mark first few demo ids as sold,
            // otherwise leave unchecked so we don't accidentally mark as available
            const parts = id.split('-');
            const num = parseInt(parts[1] || '0', 10);
            if (num <= 3) {
                results[id] = true;
                nftStatusCache[id] = { sold: true, timestamp: Date.now() };
            }
            continue;
        }

        checks.push((async () => {
            try {
                // mapping value can be either a Solana mint string or an object describing the chain
                if (typeof mint === 'string') {
                    const pub = new PublicKey(mint);
                    try {
                        const supply = await conn.getTokenSupply(pub);
                        const amountStr = supply?.value?.amount ?? '0';
                        const amount = BigInt(amountStr || '0');
                        const sold = amount > BigInt(0);
                        if (sold) {
                            results[id] = true;
                            nftStatusCache[id] = { sold: true, timestamp: Date.now() };
                        }
                    } catch (err) {
                        if (!rpcWarnedMap['solana']) {
                            console.warn('Solana getTokenSupply failed', ((err as any)?.message || String(err)));
                            rpcWarnedMap['solana'] = true;
                        }
                    }
                    return;
                }

                // Expect object mapping for EVM chains
                const mapObj = mint as any;
                if (mapObj.chain && mapObj.chain === 'abstract') {
                    const contract = mapObj.contract;
                    const tokenId = mapObj.tokenId || mapObj.index;
                    if (!contract || tokenId === undefined) {
                        // Mapping malformed — leave unchecked so the client can retry
                        if (!rpcWarnedMap['malformed-mapping']) {
                            console.warn('Malformed mapping for', id, 'contract/tokenId missing');
                            rpcWarnedMap['malformed-mapping'] = true;
                        }
                        return;
                    }

                    // Pick RPC for chain: only Abstract (user-provided or main API)
                    const rpc = process.env.NEXT_PUBLIC_ABSTRACT_RPC_URL || 'https://api.mainnet.abs.xyz';
                    const candidates: string[] = [rpc];

                    // ownerOf selector and tokenId encode
                    const selector = '0x6352211e'; // ownerOf(uint256)
                    const bn = BigInt(tokenId);
                    const hex = bn.toString(16).padStart(64, '0');
                    const data = selector + hex;
                    try {
                        // Helper: try endpoints until we get JSON response
                        const tryRpcFetch = async (endpoints: string[], requestBody: any) => {
                            for (const e of endpoints) {
                                try {
                                    const r = await fetch(e, { method: 'POST', body: JSON.stringify(requestBody), headers: { 'Content-Type': 'application/json' } });
                                    const txt = await r.text();
                                    try {
                                        const parsed = JSON.parse(txt);
                                        return { parsed, endpoint: e };
                                    } catch (err) {
                                        // Response not JSON — continue to next candidate; warn once per endpoint
                                        if (!rpcWarnedMap[e]) {
                                            console.warn('eth_call returned non-json response', e, txt?.slice?.(0,160));
                                            rpcWarnedMap[e] = true;
                                        }
                                        continue;
                                    }
                                } catch (err) {
                                    if (!rpcWarnedMap[e]) {
                                        console.warn('rpc endpoint fetch failed', e, ((err as any)?.message || String(err)));
                                        rpcWarnedMap[e] = true;
                                    }
                                    continue;
                                }
                            }
                            return { parsed: null, endpoint: null };
                        };
                        const body = {
                            jsonrpc: '2.0',
                            id: 1,
                            method: 'eth_call',
                            params: [
                                { to: contract, data },
                                'latest',
                            ],
                        };
                        const { parsed: json } = await tryRpcFetch(candidates, body) as any;
                        // If we failed to parse any RPC response (json === null), skip marking status so client can retry
                        if (!json) {
                            if (!rpcWarnedMap['no-abstract-rpc']) {
                                console.warn('No working Abstract RPC endpoint found; leave tokens unchecked. Set NEXT_PUBLIC_ABSTRACT_RPC_URL to a working endpoint.');
                                rpcWarnedMap['no-abstract-rpc'] = true;
                            }
                            return;
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
                                const { parsed: json2 } = await tryRpcFetch(candidates, body2) as any;
                                const res2 = json2?.result;
                                // If tokenURI returns something non-empty, assume token minted
                                if (res2 && res2 !== '0x') {
                                    sold = true;
                                }
                            } catch (err2) {
                                if (!rpcWarnedMap[contract]) {
                                    console.warn('tokenURI check failed for', contract, tokenId, ((err2 as any)?.message || String(err2)));
                                    rpcWarnedMap[contract] = true;
                                }
                            }
                        }

                        if (sold) {
                            results[id] = true;
                            nftStatusCache[id] = { sold: true, timestamp: Date.now() };
                        }
                        return;
                    } catch (err) {
                        if (!rpcWarnedMap[contract]) {
                            console.error('eth_call failed for', contract, tokenId, ((err as any)?.message || String(err)));
                            rpcWarnedMap[contract] = true;
                        }
                        // On RPC errors, leave token unchecked so client can retry
                        return;
                    }
                }
                // (No-op here; specific branches already wrote to results)
            } catch (err) {
                if (!rpcWarnedMap['supply-failed']) {
                    console.error('Failed to check token supply for', mint, ((err as any)?.message || String(err)));
                    rpcWarnedMap['supply-failed'] = true;
                }
                // On unexpected errors, leave unchecked so client can retry
            }
        })());
    }

    await Promise.all(checks);

    return results;
}
