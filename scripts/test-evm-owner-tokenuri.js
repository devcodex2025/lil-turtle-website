const fetch = global.fetch || require('node-fetch');
const rpcCandidates = [
  process.env.NEXT_PUBLIC_ABSTRACT_RPC_URL || 'https://api.mainnet.abs.xyz',
].filter(Boolean);

let rpc = rpcCandidates[0];
const contract = process.argv[2] || '0x65586ce5Cac4BBAB88dcE0B2D4F399c0E7B70C14';
const tokenId = process.argv[3] || '2';

async function ethCall(data) {
  const body = { jsonrpc: '2.0', id: 1, method: 'eth_call', params: [{ to: contract, data }, 'latest'] };
  for (const candidate of rpcCandidates) {
    try {
      const r = await fetch(candidate, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });
      const j = await r.json();
      // prefer successful responses that look like JSON-RPC
      if (j && (j.result !== undefined || j.error)) {
        rpc = candidate; // set working rpc for future calls
        return j?.result;
      }
    } catch (err) {
      // try next
    }
  }
  throw new Error('No working RPC candidate');
}

async function run() {
  try {
    const ownerSel = '0x6352211e';
    const hex = BigInt(tokenId).toString(16).padStart(64, '0');
    const ownerData = ownerSel + hex;
    const ownerRes = await ethCall(ownerData);
    console.log('ownerOf result:', ownerRes);
    if (ownerRes && ownerRes !== '0x0000000000000000000000000000000000000000') {
      console.log('Token appears owned');
      return;
    }
    const uriSel = '0xc87b56dd';
    const uriData = uriSel + hex;
    const uriRes = await ethCall(uriData);
    console.log('tokenURI result:', uriRes);
    if (uriRes && uriRes !== '0x') {
      console.log('tokenURI returned value — assume minted');
    } else {
      console.log('No owner and tokenURI empty — likely unminted or ownerless');
    }
  } catch (err) {
    console.error('Failed:', err);
  }
}

if (require.main === module) run();
