import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { IconHome } from "@tabler/icons-react";
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
      <div className="w-full h-full p-4 bg-gray-100">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Link to="/" className="text-blue-500 flex flex-col items-center">
            <IconHome />
            <span>Home</span>
          </Link>
          <Link
            to="/wallets"
            className="text-blue-500 flex flex-col items-center"
          >
            <IconHome />
            <span>Wallets</span>
          </Link>
          <Link to="/nfts" className="text-blue-500 flex flex-col items-center">
            <IconHome />
            <span>NFTs</span>
          </Link>
          <Link
            to="/activity"
            className="text-blue-500 flex flex-col items-center"
          >
            <IconHome />
            <span>Activity</span>
          </Link>
          <Link
            to="/contracts"
            className="text-blue-500 flex flex-col items-center"
          >
            <IconHome />
            <span>Contracts</span>
          </Link>
          <Link
            to="/send-tokens"
            className="text-blue-500 flex flex-col items-center"
          >
            <IconHome />
            <span>Send</span>
          </Link>
          <Link
            to="/settings"
            className="text-blue-500 flex flex-col items-center"
          >
            <IconHome />
            <span>Settings</span>
          </Link>
          <Link to="/help" className="text-blue-500 flex flex-col items-center">
            <IconHome />
            <span>Help</span>
          </Link>
        </div>
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
          {/* Add routes for Settings and Help if needed */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
