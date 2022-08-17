var intervalID = setInterval(update_values,20000);

var temp, date, energy; 
var EnergyeChart;
var TemperatureChart;

var options={
    scales: {
        y: {
            beginAtZero: true
        }
    }
};

var data_temp = {
    labels: [],
    datasets: [{
      label: 'temperatures',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [],
    }]
};

var data_energy = {
    labels: [],
    datasets: [{
      label: 'energy',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
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
EnergyeChart =new Chart(
    ctx2,
    config2
  );

function update_values(){
  
  $.getJSON('/_sensors',
  function(data){
    $('#temperature1').text(data["temp"]);
    $('#temperature2').text(data["temp"]);
    $('#energy').text(data["power"]);
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
    addData(EnergyeChart,date,energy);
}

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}