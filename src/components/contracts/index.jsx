// src/components/Contracts.js
import React, { useState } from "react";
import { ethers } from "ethers";

function Contracts() {
  const [contractCode, setContractCode] = useState("");

  const deployContract = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const factory = new ethers.ContractFactory([], contractCode, signer);
      const contract = await factory.deploy();
      console.log("Contract deployed at:", contract.address);
    } catch (error) {
      console.error("Failed to deploy contract:", error);
    }
  };

  return (
    <div>
      <h2>Deploy Contract</h2>
      <textarea
        value={contractCode}
        onChange={(e) => setContractCode(e.target.value)}
        placeholder="Enter contract code"
        className="w-full p-2 border"
      />
      <button
        onClick={deployContract}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
      >
        Deploy
      </button>
    </div>
  );
}

export default Contracts;
