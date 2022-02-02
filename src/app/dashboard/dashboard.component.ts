import { Component, OnInit } from '@angular/core';
import { CryptoBusinessService } from '../crypto-business.service';
import { CryptoDescriptionSituation } from '../model/cryptoDescriptionSituation';
import { CoingeckoService } from '../coingecko.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {  

  constructor(private cryptoService:CryptoBusinessService, private geckoService : CoingeckoService) { }

  myCryptos : CryptoDescriptionSituation[] = [];
  isLoading:boolean =true;
  isAllowed:boolean =false;

  ngOnInit(): void {   

    this.cryptoService.checkUser().subscribe(result=>{
      const obj = JSON.parse(JSON.stringify(result))
      const allowed = obj['number']==1?true:false;
      if(allowed){
        this.isAllowed =true;
        this.cryptoService.getMyCryptos().subscribe(cryptos =>{
          this.myCryptos=cryptos;
          this.updatePrice();
          this.isLoading=false;          
        });
      }else{
        console.log("USER NOT ALLOWED");
        this.isLoading=false;
        this.isAllowed =false;
      }
    })
  }

  updatePrice(){
    this.myCryptos.forEach((element)=>{
      this.geckoService.price(element.api_name).subscribe(x =>{
        var obj = JSON.parse(JSON.stringify(x));
        element.actual_price=obj[element.api_name]["usd"];      
      })
    })
  }

  








}
