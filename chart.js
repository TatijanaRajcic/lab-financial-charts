class financialChart {
  constructor(chart){
    this.chartName;
    this.chartLabels;
    this.chartData;
    this.ctx;
    this.chart;
  }

  createChart() {
    this.chart = new Chart(this.ctx, {
    type: 'line',
    data: {
        labels: this.chartLabels,
        datasets: [{
            label: this.chartName,
            data: this.chartData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
      },
    });
  }
  
}