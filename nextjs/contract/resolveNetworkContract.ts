"use client";

import { sepoliaContractAddress, holeskyContractAddress, taikoHeklaContractAddress, taikoMainContractAddress } from "./ABI";

export function resolveNetworkContract(chainId: number) {
    const defaultValue = "UNKNOWN";
    switch (chainId) {
      case 11155111:
        return sepoliaContractAddress;
      case 17000:
        return holeskyContractAddress;
        case 167009:
            return taikoHeklaContractAddress;
        case 167000:
            return taikoMainContractAddress;
      default:
        return defaultValue;
    }
  }