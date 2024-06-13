import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";

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

Modal.setAppElement("#root");

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
          className="bg-gray-800 text-white p-2 rounded-md"
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
      <div className="grid grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => setSendModalIsOpen(true)}
          className="bg-[#1f2331] p-4 rounded-md text-center hover:bg-[#19c99d]"
        >
          <div className="text-2xl">📤</div>
          <div>Send</div>
        </button>
        <button
          onClick={copyToClipboard}
          className="bg-[#1f2331] p-4 rounded-md text-center hover:bg-[#19c99d]"
        >
          <div className="text-2xl">📨</div>
          <div>Receive</div>
        </button>
        <button
          onClick={() => {}}
          className="bg-[#1f2331] p-4 rounded-md text-center hover:bg-[#19c99d]"
        >
          <div className="text-2xl">📊</div>
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
      <div className="bg-[#1f2331] p-4 rounded-md">
        <h3 className="text-lg font-bold">LOL</h3>
        <p>8,998,000</p>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-gray-900 p-6 rounded-lg text-white"
      >
        <h2 className="text-xl mb-4">Accounts</h2>
        {wallets.map((wallet, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-bold">
                  {wallet.name || `Account ${index + 1}`}
                </span>{" "}
                - {wallet.address.substring(0, 6)}...
                {wallet.address.substring(wallet.address.length - 4)}
              </div>
              <div>
                {chains.find((chain) => chain.id === selectedChain.id).name}
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={createWallet}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Create Wallet
        </button>
        <input
          type="text"
          placeholder="Enter private key"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          className="mt-4 border p-2 bg-gray-700 text-white w-full rounded-md"
        />
        <button
          onClick={importWallet}
          className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Import Wallet
        </button>
      </Modal>
      <Modal
        isOpen={sendModalIsOpen}
        onRequestClose={() => setSendModalIsOpen(false)}
        className="bg-gray-900 p-6 rounded-lg text-white"
      >
        <h2 className="text-xl mb-4">Send Tokens</h2>
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          className="mb-4 border p-2 bg-gray-700 text-white w-full rounded-md"
        />
        <input
          type="text"
          placeholder="Amount"
          value={sendAmount}
          onChange={(e) => setSendAmount(e.target.value)}
          className="mb-4 border p-2 bg-gray-700 text-white w-full rounded-md"
        />
        <button
          onClick={sendTokens}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Send
        </button>
      </Modal>
    </div>
  );
}

export default Wallets;
