import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useHistory } from "react-router-dom";
import {
  IconSend,
  IconDatabase,
  IconSeeding,
  IconSearch,
  IconDotsVertical,
} from "@tabler/icons-react";
import axios from "axios";
import CustomModal from "../CustomModal";

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sendModalIsOpen, setSendModalIsOpen] = useState(false);
  const [newAccountName, setNewAccountName] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [activities, setActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedWallets = JSON.parse(localStorage.getItem("wallets")) || [];
    const validWallets = storedWallets.filter((walletData) => {
      try {
        new ethers.Wallet(walletData.privateKey);
        return true;
      } catch (error) {
        console.error("Invalid wallet data:", walletData, error);
        return false;
      }
    });

    const wallets = validWallets.map((walletData) => {
      const wallet = new ethers.Wallet(walletData.privateKey);
      wallet.name = walletData.name;
      return wallet;
    });

    if (wallets.length > 0) {
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
      name: wallet.name || `Account ${wallets.indexOf(wallet) + 1}`,
    }));
    localStorage.setItem("wallets", JSON.stringify(walletsData));
  };

  const createWallet = async () => {
    const wallet = ethers.Wallet.createRandom();
    wallet.name = `Account ${wallets.length + 1}`;
    const newWallets = [...wallets, wallet];
    setWallets(newWallets);
    setSelectedWallet(wallet);
    saveWalletsToLocalStorage(newWallets);
    await fetchBalance(wallet);
  };

  const importWallet = async () => {
    try {
      const wallet = new ethers.Wallet(privateKey);
      wallet.name = `Account ${wallets.length + 1}`;
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

  const fetchActivities = async (wallet) => {
    try {
      const response = await axios.get(
        `${selectedChain.blockExplorerUrl}api?module=account&action=txlist&address=${wallet.address}`
      );
      setActivities(response.data.result);
    } catch (error) {
      console.error("Error fetching account activities:", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(selectedWallet.address);
    alert("Current address copied to clipboard");
  };

  const handleRename = (index, newName) => {
    const updatedWallets = wallets.map((wallet, i) =>
      i === index ? { ...wallet, name: newName } : wallet
    );
    setWallets(updatedWallets);
    saveWalletsToLocalStorage(updatedWallets);
  };

  const sendTokens = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        selectedChain.rpcUrl
      );
      const signer = selectedWallet.connect(provider);
      const tx = await signer.sendTransaction({
        to: recipientAddress,
        value: ethers.utils.parseEther(sendAmount),
      });
      console.log("Transaction sent:", tx);
      setSendModalIsOpen(false);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  const filteredWallets = wallets.filter((wallet) =>
    wallet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-[#131722] text-white min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <img src="/theta.png" alt="Theta Logo" className="h-12" />
        <select
          value={selectedChain.id}
          onChange={(e) =>
            setSelectedChain(
              chains.find((chain) => chain.id === e.target.value)
            )
          }
          className="bg-[#1f2331] px-4 rounded-full text-white p-2 "
        >
          {chains.map((chain) => (
            <option key={chain.id} value={chain.id}>
              {chain.name}
            </option>
          ))}
        </select>
        <img
          src="/avatar.png"
          alt="User Avatar"
          className="h-12 rounded-full cursor-pointer"
          onClick={() => setModalIsOpen(true)}
        />
      </div>
      <div className="text-center mb-4">
        {selectedWallet ? (
          <>
            <input
              className="bg-transparent border-none text-xl font-bold text-center"
              type="text"
              value={
                newAccountName ||
                selectedWallet.name ||
                `Account ${wallets.indexOf(selectedWallet) + 1}`
              }
              onChange={(e) => setNewAccountName(e.target.value)}
              onBlur={() => {
                handleRename(wallets.indexOf(selectedWallet), newAccountName);
                setNewAccountName("");
              }}
            />
            <p>{`${selectedWallet.address.substring(
              0,
              6
            )}...${selectedWallet.address.substring(
              selectedWallet.address.length - 4
            )}`}</p>
          </>
        ) : (
          <h2 className="text-xl font-bold">No Wallet Selected</h2>
        )}
      </div>
      <div className="grid grid-cols-3 gap-4 mb-7 mt-4">
        <button
          onClick={() => setSendModalIsOpen(true)}
          className="bg-[#1f2331] p-4 rounded-md text-center hover:bg-[#19c99d] flex flex-col items-center justify-center"
        >
          <div className="text-2xl ">
            <IconSend size={30} />
          </div>
          <div>Send</div>
        </button>
        <button
          onClick={copyToClipboard}
          className="bg-[#1f2331] p-4 rounded-md text-center hover:bg-[#19c99d] flex flex-col items-center justify-center"
        >
          <div className="text-2xl">
            <IconSeeding size={32} />
          </div>
          <div>Receive</div>
        </button>
        <button
          onClick={() => {}}
          className="bg-[#1f2331] p-4 rounded-md text-center hover:bg-[#19c99d] flex flex-col items-center justify-center"
        >
          <div className="text-2xl">
            <IconDatabase size={32} />
          </div>
          <div>Stakes</div>
        </button>
      </div>
      <div className="bg-[#1f2331] p-4 rounded-md mb-4">
        <h3 className="text-lg font-bold">THETA</h3>
        <p>{balance.theta}</p>
      </div>
      <div className="bg-[#1f2331] p-4 rounded-md mb-4">
        <h3 className="text-lg font-bold">TFUEL</h3>
        <p>{balance.tfuel}</p>
      </div>
      <div className="bg-[#1f2331] p-4 rounded-md mt-4">
        <h3 className="text-lg font-bold">Account Activities</h3>
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <div key={index} className="mb-2">
              <p>Hash: {activity.hash}</p>
              <p>From: {activity.from}</p>
              <p>To: {activity.to}</p>
              <p>Value: {ethers.utils.formatEther(activity.value)} TFUEL</p>
              <p>
                Date: {new Date(activity.timeStamp * 1000).toLocaleString()}
              </p>
              <hr className="my-2" />
            </div>
          ))
        ) : (
          <p>No activities found</p>
        )}
      </div>
      <CustomModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <h2 className="text-xl mb-4">Select an account</h2>
        <div className="relative mb-4">
          <IconSearch
            className="absolute top-3 left-3 text-gray-500"
            size={20}
          />
          <input
            type="text"
            placeholder="Search accounts"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="focus:outline-none p-2 pl-10 bg-[#1f2331] ring-0 text-white w-full rounded-md"
          />
        </div>
        {filteredWallets.map((wallet, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedWallet(wallet);
              setModalIsOpen(false);
            }}
            className="mb-2 flex justify-between items-center p-2 bg-[#2a2f3b] rounded-md"
          >
            <div>
              <span className="font-bold">
                {wallet.name || `Account ${index + 1}`}
              </span>{" "}
              - {wallet.address.substring(0, 6)}...
              {wallet.address.substring(wallet.address.length - 4)}
              <p className="text-sm text-gray-400">0 TFUEL</p>
            </div>
            <IconDotsVertical className="text-gray-500" size={20} />
          </div>
        ))}
        <button
          onClick={createWallet}
          className="bg-blue-500 w-full text-white px-4 py-2 rounded-md mt-4"
        >
          Create Wallet
        </button>
        <input
          type="text"
          placeholder="Enter private key"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          className="mt-4 focus:outline-none p-2 bg-[#1f2331] ring-0 text-white w-full rounded-md"
        />
        <button
          onClick={importWallet}
          className="bg-green-500 w-full text-white px-4 py-2 rounded-md mt-4"
        >
          Import Wallet
        </button>
      </CustomModal>
      <CustomModal
        isOpen={sendModalIsOpen}
        onClose={() => setSendModalIsOpen(false)}
      >
        <h2 className="text-xl mb-4">Send Tokens</h2>
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          className="mb-4 focus:outline-none p-2 bg-[#1f2331] ring-0 text-white w-full rounded-md"
        />
        <input
          type="text"
          placeholder="Amount"
          value={sendAmount}
          onChange={(e) => setSendAmount(e.target.value)}
          className="mb-4 focus:outline-none p-2 bg-[#1f2331] ring-0 text-white w-full rounded-md"
        />
        <button
          onClick={sendTokens}
          className="bg-blue-500 w-full text-white px-4 py-2 rounded-md"
        >
          Send
        </button>
      </CustomModal>
    </div>
  );
}

export default Wallets;

// now note a couple of things
// 1. make the send money workable in reall life and check if the balanace of the user is upto what he want to send. show an alert for any error.

// 2.
