import { Component, Input, OnInit } from '@angular/core';
import { CryptoBusinessService } from '../crypto-business.service';
import { GlobalSituation } from '../model/globalSituation';
import { CoingeckoService } from '../coingecko.service';

@Component({
  selector: 'app-balance-report',
  templateUrl: './balance-report.component.html',
  styleUrls: ['./balance-report.component.css']
})
export class BalanceReportComponent implements OnInit {

  situation! : GlobalSituation;
  isLoading:boolean =true;

  @Input() isNotAllowed!: boolean;


  constructor(private cryptoService: CryptoBusinessService, private geckoService : CoingeckoService) { }

  ngOnInit(): void {      
    this.init();    
  }

  init() : void{
    // call sum deposit
    this.cryptoService.getSumInvestedEuro().subscribe(deposit=>{
      this.situation=new GlobalSituation();     
      this.situation.setAmountEuro(deposit.amount);
      this.getDollarRatio(); 
    })
  }

  getDollarRatio() : void{
    // get Dollar Ratio
    this.geckoService.price("tether-eurt").subscribe((x)=>{
    var obj = JSON.parse(JSON.stringify(x));        
    this.situation.setAmountDollar(obj["tether-eurt"]["usd"]);
    this.situationCalculation();
    }
    );
        
  }

  situationCalculation() : void {
    // calculation of all situations.    
    this.cryptoService.getMyCryptos().subscribe(cryptos =>{
      var sumSituation : number=0;
      var sumEarnedLoss : number=0;

      const preparedString = this.geckoService.prepareString(cryptos);
  
      this.geckoService.price(preparedString).subscribe((x)=>{
        var obj = JSON.parse(JSON.stringify(x));      
  
        cryptos.forEach(element=>{
          if(obj[element.api_name]){          
            element.actual_price=obj[element.api_name]["usd"];
            sumSituation+=((element.actual_price*element.number_owned)-element.invested_money);            
            sumEarnedLoss+=element.earned_lost;
          }
        }) 
        
        this.situation.setSumInvestedMoney(sumSituation);        
        this.situation.setSumEarnedLoss(sumEarnedLoss);    
        
        this.getExternalInvestmentSituation();        
      }
      );    
    });    
  }

  getExternalInvestmentSituation() :void {
    this.cryptoService.getInvestmentSumSituation().subscribe(result=>{
      const obj = JSON.parse(JSON.stringify(result))      
      this.situation.setSumExternalInvestmentSituation(obj['situation']);
      this.situation.fetchTotal();
      this.isLoading=false;
    })
  }

}
