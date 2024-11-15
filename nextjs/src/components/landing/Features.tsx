import Image from "next/image";
import logo from "../../../images/shogun_logo.png";
import { CloudSun, Footprints, CircleCheck, Swords, Coins, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Features() {
  return (
    <section className="text-center py-8" id="features">
      <h3 className="text-2xl font-bold text-gray-300 tracking-widest mt-8">FEATURES</h3>
      <div className="flex flex-col lg:flex-row justify-center mt-8 mb-4">
        <div className="w-full lg:w-1/2 lg:mr-2 flex lg:justify-end max-lg:justify-center">
          <Image src={logo} width={300} height={300} quality={100} alt="Shogun logo" className="content-fit" />
        </div>
        <div className="w-full lg:w-1/2 bg-gray-800 p-10 flex flex-col justify-around items-start">
          <div className="flex justify-center items-center mb-4 text-start">
            <CloudSun className="mr-2 h-10 w-10 text-yellow-500" />
            <p className="text-xl">Based on real weather conditions.</p>
          </div>
          <div className="flex justify-center items-center mb-4 text-start">
            <Footprints className="mr-2 h-10 w-10 text-blue-500" />
            <p className="text-xl">Scarce turns for game actions.</p>
          </div>
          <div className="flex justify-center items-center mb-4 text-start">
            <CircleCheck className="mr-2 h-10 w-10 text-green-500" />
            <p className="text-xl">Decentralized, transparent and open.</p>
          </div>
          <div className="flex justify-center items-center text-start">
            <Swords className="mr-2 h-10 w-10 text-red-500" />
            <p className="text-xl">Requires skills, strategy and tactics.</p>
          </div>
        </div>
      </div>
      <div className="mt-8 mb-8">
        <Link href="https://bridge.hekla.taiko.xyz/faucet" target="_blank" className="mx-8 mt-4 mb-4 inline-block">
          <Button className="bg-orange-500 hover:bg-gray-500 focus-visible:outline-orange-500 p-6 round-btn">
            <p>FAUCET</p>
            <Coins className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link
          href="https://jsmaxi.gitbook.io/shogun-taiko"
          passHref
          target="_blank"
          className="mx-8 mt-4 mb-4 inline-block"
        >
          <Button className="bg-green-600 hover:bg-gray-500 focus-visible:outline-green-600 p-6 round-btn">
            <p>DOCS</p>
            <HelpCircle className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
