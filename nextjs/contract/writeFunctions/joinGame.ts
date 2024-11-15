import { contractWriteFunction } from "../contractWrite";

export function joinGame(generalName: string) {
    const result = contractWriteFunction("joinGame", [generalName]);
    return result;
};