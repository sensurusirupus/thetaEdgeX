// src/components/NFTs.js
import React, { useState, useEffect } from "react";

function NFTs() {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {}, []);

  return (
    <div className="p-6 bg-[#131722] min-h-screen text-white">
      <h1 className="text-3xl font-semibold mb-8 text-center">
        You have no NFT's
      </h1>
    </div>
  );
}

export default NFTs;
