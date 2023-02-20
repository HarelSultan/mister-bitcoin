import { Component, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { lastValueFrom } from 'rxjs';
import { BitcoinService } from 'src/app/services/bitcoin/bitcoin.service';

interface Chart {
  title: string;
  type: ChartType;
  data: any[][];
  columns?: [string, string];
  options: {};
  width: number;
  height: number;
}

@Component({
  selector: 'statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss'],
})
export class StatisticPageComponent implements OnInit {
  constructor(private bitcoinService: BitcoinService) {}

  marketPriceData!: [number, number][];

  async ngOnInit(): Promise<void> {
    try {
      const marketPrice: any = await this.bitcoinService.getMarketPrice();
      const marketPriceData: any = marketPrice.values
        .slice(0, 50)
        .map((price: any) => {
          price.x = new Date(price.x).toLocaleDateString();
          return Object.values(price);
        });
      this.marketPriceData = marketPriceData;
      console.log(this.marketPriceData);
    } catch (err) {
      console.error('Failed to get market price data with error', err);
    }
  }

  marketPriceChart: Chart = {
    title: 'Market Price (USD)',
    type: ChartType.LineChart,
    data: this.marketPriceData,
    columns: ['Date', 'USD'],
    options: {},
    width: 550,
    height: 400,
  };
}
