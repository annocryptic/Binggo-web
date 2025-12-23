document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("chart");
  if (!container) return;

  const chart = LightweightCharts.createChart(container, {
    height: 400,
    layout: {
      background: { color: "#0b1020" },
      textColor: "#d1d4dc"
    }
  });

  const candleSeries = chart.addSeries(
    LightweightCharts.CandlestickSeries
  );

  window.loadTokenChart = function (tokenId) {
    db.collection("tokens")
      .doc(tokenId)
      .collection("prices")
      .orderBy("time")
      .limit(100)
      .onSnapshot(snapshot => {

        const data = [];

        snapshot.forEach(doc => {
          const p = doc.data();
          data.push({
            time: p.time.seconds,
            open: p.open,
            high: p.high,
            low: p.low,
            close: p.close
          });
        });

        candleSeries.setData(data);
      });
  };
});