import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import {
  IconHome,
  IconCloud,
  IconVideo,
  IconPalette,
  IconWallet,
  IconBrandVisualStudio,
  IconFileDots,
} from "@tabler/icons-react";
import Chains from "./components/chains";
import Wallets from "./components/wallets";
import NFTs from "./components/nfts";
import Activity from "./components/activities";
import Contracts from "./components/contracts";
import ConfirmTransaction from "./components/confirmTnx";
import SendTokens from "./components/sendToken";

function App() {
  const [transaction, setTransaction] = useState(null);

  const handleConfirmTransaction = (tx) => {
    setTransaction(tx);
  };

  return (
    <Router>
      <div className="w-full h-full p-6 bg-[#131722] text-white">
        <div className="flex flex-col items-center justify-center mt-0">
          <img src="/theta.png" width={95} />
          <h1 className="text-3xl font-bold pb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            ThetaEdgeX
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-4">
          <Link
            to="/"
            className="text-white-500 shadow-md hover:bg-[#19c99d] bg-[#1f2331] rounded-lg py-6 flex flex-col items-center"
          >
            <IconCloud size={30} />
            <span>Theta</span>
            <span> EdgeCloud</span>
          </Link>
          <Link
            to="/wallets"
            className="text-white-500 shadow-md hover:bg-[#19c99d] bg-[#1f2331] rounded-lg py-6 flex flex-col items-center"
          >
            <IconVideo size={30} />
            <span>Theta</span>
            <span> Video Services</span>
          </Link>
          <Link
            to="/nfts"
            className="text-white-500 shadow-md hover:bg-[#19c99d] bg-[#1f2331] rounded-lg py-6 flex flex-col items-center"
          >
            <IconPalette size={30} />
            <span>Theta</span>
            <span>NFTs</span>
          </Link>
          <Link
            to="/activity"
            className="text-white-500 shadow-md hover:bg-[#19c99d] bg-[#1f2331] rounded-lg py-6 flex flex-col items-center"
          >
            <IconWallet size={30} />
            <span>Theta</span>
            <span>Wallets</span>
          </Link>
          <Link
            to="/contracts"
            className="text-white-500 shadow-md hover:bg-[#19c99d] bg-[#1f2331] rounded-lg py-6 flex flex-col items-center"
          >
            <IconWallet size={30} />
            <span>Theta</span>
            <span>Doc</span>
          </Link>
          <Link
            to="/send-tokens"
            className="text-white-500 shadow-md hover:bg-[#19c99d] bg-[#1f2331] rounded-lg py-6 flex flex-col items-center"
          >
            <IconFileDots size={30} />
            <span>Theta</span>
            <span>VSCode Ext.</span>
          </Link>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/" component={Chains} />
            <Route path="/wallets" component={Wallets} />
            <Route path="/nfts" component={NFTs} />
            <Route path="/activity" component={Activity} />
            <Route path="/contracts" component={Contracts} />
            <Route path="/send-tokens" component={SendTokens} />
            <Route path="/confirm-transaction">
              <ConfirmTransaction
                transaction={transaction}
                onConfirm={() => console.log("Transaction confirmed")}
                onCancel={() => console.log("Transaction cancelled")}
              />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
