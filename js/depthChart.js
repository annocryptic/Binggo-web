const ctx = document.getElementById('depthChart').getContext('2d');
const depthChart = new Chart(ctx, {
    type:'line',
    data:{
        labels: [],
        datasets:[{
            label:'Price',
            data:[],
            borderColor:'#38bdf8',
            backgroundColor:'rgba(56,221,248,0.2)',
            fill:true
        }]
    },
    options:{
        responsive:true,
        scales:{
            x:{display:true},
            y:{display:true}
        }
    }
});

// Example update live TON price every 3s
let labels=[], data=[];
function simulateMarket(){
    const price = 1 + Math.random()*0.02 - 0.01; // random ±1%
    const time = new Date().toLocaleTimeString();

    labels.push(time);
    data.push(price.toFixed(4));
    if(labels.length>20){ labels.shift(); data.shift(); }

    depthChart.data.labels = labels;
    depthChart.data.datasets[0].data = data;
    depthChart.update();
}

setInterval(simulateMarket,3000);