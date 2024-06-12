chrome.runtime.onConnectExternal.addListener((port) => {
  port.onMessage.addListener((msg) => {
    if (msg.type === "CONNECT") {
      // Handle DApp connection request
      port.postMessage({ type: "CONNECTED" });
    } else if (msg.type === "SIGN_TRANSACTION") {
      // Handle transaction signing request
      const { transaction } = msg;
      // Sign the transaction
      const signedTransaction = signTransaction(transaction); // Implement signTransaction function
      port.postMessage({ type: "SIGNED_TRANSACTION", signedTransaction });
    }
  });
});

function signTransaction(transaction) {
  // Implement your transaction signing logic here
}
