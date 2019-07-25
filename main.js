/* USE COINDESK API */

function updateCoinDeskApi (startDate, endDate) {
  return axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)
}

/* CREATE CHART WITH CHART.JS */

function printChart(chartName,chartLabels,chartData) {
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: chartLabels,
        datasets: [{
            label: chartName,
            data: chartData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
  });
}

/* USE DATA FROM COINDESK TO DISPLAY CHART WITH CHART.JS */

function printChartWithData(result) {
  let chartName = "Historical data"
  let labels = Object.keys(result.data.bpi);
  let data = Object.values(result.data.bpi);
  printChart(chartName,labels,data)
}

/* PRINT DEFAULT CHART */

function defaultChart() {
  axios.get("http://api.coindesk.com/v1/bpi/historical/close.json")
  .then(result => {
    printChartWithData(result);
  })
  .catch(err=> {
    console.log(err)
  })
}

defaultChart();

/* PRINT CHART WITH CHOOSEN DATES */

function printHistoricalData(startDate,endDate) {
  updateCoinDeskApi(startDate, endDate)
  .then(result => {
    printChartWithData(result);
  })
  .catch(err=> {
    console.log(err)
  })
}

/* ADD EVENT LISTENERS TO PRINT CHART EACH TIME THE DATES CHANGE */

$("#start-date").change(function(){
  let newStartDate = $("#start-date").val();
  let newEndDate = $("#end-date").val();
  printHistoricalData(newStartDate, newEndDate)
})
$("#end-date").change(function(){
  let newStartDate = $("#start-date").val();
  let newEndDate = $("#end-date").val();
  printHistoricalData(newStartDate, newEndDate)
})