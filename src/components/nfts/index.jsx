// src/components/NFTs.js
import { IconArrowLeft } from "@tabler/icons-react";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function NFTs() {
  const [nfts, setNfts] = useState([]);
  const history = useHistory();

  useEffect(() => {}, []);

  return (
    <div className="p-6 bg-[#131722] min-h-screen text-white">
      <button
        onClick={() => history.goBack()}
        className=" bg-[#1f2331] rounded-full text-white   flex items-center transition duration-300"
      >
        <IconArrowLeft size={20} className="m-2" />
      </button>{" "}
      <h1 className="text-3xl font-semibold mb-8 text-center">
        You have no NFT's
      </h1>
    </div>
  );
}

export default NFTs;
