
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

// Main function to demonstrate client creation
async function main() {
    // polkadot mainnet endpoint
    const endpoint = "wss://rpc.polkadot.io";
    
    // Create Polkadot client
    const polkadotClient = makeClient(endpoint);

    // Log the client object
    console.log({ polkadotClient });

    console.log("Done");

    process.exit(0);
}

// Execute the main function
main();
