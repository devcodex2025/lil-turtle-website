const fetch = require('node-fetch'); // Ensure node-fetch is available

async function scanNFTs() {
    const rpc = 'https://api.mainnet.abs.xyz';

    const collections = [
        { name: 'Mini', contract: '0x65586ce5Cac4BBAB88dcE0B2D4F399c0E7B70C14', count: 24 },
        { name: 'Crown', contract: '0x065b311D3AF3Bad3044975F66cc39cBCFF82f2ff', count: 16 }
    ];

    const ownerOfSel = '0x6352211e';
    const hexId = (id) => BigInt(id).toString(16).padStart(64, '0');

    console.log(`Scanning via RPC: ${rpc}\n`);

    for (const col of collections) {
        console.log(`--- Collection: ${col.name} (${col.contract}) ---`);
        const results = [];

        // Batch requests manually or just sequential for simplicity in script
        for (let i = 1; i <= col.count; i++) {
            const data = ownerOfSel + hexId(i);
            const body = {
                jsonrpc: '2.0',
                id: i,
                method: 'eth_call',
                params: [{ to: col.contract, data }, 'latest'],
            };

            try {
                const resp = await fetch(rpc, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });
                const json = await resp.json();

                const isSold = json.result && json.result !== '0x' && !json.error;
                results.push({ id: i, sold: isSold, result: json.result || json.error?.message });

                // process.stdout.write(isSold ? 'X' : '.');
            } catch (err) {
                console.log(`Error scanning ${col.name} #${i}:`, err.message);
                results.push({ id: i, sold: false, error: err.message });
            }
        }

        console.log('\nResults:');
        const soldIds = results.filter(r => r.sold).map(r => r.id);
        const unsoldIds = results.filter(r => !r.sold).map(r => r.id);

        console.log(`SOLD (${soldIds.length}):`, soldIds.join(', '));
        console.log(`AVAILABLE (${unsoldIds.length}):`, unsoldIds.join(', '));
        console.log('-'.repeat(40));
    }
}

// Check for node-fetch or use global fetch if available (Node 18+)
if (typeof fetch === 'undefined') {
    // If running in environment without global fetch, this might fail unless we require it
    // But typically node 18+ has it.
}

scanNFTs();
