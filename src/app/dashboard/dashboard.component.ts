import { Component, OnInit } from '@angular/core';
import { CryptoBusinessService } from '../crypto-business.service';
import { CryptoDescriptionSituation } from '../model/cryptoDescriptionSituation';
import { CoingeckoService } from '../coingecko.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {  

  constructor(private route : ActivatedRoute, private router : Router,private cryptoService:CryptoBusinessService, private geckoService : CoingeckoService) { }

  myCryptos : CryptoDescriptionSituation[] = [];
  myCryptosNotUsed : CryptoDescriptionSituation[] =[];
  isLoading:boolean =true;
  isAllowed:boolean =false;
  isInformationHidden=false;
  cryptoToAdd="";

  ngOnInit(): void {   

    this.route.params.subscribe(routeParams => {
      
      this.init();
    });    
  }

  init(){    
    this.clean();
    this.cryptoService.checkUser().subscribe(result=>{
      const obj = JSON.parse(JSON.stringify(result))
      const allowed = obj['number']==1?true:false;
      if(allowed){
        this.isAllowed =true;
        this.cryptoService.getMyCryptos().subscribe(cryptos =>{
          this.myCryptos=cryptos;          
          this.updateListCryptoAvailable();
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

  updateListCryptoAvailable() {    
    this.cryptoService.getNotUsedCryptoByUser().subscribe(cryptos=>{
      this.myCryptosNotUsed=cryptos
      if(!cryptos || cryptos.length==0){
        this.cryptoToAdd="0";
      }
    });
  }

  updatePrice(){

    this.geckoService.price(this.myCryptos).subscribe((x)=>{
      var obj = JSON.parse(JSON.stringify(x));      

      this.myCryptos.forEach(element=>{
        if(element.api_name){          
          element.actual_price=obj[element.api_name]["usd"];
        }        
      })
    }

    );
  }

  hideInformation(){
    this.isInformationHidden=!this.isInformationHidden;
  }

  clean(){
    this.myCryptos  = [];
    this.myCryptosNotUsed =[];
    this.isLoading =true;
    this.isAllowed =false;
    this.isInformationHidden=false;
    this.cryptoToAdd="";
  }

  addCrypto(){
    

    if(this.cryptoToAdd=="0"){
      // we go to the managePageCrypto
      this.router.navigate(['/cryptoCreation']);
    }else{      
      this.cryptoService.initializeNewCrypto(this.cryptoToAdd).subscribe(()=>this.init());
    }
  }

  








}
