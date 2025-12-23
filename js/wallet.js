const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
  manifestUrl: 'https://binggoweb3.netlify.app/tonconnect-manifest.json'
});

// CONNECT
async function connectWallet() {
  await tonConnectUI.connectWallet();
}

// DISCONNECT
async function disconnectWallet() {
  await tonConnectUI.disconnect();
  document.getElementById("walletStatus").innerText = "Not connected";
  document.getElementById("walletAddress").innerText = "-";
  document.getElementById("walletBalance").innerText = "-";
}

// LISTEN WALLET STATUS
tonConnectUI.onStatusChange(async wallet => {
  if (wallet) {
    const address = wallet.account.address;
    document.getElementById("walletStatus").innerText = "Connected";
    document.getElementById("walletAddress").innerText = address;

    // Fetch balance via TON API
    fetch(`https://tonapi.io/v2/accounts/${address}`)
      .then(res => res.json())
      .then(data => {
        const balance = data.balance / 1e9;
        document.getElementById("walletBalance").innerText = balance + " TON";
      });
  }
});