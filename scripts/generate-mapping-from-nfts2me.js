const fs = require('fs');
const path = require('path');
const fetch = global.fetch || require('node-fetch');

async function fetchPage(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'mapping-script' } });
  return await res.text();
}

// Look for abscan or magiceden links with contract addresses
function extractContract(html) {
  const ab = html.match(/abscan\.org\/address\/(0x[0-9a-fA-F]{40})/);
  if (ab) return ab[1];
  const me = html.match(/magiceden\.io\/collections\/[\w-]+\/(0x[0-9a-fA-F]{40})/);
  if (me) return me[1];
  const op = html.match(/opensea\.io\/collection\/[\w-]+/);
  // opensea link doesn't include contract in this page, prefer other patterns
  return null;
}

function extractSupply(html) {
  // Look for patterns like "8 / 24" or "8/24"
  const match = html.match(/(\d+)\s*\/\s*(\d+)/);
  if (match) return parseInt(match[2], 10);

  // Look for "ITEMS" label: ITEMS 24
  const items = html.match(/ITEMS\s*(\d{1,5})/i);
  if (items) return parseInt(items[1], 10);

  // Some pages show "Total supply: 24" or "Total Supply: 24"
  const total = html.match(/Total(?:\s|-)Supply:\s*(\d{1,5})/i);
  if (total) return parseInt(total[1], 10);

  // As a fallback, count the maximum token number from all hashes like "#<number>"
  const tokenIds = Array.from(html.matchAll(/#(\d{1,6})/g)).map(m => parseInt(m[1], 10));
  if (tokenIds.length > 0) {
    return Math.max(...tokenIds);
  }

  return null;
}

async function main() {
  const collectionsFile = path.join(process.cwd(), 'src', 'components', 'NFTCollections.tsx');
  const content = fs.readFileSync(collectionsFile, 'utf-8');
  const links = Array.from(content.matchAll(/link:\s*"(https?:\/\/[^"\n]+)"/g)).map(m => m[1]);
  const mapping = {};

  for (const link of links) {
    try {
  
    // parse the collections array to get supply for each link reliably
    function parseCollectionsSupplies(content) {
      const ret = {};
      const arrMatch = content.match(/const\s+collections\s*=\s*\[([\s\S]*?)\];/);
      if (!arrMatch) return ret;
      const arrContent = arrMatch[1];
      const objRegex = /\{[\s\S]*?\}/g;
      const objs = Array.from(arrContent.matchAll(objRegex)).map(m => m[0]);
      for (const obj of objs) {
        const linkMatch = obj.match(/link:\s*"(https?:\/\/[^"\n]+)"/);
        const supplyMatch = obj.match(/supply:\s*(\d+)/);
        if (linkMatch) ret[linkMatch[1]] = supplyMatch ? parseInt(supplyMatch[1], 10) : null;
      }
      return ret;
    }
    const supplyMap = parseCollectionsSupplies(content);
      console.log('Fetching', link);
      const html = await fetchPage(link);
      // Derive a prefix from the link (e.g., abstract-lil-turtle-mini -> Mini)
      const nameMatch = link.match(/https?:\/\/([^.]+)\.nfts2\.me/);
      const prefix = nameMatch ? (nameMatch[1].includes('crown') ? 'Crown' : 'Mini') : 'Mini';
      // debug: write to tmp file
      fs.mkdirSync(path.join(process.cwd(), 'tmp'), { recursive: true });
      fs.writeFileSync(path.join(process.cwd(), 'tmp', `${prefix}.html`), html, { encoding: 'utf8' });
      const contract = extractContract(html);
      const extracted = extractSupply(html);
      // Robustly locate supply by finding the link and searching nearby for a supply property
      const idx = content.indexOf(link);
      let supplyLocal = null;
      if (idx !== -1) {
        const windowSnippet = content.slice(Math.max(0, idx - 200), idx + 400);
        const nearby = windowSnippet.match(/supply:\s*(\d+)/);
        if (nearby) supplyLocal = parseInt(nearby[1], 10);
        else console.log('  snippet around link:', windowSnippet);
      }
      console.log('  extracted supply from page:', extracted);
      console.log('  supply from file match:', supplyLocal);
      // derive supply from the collections file where possible (supplyMap takes precedence)
      const supply = (supplyMap[link] || supplyLocal) || extracted || 24;
      console.log('  contract:', contract, 'supply:', supply);
        const supplyFromFile = supplyMap[link] || null;
      const ids = Array.from(html.matchAll(/#(\d{1,6})/g)).map(m => parseInt(m[1], 10));
      console.log('  token ids found:', ids.slice(0, 12).join(', '), '... (total', ids.length, ')');

      if (contract) {
        for (let i = 1; i <= supply; i++) {
          mapping[`${prefix}-${i}`] = { chain: 'abstract', contract, tokenId: i };
        }
      } else {
        console.warn('No contract found for', link);
      }
    } catch (err) {
      console.error('Failed for', link, err);
    }
  }

  const out = path.join(process.cwd(), 'data', 'nfts2me-generated-mapping.json');
  fs.writeFileSync(out, JSON.stringify(mapping, null, 2));
  console.log('Wrote mapping to', out);
}

if (require.main === module) main();
