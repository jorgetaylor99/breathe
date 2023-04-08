(function() {
  const chartElement = document.getElementById('chart');
  const logsString = chartElement.getAttribute('data-logs');
  const logs = JSON.parse(decodeURIComponent(logsString));

  new Chart(chartElement, {
    type: 'line',
    data: {
      labels: logs.map(row => new Date(row.timestamp).toLocaleDateString()),
      datasets: [
        {
          label: 'Peak Flow',
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgb(54, 162, 235)',
          data: logs.map(row => row.peakflow),
        }
      ]
    },
  });
})();