let wallet;

async function connectWallet(){
  if(wallet) return;
  wallet = new TonConnectUI();
  await wallet.connect();

  const address = wallet.account;
  const balance = await wallet.getBalance(); // TON balance
  const tokens = await wallet.getTokens(); // user tokens

  updateWalletUI({address, balance, tokens});
}

function disconnectWallet(){
  if(!wallet) return;
  wallet.disconnect();
  wallet = null;
  updateWalletUI({address:'-', balance:'0 TON', tokens:[]});
}

function updateWalletUI(walletInfo){
  document.getElementById("walletAddress").innerText = walletInfo.address || "-";
  document.getElementById("walletBalance").innerText = walletInfo.balance || "0 TON";

  const tokenDiv = document.getElementById("userTokens");
  tokenDiv.innerHTML = "";
  walletInfo.tokens?.forEach(t=>{
    const el = document.createElement("div");
    el.innerText = `${t.symbol}: ${t.amount}`;
    tokenDiv.appendChild(el);
  });
}