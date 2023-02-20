import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BitcoinService {
  constructor(private http: HttpClient) {}

  public getRate() {
    return lastValueFrom(
      this.http.get<number>(
        'https://blockchain.info/tobtc?currency=USD&value=1'
      )
    );
  }

  public getMarketPrice() {
    return lastValueFrom(
      this.http
        .get(
          'https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true'
        )
        .pipe(tap((res) => console.log(res)))
    );
  }

  public getConfirmedTransactions() {
    return lastValueFrom(
      this.http
        .get(
          'https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true'
        )
        .pipe(tap((res) => console.log(res)))
    );
  }
}
