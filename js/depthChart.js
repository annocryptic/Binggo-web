const ctx = document.getElementById('depthChart').getContext('2d');
const depthChart = new Chart(ctx, {
  type:'line',
  data:{
    labels:[],
    datasets:[{
      label:'TON Price',
      data:[],
      borderColor:'#38bdf8',
      backgroundColor: ctx.createLinearGradient(0,0,0,400),
      fill:true,
      tension:0.3,
      pointRadius:0
    }]
  },
  options:{
    responsive:true,
    plugins:{legend:{display:false}},
    scales:{
      x:{display:true, title:{display:true,text:'Time'}},
      y:{display:true, title:{display:true,text:'Price (TON)'}}
    }
  }
});

// Simulasi TON price live
let labels=[], data=[];
function simulateTONPrice(){
  const lastPrice = data.length?parseFloat(data[data.length-1]):1;
  const newPrice = (lastPrice + (Math.random()*0.02-0.01)).toFixed(4);
  const time = new Date().toLocaleTimeString();

  labels.push(time); data.push(newPrice);
  if(labels.length>20){ labels.shift(); data.shift(); }

  depthChart.data.labels = labels;
  depthChart.data.datasets[0].data = data;
  depthChart.update();
}
setInterval(simulateTONPrice,2000);