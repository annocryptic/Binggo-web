const firebaseConfig = {
  apiKey: "AIzaSyCCZ3nk_OVDadBnPJ63zAWE0F5pyMVeVQg",
  authDomain: "binggo-6e685.firebaseapp.com",
  projectId: "binggo-6e685",
  appId: "1:838650427754:web:41e19da85d3f6061e0cd13"
};
// INIT
firebase.initializeApp(firebaseConfig);

// SERVICES
const auth = firebase.auth();
const db = firebase.firestore();

window.BINGGO_FEE = {
  createToken: 1,     // 1 TON
  order: 0.01,        // 0.01 TON per order
  task: 0.5           // 0.5 TON
};