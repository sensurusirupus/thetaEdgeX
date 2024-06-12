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
      <h2 className="text-2xl font-bold mb-4">Select Blockchain Network</h2>
      <div className="grid grid-cols-1 gap-4">
        {chains.map((chain) => (
          <div
            key={chain.id}
            className="border p-4 rounded-md bg-gray-800 shadow-md"
          >
            <h3 className="text-xl font-semibold">{chain.name}</h3>
            <p>
              <strong>RPC URL:</strong> {chain.rpcUrl}
            </p>
            <p>
              <strong>Chain ID:</strong> {chain.chainId}
            </p>
            <p>
              <strong>Currency:</strong> {chain.currencySymbol}
            </p>
            <p>
              <strong>Explorer:</strong>{" "}
              <a
                href={chain.blockExplorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {chain.blockExplorerUrl}
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chains;
