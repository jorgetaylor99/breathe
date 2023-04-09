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
          label: 'Peak Flow Scores',
          data: logs.map(row => row.peakflow),
          backgroundColor: 'rgb(54, 162, 235, 0.5)',
          borderColor: 'rgb(54, 162, 235)',
          pointStyle: 'circle',
          pointRadius: 5,
          pointHoverRadius: 10,
          tension: 0.4
        }
      ]
    },
  });
})();