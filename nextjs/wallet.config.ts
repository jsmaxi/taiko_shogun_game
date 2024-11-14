import * as chains from "viem/chains";

export type WalletConfig = {
  targetNetworks: readonly chains.Chain[];
  walletConnectProjectId: string;
  onlyLocalBurnerWallet: boolean;
};

const walletConfig = {
  // The networks on which the DApp is live
  targetNetworks: [chains.sepolia],

  // This is ours WalletConnect's default project ID.
  // You can get your own at https://cloud.walletconnect.com
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "",

  // Only show the Burner Wallet when running on local network
  onlyLocalBurnerWallet: true,
} as const satisfies WalletConfig;

export default walletConfig;
