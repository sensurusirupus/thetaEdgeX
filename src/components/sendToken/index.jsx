// src/components/SendTokens.js
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const SendTokens = ({ selectedWallet, selectedChain }) => {
  const [sendAddress, setSendAddress] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [estimatedGas, setEstimatedGas] = useState(0);

  const handleSend = async () => {
    if (!selectedWallet || !sendAddress || !sendAmount) return;
    const provider = new ethers.providers.JsonRpcProvider(selectedChain.rpcUrl);
    const signer = selectedWallet.connect(provider);
    const tx = {
      to: sendAddress,
      value: ethers.utils.parseEther(sendAmount),
    };
    const estimatedGas = await signer.estimateGas(tx);
    setEstimatedGas(ethers.utils.formatEther(estimatedGas));
    await signer.sendTransaction(tx);
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold">Send Tokens</h3>
      <input
        type="text"
        placeholder="Enter address"
        value={sendAddress}
        onChange={(e) => setSendAddress(e.target.value)}
        className="mt-2 border p-2 bg-gray-700 text-white w-full"
      />
      <input
        type="text"
        placeholder="Enter amount"
        value={sendAmount}
        onChange={(e) => setSendAmount(e.target.value)}
        className="mt-2 border p-2 bg-gray-700 text-white w-full"
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
      >
        Send
      </button>
      <p className="mt-2">Estimated Gas: {estimatedGas}</p>
    </div>
  );
};

export default SendTokens;
