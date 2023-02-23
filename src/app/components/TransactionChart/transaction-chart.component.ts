import { Component, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartData } from 'src/app/models/chart.model';
Chart.register(...registerables);

@Component({
  selector: 'transaction-chart',
  templateUrl: './transaction-chart.component.html',
  styleUrls: ['./transaction-chart.component.scss'],
})
export class TransactionChartComponent {
  @Input() transactionData!: ChartData;

  ngOnInit(): void {
    const confirmedTransactions = this.transactionData.values.splice(
      this.transactionData.values.length - 20
    );
    const transactionChart = new Chart('transactionChart', {
      type: 'line',
      data: {
        labels: confirmedTransactions.map((transaction, idx) => {
          return idx % 5 === 0
            ? new Date(transaction.x * 1000).toLocaleDateString()
            : '';
        }),
        // Getting the specific date for each trade
        datasets: [
          {
            label: 'Exchange Trade Volume (USD)',
            data: confirmedTransactions.map((transaction) => transaction.y),
            // Getting total usd value of trading
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            ticks: {
              autoSkip: false,
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
