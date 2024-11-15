import { contractReadFunction } from "../contractRead";

export function getCastleDetails() {
  const result = contractReadFunction("getCastle", []);
  return result;
};