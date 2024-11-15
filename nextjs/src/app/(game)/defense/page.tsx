"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { changeDefense } from "../../../../contract/writeFunctions/changeDefense";
import { getCastleDetails } from "../../../../contract/readFunctions/getCastleDetails";
import { useAccount } from "wagmi";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import cover from "../../../../images/samurai_def.png";
import shogun from "../../../../images/shogun.png";

interface DefenseArmy {
  archers: number;
  cavalry: number;
  infantry: number;
}

interface CastleDetails {
  currentKing: string;
  defense: DefenseArmy;
}

export default function Defense() {
  const [castleDetails, setCastleDetails] = useState<CastleDetails | null>(null);
  const [loadingCastleDetails, setLoadingCastleDetails] = useState(true);
  const [castleError, setCastleError] = useState<string | null>(null);
  const [archerCount, setArcherCount] = useState(0);
  const [infantryCount, setInfantryCount] = useState(0);
  const [cavalryCount, setCavalryCount] = useState(0);
  const [reload, setReload] = useState<boolean>(false);

  const MAX_TROOPS = 2000;
  const { address } = useAccount();

  const { isFetching: isFetchingCastle, refetch: refetchCastle, error: errCastle } = getCastleDetails();
  const {
    write: writeDef,
    result: resultDef,
    isPending: pendingDef,
    error: errorDef,
  } = changeDefense(archerCount, infantryCount, cavalryCount);

  useEffect(() => {
    const fetchCastleDetails = async () => {
      try {
        const { data } = await refetchCastle();
        const details = data as CastleDetails;
        setCastleDetails(details);
        console.log("castle", details);
        console.log("player address", address);
      } catch (err) {
        console.error("Failed to fetch castle details:", err);
        setCastleError("Failed to fetch castle details.");
      } finally {
        setLoadingCastleDetails(false);
      }
    };

    fetchCastleDetails();
    console.log(isFetchingCastle, errCastle);
  }, [reload]);

  const handleDefend = async () => {
    if (!address) {
      alert("Please connect your wallet first.");
      return;
    }

    if (archerCount < 0 || infantryCount < 0 || cavalryCount < 0) {
      alert("Army composition cannot contain negative values.");
      return;
    }

    if (archerCount + infantryCount + cavalryCount > MAX_TROOPS) {
      alert("Army composition cannot exceed " + MAX_TROOPS);
      return;
    }

    try {
      const hash = await writeDef();

      console.log(`Defense army changed! Transaction hash: ${hash}`);
      setReload(!reload);
    } catch (error: any) {
      console.error(`Failed to change defense army: ${error.message}`);
    }

    console.log(resultDef, pendingDef, errorDef);
  };

  if (loadingCastleDetails) return <div>Loading castle details...</div>;
  if (castleError) return <div>{castleError}</div>;

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
              “If you wait by the river long enough, the bodies of your enemies will float by.” ― Sun Tzu, The Art of
              War
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
          <h3 className="text-2xl font-bold mb-2">Castle Defense »</h3>
          <div className="flex justify-around mt-4">
            <div className="flex flex-col items-center">
              <Shield className="text-yellow-500 mb-2" />
              <p className="tracking-wide">Archers</p>
              <p className="text-3xl font-bold mt-4">
                {castleDetails?.defense ? Number(castleDetails?.defense?.archers) : 0}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="text-green-500 mb-2" />
              <p className="tracking-wide">Infantry</p>
              <p className="text-3xl font-bold mt-4">
                {castleDetails?.defense ? Number(castleDetails?.defense?.infantry) : 0}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="text-red-500 mb-2" />
              <p className="tracking-wide">Cavalry</p>
              <p className="text-3xl font-bold mt-4">
                {castleDetails?.defense ? Number(castleDetails?.defense?.cavalry) : 0}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {address && castleDetails && castleDetails.currentKing === String(address) && (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 text-white text-center">CHANGE DEFENSE, KING</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="flex justify-between">
                  <div className="flex items-center">
                    <Shield className="text-yellow-500 mr-4" />{" "}
                    <span className="text-sm font-medium text-gray-200">Archers</span>
                  </div>
                  <span className="text-xl font-bold text-white">{archerCount}</span>
                </label>
                <Slider
                  min={0}
                  max={MAX_TROOPS}
                  step={1}
                  value={[archerCount]}
                  onValueChange={(value) => setArcherCount(value[0])}
                  className="w-full text-white bg-yellow-500"
                />
              </div>
              <div className="space-y-2">
                <label className="flex justify-between">
                  <div className="flex items-center">
                    <Shield className="text-green-500 mr-4" />{" "}
                    <span className="text-sm font-medium text-gray-200">Infantry</span>
                  </div>
                  <span className="text-xl font-bold text-white">{infantryCount}</span>
                </label>
                <Slider
                  min={0}
                  max={MAX_TROOPS}
                  step={1}
                  value={[infantryCount]}
                  onValueChange={(value) => setInfantryCount(value[0])}
                  className="w-full text-white bg-green-500"
                />
              </div>
              <div className="space-y-2">
                <label className="flex justify-between">
                  <div className="flex items-center">
                    <Shield className="text-red-500 mr-4" />{" "}
                    <span className="text-sm font-medium text-gray-200">Cavalry</span>
                  </div>
                  <span className="text-xl font-bold text-white">{cavalryCount}</span>
                </label>
                <Slider
                  min={0}
                  max={MAX_TROOPS}
                  step={1}
                  value={[cavalryCount]}
                  onValueChange={(value) => setCavalryCount(value[0])}
                  className="text-white bg-red-500 w-full"
                />
              </div>
              <p>
                Remaining troops:{" "}
                <span className="font-bold">{MAX_TROOPS - archerCount - infantryCount - cavalryCount}</span>
              </p>
              {MAX_TROOPS - archerCount - infantryCount - cavalryCount < 0 && (
                <p className="text-red-400">Troops limit exceeded!</p>
              )}
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-center w-full mb-3"
                onClick={handleDefend}
                disabled={!address}
              >
                CHANGE
              </Button>
              <i>Cost: 3 turns</i>
            </div>
          </CardContent>
        </Card>
      )}

      <hr />
    </>
  );
}
