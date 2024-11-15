"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { AddressInfoDropdown } from "../../../components/connectButton/AddressInfoDropdown";
import { Address } from "viem";
import { useTargetNetwork } from "../../../../hooks/useTargetNetwork";
import cover from "../../../../images/samurai_coin.png";
import shogun from "../../../../images/shogun.png";
import { useAccount } from "wagmi";
import Link from "next/link";

export default function Wallet() {
  const { targetNetwork } = useTargetNetwork();
  const { address } = useAccount();

  return (
    <>
      <div className="text-center">
        <div className="flex justify-center items-center">
          <Image
            src={shogun}
            width={125}
            height={50}
            quality={100}
            placeholder="blur"
            alt="Shogun Text"
            className="rounded-lg mr-2"
          />
          <h1 className="text-3xl font-bold"> : Rise of Empires</h1>
        </div>
        <div className="relative text-center">
          <div className="absolute inset-0 flex items-center justify-center text-wrap w-[300px] mx-auto pointer-events-none z-10">
            <h3 className="text-white text-xl font-bold">
              “Know yourself and you will win all battles.” ― Sun Tzu, The Art of War
            </h3>
          </div>
          <Image
            src={cover}
            width={400}
            height={200}
            quality={100}
            placeholder="blur"
            alt="Shogun Banner"
            className="mx-auto rounded-lg hover:opacity-20 cursor-pointer relative z-20"
          />
        </div>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <AddressInfoDropdown address={address as Address} blockExplorerAddressLink="" displayName="" />
          <p>
            Connected address: <strong>{address}</strong>
          </p>
          <p>
            Target network ID: <strong>{targetNetwork?.id}</strong>
          </p>
          <p>
            Taiko Explorer:{" "}
            <strong>
              <Link href={"https://taikoscan.io/address/" + address} target="_blank">
                Mainnet
              </Link>{" "}
              <Link href={"https://hekla.taikoscan.io/address/" + address} target="_blank">
                Testnet
              </Link>
            </strong>
          </p>
        </CardContent>
      </Card>

      <hr />
    </>
  );
}
