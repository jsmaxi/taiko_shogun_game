"use client";

import { useEffect } from "react";
import { hardhat } from "viem/chains";
import { useTargetNetwork } from "../../../../hooks/useTargetNetwork";

export default function Dashboard() {
  const { targetNetwork } = useTargetNetwork();

  useEffect(() => {
    if (targetNetwork.id !== hardhat.id) {
      //
    }
  }, [targetNetwork.id]);

  return (
    <>
      <div className="text-center">
        <div className="flex justify-center items-center">
          <p>{targetNetwork.id}</p>
        </div>
      </div>
      <hr />
    </>
  );
}
