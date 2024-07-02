chrome.runtime.onConnectExternal.addListener((port) => {
  port.onMessage.addListener((msg) => {
    if (msg.type === "CONNECT") {
      port.postMessage({ type: "CONNECTED" });
    } else if (msg.type === "SIGN_TRANSACTION") {
      const { transaction } = msg;
      const signedTransaction = signTransaction(transaction);
      port.postMessage({ type: "SIGNED_TRANSACTION", signedTransaction });
    }
  });
});

function signTransaction(transaction) {}
