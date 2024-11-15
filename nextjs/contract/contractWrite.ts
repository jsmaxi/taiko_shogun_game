"use client";

import { contractAddress, contractAbi } from "./ABI";
import { waitForTransactionReceipt } from "viem/actions";
import { useClient, useWriteContract } from "wagmi";
import { useTargetNetwork } from "../hooks/useTargetNetwork";
import { useState, useEffect } from "react";
import { Address } from "viem";

export function contractWriteFunction(abiFunction: string, functionArgs: any) {
  const [chain, setChain] = useState<number | undefined>(undefined);
  const { targetNetwork } = useTargetNetwork();
  const { data: result, isPending, writeContractAsync } = useWriteContract();
  const client = useClient();

  useEffect(() => {
    setChain(targetNetwork?.id);
  }, [targetNetwork]);

  const write = async () => {
    if (!writeContractAsync) {
      return { result: null, isPending, error: "Write contract not initialized!" };
    }

    try {
      const hash = await writeContractAsync({
        address: contractAddress as Address,
        functionName: abiFunction,
        abi: contractAbi,
        args: functionArgs,
        chainId: chain
      });

      if (client) {
        await waitForTransactionReceipt(client, {
          hash,
          confirmations: 1,
        });
      }

      return { result, isPending, error: null };
    } catch (e: any) {
      console.error("Write error", e);
      alert("Error: " + e);
      return { result: null, isPending, error: e };
    }
  };

  return { write, result, isPending, error: null };
}
