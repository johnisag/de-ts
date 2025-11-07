import process from "node:process";
import { getWsProvider } from "polkadot-api/ws-provider/web";
import {
  createClient,
  type PolkadotClient,
  type SS58String,
  type TypedApi,
} from "polkadot-api";
import { dot, people, type People } from "@polkadot-api/descriptors";
import type { Type } from "typescript";

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

// Function to get the display name associated with an address from the People descriptor
async function getDisplayName(
  peopleClient: PolkadotClient,
  address: SS58String,
  is_debug = true,
): Promise<string | undefined> {
    // Get the typed API for the People descriptor
    const peopleApi: TypedApi<People> = peopleClient.getTypedApi(people);

    // Fetch the account information for the given address
    const accountInfo: any = await peopleApi.query.Identity.IdentityOf.getValue(address);

    // Log the account data for debugging purposes
    if (is_debug) {
        console.log(`Identity data for ${address}:`, accountInfo);
    }

    // Extract the display name
    const displayName: string | undefined = accountInfo?.info.display.value?.asText();

    // Return the display name
    return displayName;
};

// Main execution function
async function main() {
    // Create a Polkadot client connected to the public Polkadot endpoint
    const polkadotClient: PolkadotClient = makeClient("wss://rpc.polkadot.io");

    // Create a People client connected to the public People endpoint
    const peopleClient: PolkadotClient = makeClient("wss://polkadot-people-rpc.polkadot.io");

    // Print chain information
    await printChainInfo(polkadotClient);

    // Create a new constant `address`
    const address: SS58String = "15DCZocYEM2ThYCAj22QE4QENRvUNVrDtoLBVbCm5x4EQncr";
    
    // Call `getBalance` and await the result
    const balance: BigInt = await getBalance(polkadotClient, address);
    
    // Print a friendly message with the address and balance
    console.log(`The balance of address ${address} is ${balance} Plancks.`);

    // Call `getDisplayName` and await the result 
    const displayName: string | undefined = await getDisplayName(peopleClient, address);

    // Print the display name if it exists
    if (displayName) {
      console.log(`The display name for address ${address} is ${displayName}.`);
    } else {
      console.log(`No display name found for address ${address}.`);
    }

    console.log(`Done!`);
    
    process.exit(0);
}

main();