import { Injectable } from '@angular/core';
import { Movment } from './model/movment';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { CryptoDescription } from './model/crypto';
import { Action } from './model/action';
import { CryptoDescriptionSituation } from './model/cryptoDescriptionSituation';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatePipe } from '@angular/common'
import { Deposit } from './model/deposit';
import { ExternalInvestment } from './model/externalInvestment';

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

  constructor(private http:HttpClient, private auth:AngularFireAuth, private datePipe:DatePipe) { }


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

  getNotUsedCryptoByUser() : Observable<CryptoDescriptionSituation[]>{
    return new Observable<CryptoDescriptionSituation[]>(observer=>{
      this.auth.user.subscribe(user=>{
        user && user.getIdToken().then(token=>{
          if(user && token){
            this.http.get<CryptoDescriptionSituation[]>(`/api/get-not-used-Crypto/${user.uid}`).subscribe(cryptos=> observer.next(cryptos))
          }
        })
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
              this.http.post<Action>(`/api/add-movment`,{price,amount,is_sell,id_crypto,date},httpOptionsWithAuthToken(token)).subscribe(action=>{
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
            this.http.post<any>(`/api/updateSituation`,{number_owned,position_price,invested_money,earned_lost,id_crypto_description},httpOptionsWithAuthToken(token)).subscribe(()=>observer.next());
          }else{
            return observer.next();
          }
        })
      })
    })
  }  

  initializeNewCrypto(id_crypto:number) : Observable<any>{
    return new Observable<any>(observer=>{
      this.auth.user.subscribe(user=>{
        user && user.getIdToken().then(token=>{
          if(user && token){
            this.http.post<any>(`/api/initializeCryptoForUser`,{id_crypto},httpOptionsWithAuthToken(token)).subscribe(()=>observer.next());
          }else{
            observer.next();
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

  getSumInvestedEuro(): Observable<Deposit>{
    return new Observable<Deposit>(observer=>{
        this.auth.user.subscribe(user=>{
          user && user.getIdToken().then(token=>{
            if(user && token){
              this.http.get<Deposit>(`/api/globalSituation`,httpOptionsWithAuthToken(token)).subscribe(deposit=>observer.next(deposit))
            }
            else{
              observer.next();
            }
          })
        }) 
      }      
    );
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

  getExternalInvestment() : Observable<ExternalInvestment[]> {
    return new Observable<ExternalInvestment[]>(observer=>{
      this.auth.user.subscribe(user=>{
        user && user.getIdToken().then(token=>{
          if(user && token){
            this.http.get<ExternalInvestment[]>(`/api/getExternalInvestment`,httpOptionsWithAuthToken(token)).subscribe(investments=>{
              observer.next(investments);
            })
          }
        })
      })
    })    
  }

  getInvestmentSumSituation() : Observable<Object>{
    return new Observable<Object>(observer=>{
      this.auth.user.subscribe(user=>{
        user && user.getIdToken().then(token=>{
          if(user && token){
            this.http.get<ExternalInvestment[]>(`/api/getInvestmentSumSituation`,httpOptionsWithAuthToken(token)).subscribe(situation=>{
              observer.next(situation);
            })
          }
        })
      })
    })    
  }

 


  addDeposit(deposit: Deposit){

    const amount : number = deposit.amount;    
    const date_deposit=this.datePipe.transform(deposit.myDate,'yyyy-MM-dd');    
    const is_euro : number =deposit.currency;
    

    return new Observable<Object>(observer=>{
      this.auth.user.subscribe(user=>{
        user && user.getIdToken().then(token=>{
          if(user && token){
            this.http.post<Object>(`/api/addDeposit`,{amount,date_deposit,is_euro},httpOptionsWithAuthToken(token)).subscribe(object=>observer.next(object));
          }
        })
      })
    })

  }
}
