// src/components/NFTs.js
import React, { useState, useEffect } from "react";

function NFTs() {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    // Fetch NFTs for the user's wallet
    // You will need to implement this part
  }, []);

  return (
    <div>
      <h2>Your NFTs</h2>
      <ul>
        {nfts.map((nft, index) => (
          <li key={index}>{nft.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default NFTs;
