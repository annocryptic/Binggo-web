let depthChart;

function renderDepthChart(buys, sells) {
  const buyData = buys
    .sort((a, b) => a.price - b.price)
    .map(o => ({ x: o.price, y: o.amount }));

  const sellData = sells
    .sort((a, b) => a.price - b.price)
    .map(o => ({ x: o.price, y: o.amount }));

  if (depthChart) depthChart.destroy();

  depthChart = new Chart(
    document.getElementById("depthChart"),
    {
      type: "line",
      data: {
        datasets: [
          {
            label: "Buy Depth",
            data: buyData,
            borderColor: "#22c55e",
            backgroundColor: "rgba(34,197,94,0.2)",
            fill: true,
            stepped: true
          },
          {
            label: "Sell Depth",
            data: sellData,
            borderColor: "#ef4444",
            backgroundColor: "rgba(239,68,68,0.2)",
            fill: true,
            stepped: true
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { title: { display: true, text: "Price" } },
          y: { title: { display: true, text: "Amount" } }
        }
      }
    }
  );
}