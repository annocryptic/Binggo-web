// ===============================
// BINGGO TRADING
// ===============================

// element
const marketList = document.getElementById("marketList");

// ===============================
// LOAD MARKET TOKENS
// ===============================
function loadMarket() {
  db.collection("tokens")
    .where("approved", "==", true)
    .orderBy("created", "desc")
    .onSnapshot(snapshot => {
      marketList.innerHTML = "";

      snapshot.forEach(doc => {
        const t = doc.data();

        const row = document.createElement("div");
        row.className = "market-row";
        row.innerHTML = `
          <div>
            <b>${t.name}</b> (${t.symbol})
            <div style="font-size:12px;opacity:.7">
              Price: ${t.price}
            </div>
          </div>
        `;

        row.onclick = () => {
          selectToken(doc.id, t);
        };

        marketList.appendChild(row);
      });
    });
}

// ===============================
// SELECT TOKEN
// ===============================
function selectToken(tokenId, tokenData) {
  window.currentTokenId = tokenId;

  // load orderbook
  if (typeof setActiveToken === "function") {
    setActiveToken(tokenId);
  }

  // load chart placeholder (price label)
  const priceBox = document.getElementById("tokenPrice");
  if (priceBox) {
    priceBox.innerText = tokenData.price;
  }
}

// ===============================
// CREATE TOKEN (COMMUNITY)
// ===============================
window.createToken = function () {
  const name = document.getElementById("tName").value.trim();
  const symbol = document.getElementById("tSymbol").value.trim();
  const supply = parseFloat(document.getElementById("tSupply").value);
  const desc = document.getElementById("tDesc").value.trim();

  if (!name || !symbol || !supply) {
    alert("Complete all fields");
    return;
  }

  // === CREATE TOKEN DOC ===
  db.collection("tokens")
    .add({
      name: name,
      symbol: symbol,
      supply: supply,
      description: desc,
      price: window.currentTonPrice || 1,
      creator: auth.currentUser.uid,
      approved: false,
      created: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      // === CREATE FEE RECORD ===
      db.collection("fees").add({
        type: "token",
        amount: BINGGO_FEE.createToken,
        currency: "TON",
        user: auth.currentUser.uid,
        status: "pending",
        time: firebase.firestore.FieldValue.serverTimestamp()
      });

      alert("Token submitted. Waiting admin approval.");
      clearCreateForm();
    })
    .catch(err => {
      console.error(err);
      alert("Failed to create token");
    });
};

// ===============================
// CLEAR FORM
// ===============================
function clearCreateForm() {
  document.getElementById("tName").value = "";
  document.getElementById("tSymbol").value = "";
  document.getElementById("tSupply").value = "";
  document.getElementById("tDesc").value = "";
}

// ===============================
// INIT
// ===============================
loadMarket();