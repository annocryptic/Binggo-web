// Hanya TON market
const marketTokens = [
  {symbol:"TON", price:1.0, status:"active"},
  {symbol:"$BING", price:0, status:"coming-soon"}
];

function loadMarket(){
  const marketDiv = document.getElementById("marketList");
  marketDiv.innerHTML="";
  marketTokens.forEach(t=>{
    const div=document.createElement("div");
    div.className="market-item";
    div.innerHTML=`<b>${t.symbol}</b> : ${t.status==="active"? "$"+t.price.toFixed(4) : "Coming Soon"}`;
    marketDiv.appendChild(div);
  });
}

// Orderbook dummy
let orderBook={buy:[], sell:[]};

function placeOrder(type){
  if(type==="buy" || type==="sell"){
    alert("Orderbook disabled for this demo / $BING coming soon");
  }
}

document.addEventListener("DOMContentLoaded",()=>loadMarket());