// Example token market
const marketTokens = [
  {symbol:"TON", price:1.0},
  {symbol:"BNG", price:0.05},
  {symbol:"XYZ", price:0.12}
];

function loadMarket(){
  const marketDiv = document.getElementById("marketList");
  marketDiv.innerHTML = "";
  marketTokens.forEach(token=>{
    const div = document.createElement("div");
    div.classList.add("market-item");
    div.innerText = `${token.symbol}: $${token.price.toFixed(4)}`;
    marketDiv.appendChild(div);
  });
}

// Orderbook
let orderBook = {buy:[], sell:[]};

function placeOrder(type){
  const priceInput = document.getElementById(type=="buy"?"buyPrice":"sellPrice");
  const amountInput = document.getElementById(type=="buy"?"buyAmount":"sellAmount");

  const price = parseFloat(priceInput.value);
  const amount = parseFloat(amountInput.value);

  if(!price || !amount) return alert("Enter price & amount");

  orderBook[type].push({price, amount});
  renderOrderBook();
  priceInput.value=""; amountInput.value="";
}

function renderOrderBook(){
  const buyDiv = document.querySelector("#trading .order-grid div:nth-child(1)");
  const sellDiv = document.querySelector("#trading .order-grid div:nth-child(2)");

  buyDiv.innerHTML = "<h4>Buy</h4>";
  orderBook.buy.forEach(o=>{
    const el = document.createElement("div");
    el.innerText=`${o.amount} @ ${o.price}`;
    buyDiv.appendChild(el);
  });

  sellDiv.innerHTML = "<h4>Sell</h4>";
  orderBook.sell.forEach(o=>{
    const el = document.createElement("div");
    el.innerText=`${o.amount} @ ${o.price}`;
    sellDiv.appendChild(el);
  });
}

// Init
document.addEventListener("DOMContentLoaded",()=>{
  loadMarket();
});