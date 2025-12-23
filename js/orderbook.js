// ===============================
// BINGGO ORDERBOOK (FINAL)
// ===============================

// token aktif
window.currentTokenId = null;

// set token saat user klik market
window.setActiveToken = function (tokenId) {
  window.currentTokenId = tokenId;
  listenOrderbook();
};

// ===============================
// PLACE ORDER
// ===============================
window.placeOrder = function (type) {
  if (!window.currentTokenId) {
    alert("Select token first");
    return;
  }
  db.collection("fees").add({
  type: "order",
  amount: BINGGO_FEE.order,
  currency: "TON",
  user: auth.currentUser.uid,
  tokenId: currentTokenId,
  status: "pending",
  time: firebase.firestore.FieldValue.serverTimestamp()
});

  const priceInput = document.getElementById(type + "Price");
  const amountInput = document.getElementById(type + "Amount");

  if (!priceInput || !amountInput) {
    alert("Input not found");
    return;
  }

  const price = parseFloat(priceInput.value);
  const amount = parseFloat(amountInput.value);

  if (isNaN(price) || isNaN(amount) || price <= 0 || amount <= 0) {
    alert("Invalid price or amount");
    return;
  }

  db.collection("tokens")
    .doc(window.currentTokenId)
    .collection("orderbook")
    .add({
      type: type, // buy / sell
      price: price,
      amount: amount,
      user: auth.currentUser.uid,
      status: "pending",
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      priceInput.value = "";
      amountInput.value = "";
      alert("Order submitted (waiting approval)");
    })
    .catch(err => {
      console.error(err);
      alert("Failed to submit order");
    });
};

// ===============================
// LISTEN ORDERBOOK
// ===============================
function listenOrderbook() {
  if (!window.currentTokenId) return;

  db.collection("tokens")
    .doc(window.currentTokenId)
    .collection("orderbook")
    .where("status", "==", "approved")
    .onSnapshot(snapshot => {

      const buyBox = document.getElementById("buyOrders");
      const sellBox = document.getElementById("sellOrders");

      if (!buyBox || !sellBox) return;

      buyBox.innerHTML = "";
      sellBox.innerHTML = "";

      const buyOrders = [];
      const sellOrders = [];

      snapshot.forEach(doc => {
        const o = doc.data();

        if (o.type === "buy") buyOrders.push(o);
        if (o.type === "sell") sellOrders.push(o);
      });

      // SORT ORDERBOOK
      buyOrders.sort((a, b) => b.price - a.price);
      sellOrders.sort((a, b) => a.price - b.price);

      // RENDER ORDERBOOK
      buyOrders.forEach(o => {
        const row = document.createElement("div");
        row.className = "order-row buy";
        row.innerHTML = `
          <span>${o.price}</span>
          <span>${o.amount}</span>
        `;
        buyBox.appendChild(row);
      });

      sellOrders.forEach(o => {
        const row = document.createElement("div");
        row.className = "order-row sell";
        row.innerHTML = `
          <span>${o.price}</span>
          <span>${o.amount}</span>
        `;
        sellBox.appendChild(row);
      });

      // UPDATE DEPTH CHART
      if (typeof renderDepthChart === "function") {
        renderDepthChart(buyOrders, sellOrders);
      }
    });
}