import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartData } from 'src/app/models/chart.model';
Chart.register(...registerables);

@Component({
  selector: 'market-price-chart',
  templateUrl: './market-price-chart.component.html',
  styleUrls: ['./market-price-chart.component.scss'],
})
export class MarketPriceChartComponent implements OnInit {
  @Input() marketPriceData!: ChartData;

  ngOnInit(): void {
    const { values: pricesData } = this.marketPriceData;
    const marketPriceChart = new Chart('marketPriceChart', {
      type: 'line',
      data: {
        labels: pricesData.map((val) =>
          new Date(val.x * 1000).toLocaleDateString()
        ),
        datasets: [
          {
            label: 'Market Price (USD)',
            data: pricesData.map((price) => price.y),
            tension: 0.1,

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
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
