"use client";

import { contractAbi } from "./ABI";
import { resolveNetworkContract } from "./resolveNetworkContract";
import { Address } from "viem";
import { useReadContract, useAccount } from "wagmi";

export function contractReadFunction (abiFunction : string, functionArgs : any) {
  const { chain } = useAccount();

  const { isFetching, refetch, error } = useReadContract({
    address: resolveNetworkContract(chain?.id ?? -1) as Address,
    functionName: abiFunction,
    abi: contractAbi,
    args: functionArgs,
    chainId: chain?.id,
    query: {
      enabled: false,
      retry: false,
    },
  });

  return  { isFetching, refetch, error };
};
