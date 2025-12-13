const fs = require('fs');
const path = require('path');

const generatedPath = path.join(process.cwd(), 'data', 'nfts2me-generated-mapping.json');
const mainPath = path.join(process.cwd(), 'data', 'nft-mint-mapping.json');

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8')) || {};
  } catch (e) {
    return {};
  }
}

function writeJson(file, obj) {
  fs.writeFileSync(file, JSON.stringify(obj, null, 2));
}

function merge() {
  if (!fs.existsSync(generatedPath)) {
    console.error('Generated mapping not found:', generatedPath);
    process.exit(1);
  }
  const gen = readJson(generatedPath);
  const main = readJson(mainPath);
  let changed = false;
  for (const k of Object.keys(gen)) {
    if (!main[k]) {
      main[k] = gen[k];
      changed = true;
    }
  }
  if (changed) {
    writeJson(mainPath, main);
    console.log('Merged', Object.keys(gen).length, 'entries into', mainPath);
  } else {
    console.log('No new entries to merge');
  }
}

if (require.main === module) merge();
