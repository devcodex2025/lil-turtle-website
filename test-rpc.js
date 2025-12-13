async function checkNFT() {
    const rpc = 'https://api.mainnet.abs.xyz';
    const contract = '0x65586ce5Cac4BBAB88dcE0B2D4F399c0E7B70C14'; // Mini

    // Selectors
    const nameSel = '0x06fdde03';
    const totalSupplySel = '0x18160ddd';
    const ownerOfSel = '0x6352211e';

    const hexId = (id) => BigInt(id).toString(16).padStart(64, '0');

    console.log('--- DIAGNOSTIC START ---');
    console.log('Contract:', contract);
    console.log('RPC:', rpc);

    // Helper to call
    const call = async (data, label) => {
        try {
            const body = {
                jsonrpc: '2.0',
                id: 1,
                method: 'eth_call',
                params: [{ to: contract, data }, 'latest'],
            };
            const resp = await fetch(rpc, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });
            const json = await resp.json();
            if (json.error) {
                console.log(`${label}: ERROR - ${json.error.message} (${json.error.data})`);
            } else {
                console.log(`${label}: SUCCESS - ${json.result}`);
                return json.result;
            }
        } catch (e) {
            console.log(`${label}: FETCH FAIL - ${e.message}`);
        }
    };

    // 1. Check Name
    await call(nameSel, 'name()');

    // 2. Check Total Supply
    const supplyHex = await call(totalSupplySel, 'totalSupply()');
    if (supplyHex) {
        console.log('>> Total Supply Dec:', BigInt(supplyHex).toString());
    }

    // 3. Check OwnerOf(0)
    await call(ownerOfSel + hexId(0), 'ownerOf(0)');

    // 4. Check OwnerOf(1)
    await call(ownerOfSel + hexId(1), 'ownerOf(1)');

    // 5. Check OwnerOf(2)
    await call(ownerOfSel + hexId(2), 'ownerOf(2)');
}

checkNFT();
