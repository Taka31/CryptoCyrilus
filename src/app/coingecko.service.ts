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

  price(preparedString:string) : Observable<Object>{
    return this.http.get<Object>(`https://api.coingecko.com/api/v3/simple/price?ids=${preparedString}&vs_currencies=usd`)
  }

  prepareString(list : CryptoDescriptionSituation[]) : string {
    var preparedString : string=""; 
    var cpt :number =0;

    if(list && list.length!=0){
      list.forEach((element)=>{
        if(element.api_name){
          if(cpt===0){
            preparedString+=element.api_name; 
          }else{
            preparedString+=","+element.api_name; 
          }
          cpt ++;         
        }
      })           
    }
    return preparedString;
  }
}
