import { contractWriteFunction } from "../contractWrite";

export function changeDefense(archers : number, infantry : number, cavalry : number) {
    const result = contractWriteFunction("changeDefense", [archers, infantry, cavalry]);
    return result;
};