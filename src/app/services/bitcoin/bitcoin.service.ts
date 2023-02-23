import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BitcoinService {
  constructor(private http: HttpClient) {}

  BASE_URL = 'https://api.blockchain.info/charts/';
  private rateStorageKey = 'rate_DB';
  private marketPriceStorageKey = 'price_DB';
  private transactionStorageKey = 'transaction_DB';

  public getRate() {
    const url = 'https://blockchain.info/tobtc?currency=USD&value=1';
    return this.getResult(this.rateStorageKey, url);
  }

  public getMarketPrice() {
    const url = `${this.BASE_URL}market-price?timespan=5months&format=json&cors=true`;
    return this.getResult(this.marketPriceStorageKey, url);
  }

  public getConfirmedTransactions() {
    const url = `${this.BASE_URL}trade-volume?timespan=5months&format=json&cors=true`;
    return this.getResult(this.transactionStorageKey, url);
  }

  private getResult(entityType: string, url: string) {
    const res = loadFromStorage(entityType);
    if (res) return of(res);
    return this.http
      .get<any>(url)
      .pipe(tap((res) => saveToStorage(entityType, res)));
  }
}

function saveToStorage(key: string, value: any) {
  const data: any = JSON.stringify(value) || null;
  localStorage.setItem(key, data);
}

function loadFromStorage(key: string) {
  let data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}
