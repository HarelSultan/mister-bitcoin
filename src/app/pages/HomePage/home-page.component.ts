import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ChartData } from 'src/app/models/chart.model';
import { User } from 'src/app/models/user.model';
import { BitcoinService } from 'src/app/services/bitcoin/bitcoin.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private bitcoinService: BitcoinService,
    private route: ActivatedRoute
  ) {}

  user: User | null = null;
  rate$!: Observable<number>;
  transactionData$!: Observable<ChartData>;

  subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(({ user }) => {
      this.user = user;
    });
    this.transactionData$ = this.bitcoinService.getConfirmedTransactions();
    this.rate$ = this.bitcoinService.getRate();
    console.log(this.rate$);
  }
  // async ngOnInit(): Promise<void> {
  //   this.user = this.userService.getUser();
  //   await this.bitcoinService.getMarketPrice().subscribe({
  //     next: (res) => (this.marketPrice = res),
  //     error: (err) => console.log(err),
  //   });
  // }
}
