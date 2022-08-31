var intervalID = setInterval(update_values,20000);

var temp, date, energy; 
var EnergyChart;
var TemperatureChart;

var options={
    maintainAspectRatio:false,
    scales: {
      x:{
        min : 0,
        max :180
      },
        y: {
            beginAtZero: true
        }
    }
};

var data_temp = {
    labels: [],
    datasets: [{
      label: 'temperatures',
      backgroundColor: 'rgb(6, 120, 152)',
      borderColor: 'rgb(6, 120, 152)',
      data: [],
    }]
};

var data_energy = {
    labels: [],
    datasets: [{
      label: 'energy',
      backgroundColor: 'rgb(227, 177, 39)',
      borderColor: 'rgb(227, 177, 39)',
      data: [],
    }]
};

const config1 = {
    type: 'line',
    data: data_temp,
    options: options
};

const config2 = {
    type: 'line',
    data: data_energy,
    options: options
};

var ctx1 =document.getElementById("TemperatureChart").getContext("2d");
TemperatureChart = new Chart(
    ctx1,
    config1
  );



var ctx2 =document.getElementById("EnergyChart").getContext("2d");
EnergyChart =new Chart(
    ctx2,
    config2
  );





function update_values(){
  //'http://10.24.0.184/_sensors'
  $.getJSON('/_sensors',
  function(data){
    $('#temperature1').text(data["temp"]);
    $('#temperature2').text(data["temp"]);
    //$('#energy').text(data["power"]);
    $('#power').text(data["power"]);
    $('#date1').text(data["date"]);
    $('#date2').text(data["date"]);
    $('#date3').text(data["date"]);
    $('#date4').text(data["date"]);

    temp = data.temp;
    date = data.date;
    energy = data.power;

    console.log(date);
    console.log(energy);
    console.log(temp);
  });

    addData(TemperatureChart,date,temp);
    addData(EnergyChart,date,energy);
};

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    
    chart.update();
    
};

function scroller(scroll,chart){
  console.log(scroll)
  const datalength = chart.data.labels.length;
  if(scroll.deltaY > 0){
    if(chart.config.options.scales.x.max >= datalength ){
      chart.config.options.scales.x.min = datalength-180;
      chart.config.options.scales.x.max = datalength;
    }
    else{
      chart.config.options.scales.x.min +=1;
      chart.config.options.scales.x.max +=1;
    }
    
  }
  else if (scroll.deltaY < 0){
    if(chart.config.options.scales.x.min <= 0  ){
      chart.config.options.scales.x.min =0;
      chart.config.options.scales.x.max =180;
    }
    else{
      chart.config.options.scales.x.min -=1;
      chart.config.options.scales.x.max -=1;
    }
  }
  else{
    //nothing
  }

};

TemperatureChart.canvas.addEventListener('wheel',(e) =>{
  scroller(e,TemperatureChart);
});
