var intervalID = setInterval(update_values,20000);
var temp, date, energy; 
var ctx =document.getElementById("TemperatureChart").getContext("2d");

var EnergyeChart;
var TemperatureChart;

TemperatureChart =new Chart (ctx, {
    type: 'line',
    data :{
        datasets:[{
            label: 'time',
            data:[],
        },
        {
            label: 'temperature',
            data:[],
            backgroundColor :[
                'rgba(102,255,153,1',
            ],
            borderColor :[
                'rgba (255,0,0,1)',
            ],
            borderWidth: 1
        }
           
        ]
    },
    // options:{
    //     scales:{
    //         yAxes :[{
    //             ticks :{
    //                 beginAtZero : true
    //             }
    //         }]
    //     }
    // }
});

var ctx =document.getElementById("EnergyChart").getContext("2d");
EnergyeChart =new Chart (ctx, {
    type: 'line',
    data :{
        datasets:[{
            label: 'time',
            data:[],
        },
        {
            label: 'energy',
            data:[],
            backgroundColor :[
                'rgba(102,255,153,1',
            ],
            borderColor :[
                'rgba (255,0,0,1)',
            ],
            borderWidth: 1
        }]
    },
    // options:{
    //     scales:{
    //         yAxes :[{
    //             ticks :{
    //                 beginAtZero : true
    //             }
    //         }]
    //     }
    // }
});



function update_values(){
  
  $.getJSON('/_sensors',
  function(data){
    $('#temperature1').text(data["temp"]);
    $('#temperature2').text(data["temp"]);
    $('#energy').text(data["power"]);
    $('#power').text(data["power"]);
    $('#date').text(data["date"]);

    temp = data.temp;
    date = data.date;
    energy = data.power;

    console.log(date);
    console.log(energy);
    console.log(temp);
  });

  /* update chart*/ 
 
  TemperatureChart.data.datasets.forEach(function(dataset){
    dataset.data.push({
        x:date,
        y:temp
      });
  });

 
  EnergyChart.data.datasets.forEach(function(dataset){
    dataset.data.push({
        x:date,
        y:energy
    });
  });
  TemperatureChart.update();
  EnergyChart.update();
}

