const fetch = global.fetch || require('node-fetch');
const endpoint = process.argv[2] || (process.env.NEXT_PUBLIC_ABSTRACT_RPC_URL || 'https://api.mainnet.abs.xyz');
const contract = process.argv[3] || '0x65586ce5Cac4BBAB88dcE0B2D4F399c0E7B70C14';
const tokenId = process.argv[4] || '1';
(async () => {
    const ownerSel = '0x6352211e';
    const hex = BigInt(tokenId).toString(16).padStart(64, '0');
    const data = ownerSel + hex;
    const body = { jsonrpc: '2.0', id: 1, method: 'eth_call', params: [{ to: contract, data }, 'latest'] };
    try {
        const r = await fetch(endpoint, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });
        const txt = await r.text();
        console.log('RAW RESPONSE:', txt.slice(0, 1000));
        try {
            console.log('PARSED', JSON.parse(txt));
        } catch (e) {
            console.log('PARSE_ERROR', e.message);
        }
    } catch (err) {
        console.error('fetch failed', err);
    }
})();
