import React from "react";
import { Link } from "react-router-dom";
import {
  IconCloud,
  IconVideo,
  IconPalette,
  IconWallet,
  IconFileDots,
  IconBrandVisualStudio,
} from "@tabler/icons-react";

function Home() {
  return (
    <div className="w-full h-full p-6 bg-[#131722] text-white">
      <div className="flex flex-col items-center justify-center mt-0">
        <img src="/theta.png" width={95} alt="Theta" />
        <h1 className="text-3xl font-bold pb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          ThetaEdgeX
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-6 mb-4">
        <Link
          to="/wallets"
          className="text-white-500 shadow-md hover:bg-[#19c99d] bg-[#1f2331] rounded-lg py-6 flex flex-col items-center"
        >
          <IconWallet size={30} />
          <span>Theta</span>
          <span>Wallets</span>
        </Link>
        <Link
          to="/chains"
          className="text-white-500 shadow-md hover:bg-[#19c99d] bg-[#1f2331] rounded-lg py-6 flex flex-col items-center"
        >
          <IconCloud size={30} />
          <span>Theta</span>
          <span> EdgeCloud</span>
        </Link>
        <Link
          to="/wallets"
          className="text-white-500 shadow-md hover:bg-[#19c99d] bg-[#1f2331] rounded-lg py-6 flex flex-col items-center"
        >
          <IconVideo size={30} />
          <span>Theta</span>
          <span> Video Services</span>
        </Link>
        <Link
          to="/nfts"
          className="text-white-500 shadow-md hover:bg-[#19c99d] bg-[#1f2331] rounded-lg py-6 flex flex-col items-center"
        >
          <IconPalette size={30} />
          <span>Theta</span>
          <span>NFTs</span>
        </Link>

        <Link
          to="/contracts"
          className="text-white-500 shadow-md hover:bg-[#19c99d] bg-[#1f2331] rounded-lg py-6 flex flex-col items-center"
        >
          <IconWallet size={30} />
          <span>Theta</span>
          <span>Doc</span>
        </Link>
        <Link
          to="/send-tokens"
          className="text-white-500 shadow-md hover:bg-[#19c99d] bg-[#1f2331] rounded-lg py-6 flex flex-col items-center"
        >
          <IconBrandVisualStudio size={30} />
          <span>Theta</span>
          <span>VSCode Ext.</span>
        </Link>
      </div>
    </div>
  );
}

export default Home;
