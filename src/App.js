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
import SketchTo3D from "./components/cloudX/SketchTo3D";
import Whisper from "./components/cloudX/Whisper";
import Llama from "./components/cloudX/Llama";
import ChatGPT from "./components/cloudX/Chatgpt";
import Video from "./components/video";
import UploadVideo from "./components/videoX/UploadVideo";
import AllVideos from "./components/videoX/AllVideos";
import StartStream from "./components/videoX/StartStream";
function App() {
  const [transaction, setTransaction] = useState(null);

  const handleConfirmTransaction = (tx) => {
    setTransaction(tx);
  };

  return (
    <div className="font-Inter">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/cloud" component={Cloud} />
          <Route path="/wallets" component={Wallets} />
          <Route path="/video" component={Video} />
          <Route path="/nfts" component={NFTs} />
          <Route path="/activity" component={Activity} />
          <Route path="/contracts" component={Contracts} />
          <Route path="/send-tokens" component={SendTokens} />
          <Route path="/sketch-to-3d" component={SketchTo3D} />
          <Route path="/whisper" component={Whisper} />
          <Route path="/llama" component={Llama} />
          <Route path="/chatgpt" component={ChatGPT} />
          <Route path="/upload-video" component={UploadVideo} />
          <Route path="/all-videos" component={AllVideos} />
          <Route path="/start-stream" component={StartStream} />
          <Route path="/confirm-transaction">
            <ConfirmTransaction
              transaction={transaction}
              onConfirm={() => console.log("Transaction confirmed")}
              onCancel={() => console.log("Transaction cancelled")}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
