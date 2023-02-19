import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BitcoinService {
  constructor(private http: HttpClient) {}

  public getRates(coins: number) {}

  public getMarketPrice() {
    return this.http
      .get<{ answer: number }>(
        'https://blockchain.info/tobtc?currency=USD&value=1'
      )
      .pipe(map((res) => res.answer));
  }

  public getConfirmedTransactions() {}
}
