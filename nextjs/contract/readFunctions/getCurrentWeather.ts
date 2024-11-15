import { contractReadFunction } from "../contractRead";

export function getCurrentWeather() {
  const result = contractReadFunction("getCurrentWeather", []);
  return result;
};