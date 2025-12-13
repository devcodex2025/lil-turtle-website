import { NextResponse } from 'next/server';
import { getNftStatuses } from '@/lib/nft-status';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const collection = url.searchParams.get('collection') || 'Mini';
    const idsParam = url.searchParams.get('ids');
    const ids = idsParam ? idsParam.split(',').map(s => s.trim()) : null;

    // Determine max ID if no IDs provided
    const max = collection.toLowerCase().includes('crown') ? 16 : 24;
    const requestIds = ids || Array.from({ length: max }).map((_, i) => `${collection}-${i + 1}`);

    const results = await getNftStatuses(collection, requestIds);

    return NextResponse.json({ status: 'ok', results });
}
