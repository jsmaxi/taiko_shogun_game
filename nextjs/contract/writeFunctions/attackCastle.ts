import { contractWriteFunction } from "../contractWrite";

export function attackCastle() {
    const result = contractWriteFunction("attack", []);
    return result;
};