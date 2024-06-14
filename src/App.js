import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home";
import Cloud from "./components/cloud";
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
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/cloud" component={Cloud} />
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
    </Router>
  );
}

export default App;
