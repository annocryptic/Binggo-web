async function loadTonPrice() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd"
    );
    const data = await res.json();

    const price = data["the-open-network"].usd;
    document.getElementById("tonPrice").innerText =
      "$" + price.toFixed(2);

    window.currentTonPrice = price;
  } catch (e) {
    document.getElementById("tonPrice").innerText = "Unavailable";
  }
}

loadTonPrice();