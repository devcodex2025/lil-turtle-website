import { NextResponse } from 'next/server';
import { Connection, PublicKey } from '@solana/web3.js';

// Token address for LIL TURTLE
const TOKEN_MINT = '14XEVKV9LJJFWc7epbdd1W9E1a1JivB2st8sx4nCboop';

// Cache configuration
let cachedData: { holders: number; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export async function GET() {
    try {
        // Check if we have valid cached data
        if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
            return NextResponse.json({
                holders: cachedData.holders,
                cached: true,
                timestamp: cachedData.timestamp,
            });
        }

        // Connect to Solana mainnet
        const connection = new Connection(
            process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
            'confirmed'
        );

        // Get token mint public key
        const mintPublicKey = new PublicKey(TOKEN_MINT);

        // Get all token accounts for this mint
        const tokenAccounts = await connection.getProgramAccounts(
            new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'), // Token Program ID
            {
                filters: [
                    {
                        dataSize: 165, // Size of token account
                    },
                    {
                        memcmp: {
                            offset: 0, // Mint address offset
                            bytes: mintPublicKey.toBase58(),
                        },
                    },
                ],
            }
        );

        // Filter out accounts with zero balance
        const accountsWithBalance = tokenAccounts.filter((account) => {
            // Token amount is stored at offset 64 (8 bytes)
            const amount = account.account.data.readBigUInt64LE(64);
            return amount > BigInt(0);
        });

        const holderCount = accountsWithBalance.length;

        // Update cache
        cachedData = {
            holders: holderCount,
            timestamp: Date.now(),
        };

        return NextResponse.json({
            holders: holderCount,
            cached: false,
            timestamp: cachedData.timestamp,
        });
    } catch (error) {
        console.error('Error fetching holder count:', error);

        // Return cached data if available, even if expired
        if (cachedData) {
            return NextResponse.json({
                holders: cachedData.holders,
                cached: true,
                timestamp: cachedData.timestamp,
                error: 'Using cached data due to API error',
            });
        }

        // Fallback to a reasonable estimate if no cache
        return NextResponse.json({
            holders: 1000,
            cached: false,
            timestamp: Date.now(),
            error: 'Failed to fetch holder count, using fallback value',
        }, { status: 500 });
    }
}
