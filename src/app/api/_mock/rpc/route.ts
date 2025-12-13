import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const params = body?.params?.[0] || {};
    const to = (params.to || '').toLowerCase();
    const data = (params.data || '').toLowerCase();

    // Mini contract
    const MINI = '0x65586ce5cac4bbab88dce0b2d4f399c0e7b70c14'.toLowerCase();

    // ownerOf selector 0x6352211e + tokenId padded
    if (body.method === 'eth_call' && to === MINI) {
      // Extract tokenId from data (last 32 bytes)
      const tokenHex = data.slice(-64);
      const tokenId = BigInt('0x' + tokenHex).toString();

      // For demo: treat token 10 as sold, others not
      if (tokenId === '10') {
        // return a non-zero owner address
        return NextResponse.json({ jsonrpc: '2.0', id: body.id || 1, result: '0x0000000000000000000000001111111111111111111111111111111111111111' });
      }

      return NextResponse.json({ jsonrpc: '2.0', id: body.id || 1, result: '0x' });
    }

    // Fallback: return empty result
    return NextResponse.json({ jsonrpc: '2.0', id: body.id || 1, result: null });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
