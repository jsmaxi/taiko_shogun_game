import { contractReadFunction } from "../contractRead";

export function getLastWeatherChangedAt() {
  const result = contractReadFunction("getLastWeatherChangedAt", []);
  return result;
};