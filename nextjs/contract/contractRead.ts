"use client";

import { contractAddress, contractAbi } from "./ABI";
import { Address } from "viem";
import { useReadContract } from "wagmi";
import { useTargetNetwork } from "../hooks/useTargetNetwork";

export function contractReadFunction (abiFunction : string, functionArgs : any) {
  const { targetNetwork } = useTargetNetwork();
  
  const { isFetching, refetch, error } = useReadContract({
    address: contractAddress as Address,
    functionName: abiFunction,
    abi: contractAbi,
    args: functionArgs,
    chainId: targetNetwork.id,
    query: {
      enabled: false,
      retry: false,
    },
  });

  return  { isFetching, refetch, error };
};
