import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Ping, Price } from './model/gecko';
import { Observable } from 'rxjs';
import { CryptoDescriptionSituation } from './model/cryptoDescriptionSituation';

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

  price(cryptos:CryptoDescriptionSituation[]) : Observable<Object>{

    var preparedString : string="";
    var cpt :number =0;

    if(cryptos && cryptos.length!=0){
      cryptos.forEach((element)=>{

        if(element.api_name){
          if(cpt==0){
            preparedString+=element.api_name;
          }else{
            preparedString+=","+element.api_name;
          } 
          cpt ++;         
        }
      })           
    }
    return this.http.get<Object>(`https://api.coingecko.com/api/v3/simple/price?ids=${preparedString}&vs_currencies=usd`)
  }
}
