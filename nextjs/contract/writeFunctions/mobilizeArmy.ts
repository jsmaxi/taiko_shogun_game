import { contractWriteFunction } from "../contractWrite";

export function mobilizeArmy(archers : number, infantry : number, cavalry : number) {
    const result = contractWriteFunction("mobilize", [archers, infantry, cavalry]);
    return result;
};