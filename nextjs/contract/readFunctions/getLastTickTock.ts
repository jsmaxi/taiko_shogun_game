import { contractReadFunction } from "../contractRead";

export function getLastTickTock() {
  const result = contractReadFunction("lastTickTock", []);
  return result;
};