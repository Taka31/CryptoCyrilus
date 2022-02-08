import { Injectable } from '@angular/core';
import { Movment } from './model/movment';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { CryptoDescription } from './model/crypto';
import { Action } from './model/action';
import { CryptoDescriptionSituation } from './model/cryptoDescriptionSituation';
import { AngularFireAuth } from '@angular/fire/auth';

const httpOptions ={
  headers : new HttpHeaders({
    'Content-Type':'application/json',
  })
};

const httpOptionsWithAuthToken = (token:any) => ({
  headers : new HttpHeaders({
    'content-type':'application/json',
    'AuthToken': token
  })
});

@Injectable({
  providedIn: 'root'
})
export class CryptoBusinessService {

  constructor(private http:HttpClient, private auth:AngularFireAuth) { }


  getMovments(id : string) : Observable<Movment[]>{
    return new Observable<Movment[]>(observer=>{
      this.auth.user.subscribe(user=>{
        user && user.getIdToken().then(token=>{
          if(user && token){
            this.http.get<Movment[]>(`/api/movments/${id}/user/${user.uid}`).subscribe(movments=>{
              observer.next(movments);
            });
          }else{
            observer.next([]);
          }
        })
      })
    })
  }

  deleteMovment(idMovment : number):Observable<any>{
    return new Observable<any>(observer=>{
      this.http.get<any>(`/api/removeMovment/${idMovment}`).subscribe(()=>{
        observer.next();
      });
    });
  }

  getMyCryptos() : Observable<CryptoDescriptionSituation[]> {
    return new Observable<CryptoDescriptionSituation[]>(observer=>{
      this.auth.user.subscribe(user=>{
        user && user.getIdToken().then(token=>{
          if(user && token){
            this.http.get<CryptoDescriptionSituation[]>(`/api/users/${user.uid}/my-cryptos`,httpOptionsWithAuthToken(token)).subscribe(cryptoDescription=>{
              observer.next(cryptoDescription);
            });
          }else{
            observer.next([]);
          }
        });
      })
    })    
  } 

  createCrypto(name:string, gecko:string):Observable<CryptoDescription>{    
    return this.http.post<CryptoDescription>(`/api/create-crypto`,{name,gecko},httpOptions);
  }

  addMovment(price: number, amount:number, is_sell:number, id_crypto:string, date:string|null):Observable<Action>{
    return new Observable<Action>(observer=>
        this.auth.user.subscribe(user=>{
          user && user.getIdToken().then(token=>{
            if(user && token){
              const userIdValue=user.uid;
              this.http.post<Action>(`/api/add-movment`,{price,amount,is_sell,id_crypto,date,userIdValue},httpOptionsWithAuthToken(token)).subscribe(action=>{
                observer.next(action);
              })
            }else{
              return observer.next();
            }
          })
        })
    )
  }

  updateCryptoSituation(number_owned:number, position_price:number, earned_lost:number, id_crypto_description : string) : Observable<any>{
    return new Observable<any>(observer=>{
      this.auth.user.subscribe(user=>{
        user && user.getIdToken().then(token=>{
          if(user && token){            
            const invested_money = (number_owned*position_price).toFixed(2);
            console.log("VALUE INVESTED"+invested_money);
            this.http.post<any>(`/api/updateSituation`,{number_owned,position_price,invested_money,earned_lost,id_crypto_description},httpOptionsWithAuthToken(token)).subscribe();
          }else{
            return observer.next();
          }
        })
      })
    })
  }

  checkUser(): Observable<Object>{
    return new Observable<Object>(observer=>{
      this.auth.user.subscribe(user=>{
        user && user.getIdToken().then(token=>{
          if(user && token){
            this.http.get<any>(`/api/get-user/${user.uid}`,httpOptionsWithAuthToken(token)).subscribe(object=> observer.next(object))
          }
        })
      })    
    }) 
  }
}
