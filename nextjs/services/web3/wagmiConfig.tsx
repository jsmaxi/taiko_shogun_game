import { wagmiConnectors } from "./wagmiConnectors";
import { createClient, http } from "viem";
import { createConfig } from "wagmi";
import walletConfig from "../../wallet.config";

const { targetNetworks } = walletConfig;

export const wagmiConfig = createConfig({
  chains: targetNetworks,
  connectors: wagmiConnectors,
  ssr: true,
  client({ chain }) {
    return createClient({
      chain,
      transport: http(),
    });
  },
});
