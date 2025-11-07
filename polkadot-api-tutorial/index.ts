import process from "node:process";
import { getWsProvider } from "polkadot-api/ws-provider/web";
import {
  createClient,
  type PolkadotClient,
  type SS58String,
} from "polkadot-api";
import { dot } from "@polkadot-api/descriptors";

// This function creates and returns a PolkadotClient connected to the given endpoint.
function makeClient(endpoint: string): PolkadotClient {
    // Log the endpoint we are connecting to
    console.log(`Connecting to endpoint: ${endpoint}`);
    
    // Create a WebSocket provider for the given endpoint
    const provider = getWsProvider(endpoint);

    // Create a PolkadotClient using the provider
    const client = createClient(provider);

    // Return the created client
    return client;
}

// This function is provided for demonstration purposes.
// It fetches and prints the chain name and the latest finalized block number.
async function printChainInfo(client: PolkadotClient) {
    // Fetch chain specification data
    const chain = await client.getChainSpecData();
    
    // Fetch the latest finalized block
    const finalizedBlock = await client.getFinalizedBlock();
    
    // Print the chain name and finalized block number
    console.log(
        `Connected to ${chain.name} at block ${finalizedBlock.number}.\n`,
    );
}

// This function fetches the balance of a given address.
async function getBalance(
  polkadotClient: PolkadotClient,
  address: SS58String,
  is_debug = true,
): Promise<BigInt> {
    // Get the typed API for the Polkadot descriptor
    const dotApi = polkadotClient.getTypedApi(dot);

    // Fetch the account information for the given address
    const accountInfo = await dotApi.query.System.Account.getValue(address);
    
    // Extract free and reserved balances
    const { free, reserved } = accountInfo.data;

    // Log the account data for debugging purposes
    if (is_debug) {
        console.log(`Account data for ${address}:`, accountInfo.data);
    }

    // Return the total balance (free + reserved)
    return free + reserved;
}

// Main execution function
async function main() {
    // Create a Polkadot client connected to the public Polkadot endpoint
    const polkadotClient = makeClient("wss://rpc.polkadot.io");

    // Print chain information
    await printChainInfo(polkadotClient);

    // Create a new constant `address`
    const address: SS58String = "15DCZocYEM2ThYCAj22QE4QENRvUNVrDtoLBVbCm5x4EQncr";
    
    // Call `getBalance` and await the result
    const balance = await getBalance(polkadotClient, address);
    
    // Print a friendly message with the address and balance
    console.log(`The balance of address ${address} is ${balance} Plancks.`);

    console.log(`Done!`);
    
    process.exit(0);
}

main();