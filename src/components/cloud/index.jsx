// src/components/Chains.js
import React from "react";

const chains = [
  {
    id: "361",
    name: "Theta Mainnet",
    rpcUrl: "https://eth-rpc-api.thetatoken.org/rpc",
    chainId: 361,
    currencySymbol: "TFUEL",
    blockExplorerUrl: "https://explorer.thetatoken.org/",
  },
  {
    id: "365",
    name: "Theta Testnet",
    rpcUrl: "https://eth-rpc-api-testnet.thetatoken.org/rpc",
    chainId: 365,
    currencySymbol: "TFUEL",
    blockExplorerUrl: "https://testnet-explorer.thetatoken.org/",
  },
];

function Chains() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-4"></div>
    </div>
  );
}

export default Chains;
