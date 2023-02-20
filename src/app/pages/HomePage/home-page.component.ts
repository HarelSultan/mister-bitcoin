import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { BitcoinService } from 'src/app/services/bitcoin/bitcoin.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private userService: UserService,
    private bitcoinService: BitcoinService
  ) {}

  user: User | undefined;
  rate!: number;

  async ngOnInit(): Promise<void> {
    this.user = this.userService.getUser();
    try {
      this.bitcoinService.getMarketPrice();
      this.bitcoinService.getConfirmedTransactions();
      this.rate = await this.bitcoinService.getRate();
      console.log(this.rate);
    } catch (err) {
      console.error('Failed to get coins rate with error:', err);
    }
  }
  // async ngOnInit(): Promise<void> {
  //   this.user = this.userService.getUser();
  //   await this.bitcoinService.getMarketPrice().subscribe({
  //     next: (res) => (this.marketPrice = res),
  //     error: (err) => console.log(err),
  //   });
  // }
}
