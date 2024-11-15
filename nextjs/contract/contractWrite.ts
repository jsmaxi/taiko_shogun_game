"use client";

import { contractAbi } from "./ABI";
import { resolveNetworkContract } from "./resolveNetworkContract";
import { waitForTransactionReceipt } from "viem/actions";
import { useClient, useWriteContract, useAccount } from "wagmi";
import { Address } from "viem";

export function contractWriteFunction(abiFunction: string, functionArgs: any) {
  const { chain } = useAccount();
  const { data: result, isPending, writeContractAsync } = useWriteContract();
  const client = useClient();

  const write = async () => {
    if (!writeContractAsync) {
      return { result: null, isPending, error: "Write contract not initialized!" };
    }

    try {
      const hash = await writeContractAsync({
        address: resolveNetworkContract(chain?.id ?? -1) as Address,
        functionName: abiFunction,
        abi: contractAbi,
        args: functionArgs,
        chainId: chain?.id
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
