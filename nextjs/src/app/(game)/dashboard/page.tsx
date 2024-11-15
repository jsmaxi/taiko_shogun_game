"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Footprints,
  Medal,
  Crown,
  Castle,
  User,
  Sun,
  Cloud,
  Snowflake,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
} from "lucide-react";
import { useAccount } from "wagmi";
import { getCastleDetails } from "../../../../contract/readFunctions/getCastleDetails";
import { getPlayerDetails } from "../../../../contract/readFunctions/getPlayerDetails";
import { getCurrentWeather } from "../../../../contract/readFunctions/getCurrentWeather";
import { getLastTickTock } from "../../../../contract/readFunctions/getLastTickTock";
import { getLastWeatherChangedAt } from "../../../../contract/readFunctions/getLastWeatherChangedAt";
import Link from "next/link";
import Image from "next/image";
import cover from "../../../../images/cover.png";
import shogun from "../../../../images/shogun.png";

interface CastleDetails {
  currentKing: string;
  lastWeatherChange: number;
  lastKingChangedAt: number;
}

interface PlayerState {
  generalName: string;
  turns: number;
  points: number;
}

export default function Dashboard() {
  const [castleDetails, setCastleDetails] = useState<CastleDetails | null>(null);
  const [loadingCastleDetails, setLoadingCastleDetails] = useState(true);
  const [castleError, setCastleError] = useState<string | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState | null>(null);
  const [loadingPlayerState, setLoadingPlayerState] = useState(false);
  const [playerError, setPlayerError] = useState<string | null>(null);
  const [weatherValue, setWeatherValue] = useState<number>(0);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [lastTickTock, setLastTickTock] = useState<number>(0);
  const [lastTickTockError, setLastTickTockError] = useState<string | null>(null);
  const [lastWeatherChangedAt, setLastWeatherChangedAt] = useState<number>(0);
  const [lastWeatherUpdateError, setLastWeatherUpdateError] = useState<string | null>(null);

  const { address } = useAccount();
  const MULTIPLIER = 100;

  const { isFetching: isFetchingCastle, refetch: refetchCastle, error: errorCastle } = getCastleDetails();
  const { isFetching: isFetchingWeather, refetch: refetchWeather, error: errorWeather } = getCurrentWeather();
  const { isFetching: isFetchingTickTock, refetch: refetchTickTock, error: errorTickTock } = getLastTickTock();
  const { isFetching: isFetchingPlayer, refetch: refetchPlayer, error: errorPlayer } = getPlayerDetails(address ?? "");
  const {
    isFetching: isFetchingWeatherLast,
    refetch: refetchWeatherLast,
    error: errorWeatherLast,
  } = getLastWeatherChangedAt();

  useEffect(() => {
    const fetchCastleDetails = async () => {
      try {
        const { data } = await refetchCastle();
        const details = data as CastleDetails;
        setCastleDetails(details);
        console.log("castle", details);
      } catch (err) {
        console.error("Failed to fetch castle details:", err);
        setCastleError("Failed to fetch castle details.");
      } finally {
        setLoadingCastleDetails(false);
      }
    };

    fetchCastleDetails();
  }, []);

  useEffect(() => {
    const fetchPlayerState = async () => {
      if (!address) return;

      setLoadingPlayerState(true);

      try {
        const { data } = await refetchPlayer();
        const state = data as PlayerState;
        setPlayerState(state);
        console.log("player", state);
      } catch (error) {
        console.error("Failed to fetch player state:", error);
        setPlayerError("Failed to fetch player state. ");
      } finally {
        setLoadingPlayerState(false);
      }
    };

    fetchPlayerState();
  }, [address]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { data } = await refetchWeather();
        const details = data as number;
        setWeatherValue(details);
        console.log("weather", details);
      } catch (err) {
        console.error("Failed to fetch weather:", err);
        setWeatherError("Failed to fetch weather. ");
      } finally {
      }
    };

    fetchWeather();
  }, []);

  useEffect(() => {
    const fetchTickTock = async () => {
      try {
        const { data } = await refetchTickTock();
        const details = data as number;
        setLastTickTock(details);
        console.log("ticktock", details);
      } catch (err) {
        console.error("Failed to fetch ticktock:", err);
        setLastTickTockError("Failed to fetch last turns update time.");
      } finally {
      }
    };

    fetchTickTock();
  }, []);

  useEffect(() => {
    const fetchLastWeatherChange = async () => {
      try {
        const { data } = await refetchWeatherLast();
        const details = data as number;
        setLastWeatherChangedAt(details);
        console.log("weather changed at", details);
      } catch (err) {
        console.error("Failed to fetch weather changed at:", err);
        setLastWeatherUpdateError("Failed to fetch last weather update time.");
      } finally {
      }
    };

    fetchLastWeatherChange();
  }, []);

  function weatherValueToString(weather: number) {
    switch (weather) {
      case 0:
        return "Clear";
      case 1:
        return "Clouds";
      case 2:
        return "Snow";
      case 3:
        return "Rain";
      case 4:
        return "Drizzle";
      case 5:
        return "Thunderstorm";
      default:
        return "Unknown";
    }
  }

  function weatherValueToIcon(weather: number) {
    switch (weather) {
      case 0:
        return <Sun className="h-6 w-6 text-yellow-500 mr-2" />;
      case 1:
        return <Cloud className="h-6 w-6 text-yellow-500 mr-2" />;
      case 2:
        return <Snowflake className="h-6 w-6 text-yellow-500 mr-2" />;
      case 3:
        return <CloudRain className="h-6 w-6 text-yellow-500 mr-2" />;
      case 4:
        return <CloudDrizzle className="h-6 w-6 text-yellow-500 mr-2" />;
      case 5:
        return <CloudLightning className="h-6 w-6 text-yellow-500 mr-2" />;
      default:
        return <Sun className="h-6 w-6 text-yellow-500 mr-2" />;
    }
  }

  function trimAddress(adr: string) {
    if (!adr || adr.length <= 10) return adr;
    return adr.substring(0, 10) + "...";
  }

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
              “The greatest victory is that which requires no battle.” ― Sun Tzu, The Art of War
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
          <h3 className="text-2xl font-bold mb-2">
            <div className="flex">
              <User className="mr-2" />
              Player Info »
            </div>
          </h3>
          {loadingPlayerState && <div>Loading player state...</div>}
          {playerError && <div>Error: {playerError}</div>}
          {lastTickTockError && <div>Error: {lastTickTockError}</div>}
          {playerState && playerState.generalName && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-base text-gray-400">General's Name</p>
                  <p className="text-xl font-bold text-yellow-400">{playerState.generalName}</p>
                </div>
                <div>
                  <p className="text-base text-gray-400">Ranking Points</p>
                  <div className="flex items-center">
                    <Medal className="h-6 w-6 mr-2 text-orange-500" />
                    <span className="text-2xl font-bold text-orange-500">
                      {Number(playerState.points) * MULTIPLIER}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-base text-gray-400">Remaining Turns</p>
                  <div className="flex items-center">
                    <Footprints className="h-6 w-6 mr-2 text-blue-500" />
                    <span className="text-2xl font-bold text-blue-500">{Number(playerState.turns)}</span>
                  </div>
                </div>
                <div>
                  <p className="text-base text-gray-400">Last turn Update</p>
                  <p className="text-xl font-bold text-pink-400">
                    {new Date(Number(lastTickTock) * 1000).toLocaleString()}
                  </p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-2">
            <div className="flex">
              <Castle className="mr-2" />
              Castle Info »
            </div>
          </h3>
          {loadingCastleDetails && <div>Loading castle details...</div>}
          {castleError && <div>Error: {castleError}</div>}
          {weatherError && <div>Error: {weatherError}</div>}
          {lastWeatherUpdateError && <div>Error: {lastWeatherUpdateError}</div>}
          {castleDetails && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-base text-gray-400">Weather</p>
                <div className="flex items-center">
                  {weatherValueToIcon(weatherValue)}
                  <span className="text-2xl font-bold text-lime-300">{weatherValueToString(weatherValue)}</span>
                </div>
              </div>
              <div>
                <p className="text-base text-gray-400">Current King</p>
                <div className="flex items-center">
                  <Crown className="h-6 w-6 text-red-500 mr-2" />

                  <Link href={"https://taikoscan.io/address/" + castleDetails.currentKing} target="_blank">
                    <span className="text-2xl font-bold text-red-500">{trimAddress(castleDetails.currentKing)}</span>
                  </Link>
                </div>
              </div>
              <div>
                <p className="text-base text-gray-400">Last Weather Update</p>
                <p className="text-xl font-bold text-green-400">
                  {new Date(Number(lastWeatherChangedAt) * 1000).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-base text-gray-400">Last King Update</p>
                <p className="text-xl font-bold text-indigo-400">
                  {new Date(Number(castleDetails.lastKingChangedAt) * 1000).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <hr />
    </>
  );
}
