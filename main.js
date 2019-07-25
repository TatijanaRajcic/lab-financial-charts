/* USE COINDESK API */

function coinDeskApi (startDate, endDate, currency) {
  return axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`)
}

/* REMOVE CANVAS EVERY TIME A CHART IS CREATED */
function removeCanvas() {
  $("#myChart").remove();
  $(".canvas-container").append('<canvas id="myChart"></canvas>');
}

/* USE DATA FROM COINDESK TO DISPLAY CHART WITH CHART.JS */

function printChartWithData(result) {
  removeCanvas();
  let chart = new financialChart()
  chart.ctx = document.getElementById('myChart').getContext('2d');
  chart.chartName = "Historical data";
  chart.chartLabels = Object.keys(result.data.bpi);
  chart.chartData = Object.values(result.data.bpi);
  chart.createChart();
}

/* PRINT CHART WITH CHOOSEN DATES AND CURRENCY */

function printFinalChart() {
  let startDate = $("#start-date").val();
  let endDate = $("#end-date").val();
  let currency = $("#currency").val();
  coinDeskApi(startDate, endDate, currency)
  .then(result => {
    printChartWithData(result);
    let values = Object.values(result.data.bpi);
    printMinMax(Math.min(...values),Math.max(...values));
  })
  .catch(err=> {
    console.log(err)
  })
}

/* MIN-MAX VALUES */

function printMinMax(minimum, maximum){
  $("#min-value").html(minimum);
  $("#max-value").html(maximum);
}

/* CURRENCIES */

for (i=0; i < Object.values(currencies).length; i++) {
  let currency = Object.values(currencies)[i];
  $("#currency").append(`<option value="${currency.code}">${currency.name}</option>`)
}

/* EXECUTE */

/* default chart */
let defaultStartDate = moment().subtract(1, 'months').format('YYYY-MM-DD');
let defaultEndDate = moment().format("YYYY-MM-DD");
let defaultCurrency = "EUR";
$("#start-date").val(defaultStartDate);
$("#end-date").val(defaultEndDate);
$("#currency").val(defaultCurrency);
printFinalChart();

/* redraw chart at every change */
$("#start-date").change(function(){printFinalChart()})
$("#end-date").change(function(){printFinalChart()})
$("#currency").change(function(){printFinalChart()})