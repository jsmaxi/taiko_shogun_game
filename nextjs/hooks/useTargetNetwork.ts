import { useEffect, useMemo } from "react";
import { useAccount } from "wagmi";
import walletConfig from "../wallet.config";
import { useGlobalState } from "../services/store/store";
import { ChainWithAttributes } from "../utils/networks";

/**
 * Retrieves the connected wallet's network from walletConfig.config or defaults to the 0th network in the list if the wallet is not connected.
 */
export function useTargetNetwork(): { targetNetwork: ChainWithAttributes } {
  const { chain } = useAccount();
  const targetNetwork = useGlobalState(({ targetNetwork }) => targetNetwork);
  const setTargetNetwork = useGlobalState(({ setTargetNetwork }) => setTargetNetwork);

  useEffect(() => {
    const newSelectedNetwork = walletConfig.targetNetworks.find(targetNetwork => targetNetwork.id === chain?.id);
    if (newSelectedNetwork && newSelectedNetwork.id !== targetNetwork.id) {
      setTargetNetwork(newSelectedNetwork);
    }
  }, [chain?.id, setTargetNetwork, targetNetwork.id]);

  return useMemo(
    () => ({
      targetNetwork: {
        ...targetNetwork,
      },
    }),
    [targetNetwork],
  );
}
