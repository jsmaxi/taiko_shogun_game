"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import cover from "../../../../images/samurai_rank.png";
import shogun from "../../../../images/shogun.png";

interface PlayerRank {
  name: string;
  points: number;
}

export default function Rankings() {
  const [playerRankings, setPlayerRankings] = useState<PlayerRank[]>([]);

  useEffect(() => {
    setPlayerRankings([{ name: "Test", points: 100 }]);
  }, []);

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
              “Opportunities multiply as they are seized.” ― Sun Tzu, The Art of War
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
          {/* {loading && <p>Loading rankings...</p>}
          {error && <p>Error loading rankings: {error?.message}</p>}
          {!loading && !error && ( */}
          <>
            <h3 className="text-2xl font-bold mb-4 text-indigo-400">Player Rankings</h3>
            <div className="space-y-4">
              {playerRankings.map((player: PlayerRank, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-lg font-semibold text-white mr-2">{index + 1}.</span>
                    <span className="text-md text-white">{player.name}</span>
                  </div>
                  <span className="text-xl font-bold text-indigo-500">{Number(player.points)} pts</span>
                </div>
              ))}
            </div>
          </>
          {/* )} */}
        </CardContent>
      </Card>
      <hr />
    </>
  );
}
