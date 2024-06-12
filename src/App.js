import logo from "./logo.svg";
import "./App.css";

/// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

// import Chains from "../src/components/chains/index";

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
        <nav className="flex space-x-4 mb-4">
          <Link to="/" className="text-blue-500">
            Home
          </Link>
          <Link to="/wallets" className="text-blue-500">
            Wallets
          </Link>
          <Link to="/nfts" className="text-blue-500">
            NFTs
          </Link>
          <Link to="/activity" className="text-blue-500">
            Activity
          </Link>
          <Link to="/contracts" className="text-blue-500">
            Contracts
          </Link>
        </nav>
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
    </Router>
  );
}

export default App;
