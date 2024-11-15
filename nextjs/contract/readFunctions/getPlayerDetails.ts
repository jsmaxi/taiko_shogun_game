import { contractReadFunction } from "../contractRead";

export function getPlayerDetails(address: string) {
  const result = contractReadFunction("getPlayer", [address]);
  return result;
};