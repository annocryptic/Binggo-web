// ===========================
// AUTH CHECK
// ===========================
firebase.auth().onAuthStateChanged(async user => {
  if (!user) {
    alert("Login required");
    return location.href = "../login.html";
  }

  const adminDoc = await db.collection("admins").doc(user.uid).get();
  if (!adminDoc.exists) {
    alert("Not authorized");
    return location.href = "../dashboard.html";
  }

  loadOrders();
  loadTokens();
  loadTasks();
});

// ===========================
// ORDERS
// ===========================
function loadOrders() {
  db.collectionGroup("orderbook")
    .where("status", "==", "pending")
    .onSnapshot(snap => {
      orders.innerHTML = "";
      snap.forEach(doc => {
        const o = doc.data();

        orders.innerHTML += `
          <div class="card">
            ${o.type.toUpperCase()} | ${o.price} x ${o.amount}
            <br>
            <button onclick="approve('${doc.ref.path}')">Approve</button>
            <button onclick="reject('${doc.ref.path}')">Reject</button>
          </div>
        `;
      });
    });
}

// ===========================
// TOKENS
// ===========================
function loadTokens() {
  db.collection("tokens")
    .where("approved", "==", false)
    .onSnapshot(snap => {
      tokens.innerHTML = "";
      snap.forEach(doc => {
        const t = doc.data();

        tokens.innerHTML += `
          <div class="card">
            ${t.name} (${t.symbol})
            <br>
            <button onclick="approveToken('${doc.id}')">Approve</button>
          </div>
        `;
      });
    });
}

// ===========================
// TASKS
// ===========================
function loadTasks() {
  db.collection("tasks")
    .where("approved", "==", false)
    .onSnapshot(snap => {
      tasks.innerHTML = "";
      snap.forEach(doc => {
        const t = doc.data();

        tasks.innerHTML += `
          <div class="card">
            ${t.title}
            <br>
            <button onclick="approveTask('${doc.id}')">Approve</button>
          </div>
        `;
      });
    });
}

// ===========================
// ACTIONS
// ===========================
function approve(path) {
  db.doc(path).update({ status: "approved" });
}

function reject(path) {
  db.doc(path).delete();
}

function approveToken(id) {
  db.collection("tokens").doc(id).update({ approved: true });
}

function approveTask(id) {
  db.collection("tasks").doc(id).update({ approved: true });
}

function loadFees() {
  db.collection("fees")
    .where("status", "==", "pending")
    .onSnapshot(snap => {
      fees.innerHTML = "";
      snap.forEach(doc => {
        const f = doc.data();
        fees.innerHTML += `
          <div class="card">
            ${f.type} | ${f.amount} TON
            <br>
            <button onclick="markPaid('${doc.id}')">Mark Paid</button>
          </div>
        `;
      });
    });
}

function markPaid(id) {
  db.collection("fees").doc(id).update({
    status: "paid"
  });
}