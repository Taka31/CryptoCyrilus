import { Component, OnInit } from '@angular/core';
import { Deposit } from '../model/deposit';
import { CryptoBusinessService } from '../crypto-business.service';
import { TypeCurrency } from '../model/type';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  actionModelForm : Deposit={myDate:new Date(),amount:0.0,currency:1};
  selectedCurrency :TypeCurrency=  TypeCurrency.Euro;

  constructor(private cryptoService : CryptoBusinessService) { }

  ngOnInit(): void {
  }

  add(){    
    if(this.selectedCurrency===TypeCurrency.Dollar){
      this.actionModelForm.currency=0;
    }
    this.cryptoService.addDeposit(this.actionModelForm).subscribe(()=>this.clean()); 
  }

  clean(){
    this.actionModelForm.amount=0.0;
    this.selectedCurrency =  TypeCurrency.Euro;
  }

  changeCurrency(){
    if(this.selectedCurrency===TypeCurrency.Euro){
      this.selectedCurrency=TypeCurrency.Dollar;
    }else{
      this.selectedCurrency=TypeCurrency.Euro;
    }
  }

}
