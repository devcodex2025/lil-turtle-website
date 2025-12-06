import { Connection } from "@solana/web3.js";
import * as fs from "fs";
import * as path from "path";

// Manually parse .env to avoid dependency issues
let customRpc = "";
const envFiles = [".env", ".env.local"];

for (const file of envFiles) {
    const envPath = path.resolve(process.cwd(), file);
    if (fs.existsSync(envPath)) {
        console.log(`Found ${file} at: ${envPath}`);
        const buffer = fs.readFileSync(envPath);
        let envContent = "";

        // Check for UTF-16 LE BOM (FF FE)
        if (buffer.length >= 2 && buffer[0] === 0xFF && buffer[1] === 0xFE) {
            envContent = buffer.toString('utf16le');
        } else {
            envContent = buffer.toString('utf8');
            // Remove UTF-8 BOM if present
            if (envContent.charCodeAt(0) === 0xFEFF) {
                envContent = envContent.slice(1);
            }
        }

        const lines = envContent.split('\n');
        console.log(`Keys found in ${file}:`);
        for (const line of lines) {
            const parts = line.split('=');
            if (parts.length > 1) {
                const key = parts[0].trim();
                console.log(` - ${key}`);
                if (key === 'NEXT_PUBLIC_SOLANA_RPC_URL') {
                    customRpc = parts.slice(1).join('=').trim();
                    if (customRpc.startsWith('"') && customRpc.endsWith('"')) {
                        customRpc = customRpc.slice(1, -1);
                    }
                }
            }
        }
    }
}

if (!customRpc) console.log("Could not find NEXT_PUBLIC_SOLANA_RPC_URL in any .env file");

const publicRpc = "https://api.mainnet-beta.solana.com";

async function testRpc(url: string, name: string) {
    if (!url) {
        console.log(`[${name}] No URL provided.`);
        return;
    }

    console.log(`Testing ${name}: ${url}`);
    const connection = new Connection(url, "confirmed");
    const start = Date.now();

    try {
        const version = await connection.getVersion();
        const latency = Date.now() - start;
        console.log(`[${name}] Success! Version: ${version["solana-core"]}, Latency: ${latency}ms`);
    } catch (error: any) {
        console.error(`[${name}] Failed:`, error.message);
    }
}

async function runTests() {
    console.log("Starting RPC Connectivity Tests...\n");
    await testRpc(customRpc || "", "Custom RPC");
    await testRpc(publicRpc, "Public RPC");
    console.log("\nTests completed.");
}

runTests();
