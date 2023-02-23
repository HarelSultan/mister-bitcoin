import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { ChartType } from 'angular-google-charts';
import { lastValueFrom, Observable, Subscription } from 'rxjs';
import { ChartData } from 'src/app/models/chart.model';
import { User } from 'src/app/models/user.model';
import { BitcoinService } from 'src/app/services/bitcoin/bitcoin.service';

// *ngIf="marketPriceData$ | async as marketPriceData && transactionData$ | async as transactionData"

@Component({
  selector: 'statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss'],
})
export class StatisticPageComponent implements OnInit {
  constructor(
    private bitcoinService: BitcoinService,
    private route: ActivatedRoute
  ) {}

  marketPriceData$!: Observable<ChartData>;
  transactionData$!: Observable<ChartData>;
  user!: User;
  rate$!: Observable<number>;
  subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(({ user }) => {
      this.user = user;
    });
    this.marketPriceData$ = this.bitcoinService.getMarketPrice();
    this.transactionData$ = this.bitcoinService.getConfirmedTransactions();
    this.rate$ = this.bitcoinService.getRate();
    console.log(this.marketPriceData$);
    console.log(this.transactionData$);
  }
}

// interface Chart {
//   title: string;
//   type: ChartType;
//   data: any[][];
//   columns?: [string, string];
//   options: {};
//   width: number;
//   height: number;
// }

// async ngOnInit(): Promise<void> {
//   try {
//     const marketPrice: any = await this.bitcoinService.getMarketPrice();
//     const marketPriceData: any = marketPrice.values
//       .slice(0, 50)
//       .map((price: any) => {
//         price.x = new Date(price.x).toLocaleDateString();
//         return Object.values(price);
//       });
//     this.marketPriceData = marketPriceData;
//     console.log(this.marketPriceData);
//   } catch (err) {
//     console.error('Failed to get market price data with error', err);
//   }
// }

// marketPriceChart: Chart = {
//   title: 'Market Price (USD)',
//   type: ChartType.LineChart,
//   data: this.marketPriceData,
//   columns: ['Date', 'USD'],
//   options: {},
//   width: 550,
//   height: 400,
// };
