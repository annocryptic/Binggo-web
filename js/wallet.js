let wallet = null;

async function connectWallet(){
  try{
    if(wallet) return;
    wallet = new TonConnectUI();
    await wallet.connect();

    const address = wallet.account;
    const balance = await wallet.getBalance(); // TON balance
    const tokens = await wallet.getTokens();

    updateWalletUI({address, balance, tokens});
  }catch(e){
    alert("Wallet connection failed: "+e.message);
  }
}

function disconnectWallet(){
  if(!wallet) return;
  wallet.disconnect();
  wallet=null;
  updateWalletUI({address:"-", balance:"0 TON", tokens:[]});
}

function logout(){
  disconnectWallet();
  firebase.auth().signOut().then(()=>window.location.href="login.html");
}

function updateWalletUI(walletInfo){
  document.getElementById("walletAddress").innerText = walletInfo.address || "-";
  document.getElementById("walletBalance").innerText = walletInfo.balance || "0 TON";

  const tokenDiv = document.getElementById("userTokens");
  tokenDiv.innerHTML = "";
  tokenDiv.innerHTML = `<div>TON: ${walletInfo.balance || 0}</div>
                        <div>$BING: Coming Soon</div>`;
}