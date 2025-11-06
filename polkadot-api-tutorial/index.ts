
import { getWsProvider } from "polkadot-api/ws-provider"
import { createClient, type PolkadotClient } from "polkadot-api";

// Create and return a Polkadot client connected to the specified endpoint
export function makeClient(endpoint: string): PolkadotClient {
    console.log(`Connecting to endpoint: ${endpoint}`);
    
    // Initialize WebSocket provider
    const provider = getWsProvider(endpoint);

    // Create Polkadot client using the provider
    const client = createClient(provider);

    // Return the created client
    return client;
}

// Example function to fetch and print chain information
async function printChainInfo(client: PolkadotClient) {
    const chainSpec = await client.getChainSpecData();
    const finalizedBlock = await client.getFinalizedBlock();

    console.log(`Chain Name: ${chainSpec.name}`);
    console.log(`Finalized Block Number: ${finalizedBlock.number}`);
}

// Main function to demonstrate client creation
async function main() {
    // polkadot mainnet endpoint
    const endpoint = "wss://rpc.polkadot.io";
    
    // Create Polkadot client
    const polkadotClient = makeClient(endpoint);

    // Print chain information
    await printChainInfo(polkadotClient);

    console.log("Done");

    process.exit(0);
}

// Execute the main function
main();
