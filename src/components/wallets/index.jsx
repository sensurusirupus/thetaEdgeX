import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useHistory } from "react-router-dom";

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

function Wallets() {
  const history = useHistory();
  const [wallets, setWallets] = useState([]);
  const [privateKey, setPrivateKey] = useState("");
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [selectedChain, setSelectedChain] = useState(chains[1]);
  const [balance, setBalance] = useState({ theta: 0, tfuel: 0 });

  useEffect(() => {
    const storedWallets = JSON.parse(localStorage.getItem("wallets")) || [];
    if (storedWallets.length > 0) {
      const wallets = storedWallets.map(
        (walletData) => new ethers.Wallet(walletData.privateKey)
      );
      setWallets(wallets);
      setSelectedWallet(wallets[0]);
      fetchBalance(wallets[0]);
    }
  }, []);

  useEffect(() => {
    if (selectedWallet) {
      fetchBalance(selectedWallet);
    }
  }, [selectedChain, selectedWallet]);

  const saveWalletsToLocalStorage = (wallets) => {
    const walletsData = wallets.map((wallet) => ({
      privateKey: wallet.privateKey,
    }));
    localStorage.setItem("wallets", JSON.stringify(walletsData));
  };

  const createWallet = async () => {
    const wallet = ethers.Wallet.createRandom();
    const newWallets = [...wallets, wallet];
    setWallets(newWallets);
    setSelectedWallet(wallet);
    saveWalletsToLocalStorage(newWallets);
    await fetchBalance(wallet);
  };

  const importWallet = async () => {
    try {
      const wallet = new ethers.Wallet(privateKey);
      const newWallets = [...wallets, wallet];
      setWallets(newWallets);
      setSelectedWallet(wallet);
      setPrivateKey("");
      saveWalletsToLocalStorage(newWallets);
      await fetchBalance(wallet);
    } catch (error) {
      console.error("Invalid private key", error);
    }
  };

  const fetchBalance = async (wallet) => {
    const provider = new ethers.providers.JsonRpcProvider(selectedChain.rpcUrl);
    const thetaBalance = await provider.getBalance(wallet.address);
    const tfuelBalance = await provider.getBalance(wallet.address); // Adjust if using different method
    setBalance({
      theta: ethers.utils.formatEther(thetaBalance),
      tfuel: ethers.utils.formatEther(tfuelBalance),
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(selectedWallet.address);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col space-y-4 mb-4">
        <select
          value={selectedChain.id}
          onChange={(e) =>
            setSelectedChain(
              chains.find((chain) => chain.id === e.target.value)
            )
          }
          className="bg-gray-800 text-white p-2 rounded-md"
        >
          {chains.map((chain) => (
            <option key={chain.id} value={chain.id}>
              {chain.name}
            </option>
          ))}
        </select>
        <select
          value={selectedWallet ? wallets.indexOf(selectedWallet) : ""}
          onChange={(e) => setSelectedWallet(wallets[parseInt(e.target.value)])}
          className="bg-gray-800 text-white p-2 rounded-md"
        >
          {wallets.map((wallet, index) => (
            <option key={index} value={index}>
              Account {index + 1}: {wallet.address}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">
            Account {selectedWallet ? wallets.indexOf(selectedWallet) + 1 : ""}
          </h2>
          <p>{selectedWallet ? selectedWallet.address : ""}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={createWallet}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Create Wallet
          </button>
          <input
            type="text"
            placeholder="Enter private key"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            className="mt-2 border p-2 bg-gray-700 text-white"
          />
          <button
            onClick={importWallet}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Import Wallet
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <button
          onClick={() =>
            history.push({
              pathname: "/send-tokens",
              state: { selectedWallet, selectedChain },
            })
          }
          className="bg-gray-800 p-4 rounded-md text-center"
        >
          Send
        </button>
        <button
          onClick={copyToClipboard}
          className="bg-gray-800 p-4 rounded-md text-center"
        >
          Receive
        </button>
        <button
          onClick={() => {}}
          className="bg-gray-800 p-4 rounded-md text-center"
        >
          Stakes
        </button>
      </div>
      <div className="bg-gray-800 p-4 rounded-md mb-4">
        <h3 className="text-lg font-bold">THETA</h3>
        <p>{balance.theta}</p>
      </div>
      <div className="bg-gray-800 p-4 rounded-md mb-4">
        <h3 className="text-lg font-bold">TFUEL</h3>
        <p>{balance.tfuel}</p>
      </div>
      <div className="bg-gray-800 p-4 rounded-md">
        <h3 className="text-lg font-bold">LOL</h3>
        <p>8,998,000</p>
      </div>
    </div>
  );
}

export default Wallets;
