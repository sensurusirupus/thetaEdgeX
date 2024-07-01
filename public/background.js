chrome.runtime.onConnectExternal.addListener((port) => {
  port.onMessage.addListener((msg) => {
    if (msg.type === "CONNECT") {
      // Handle DApp connection request
      port.postMessage({ type: "CONNECTED" });
    } else if (msg.type === "SIGN_TRANSACTION") {
      const { transaction } = msg;
      const signedTransaction = signTransaction(transaction); // Implement signTransaction function
      port.postMessage({ type: "SIGNED_TRANSACTION", signedTransaction });
    }
  });
});

function signTransaction(transaction) {}
