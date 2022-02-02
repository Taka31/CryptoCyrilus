import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Ping, Price } from './model/gecko';
import { Observable } from 'rxjs';
import { Data } from '@angular/router';

const httpOptions = {
  Headers : new HttpHeaders({
    'content-type':'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class CoingeckoService {

  constructor(private http : HttpClient) { }

  ping() : Observable<Ping>{
    return this.http.get<Ping>('https://api.coingecko.com/api/v3/ping');
  }

  price(coin:string) : Observable<Object>{
    return this.http.get<Object>(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`)
  }
}
