import { Component, Input, OnInit } from '@angular/core';
import { CryptoBusinessService } from '../crypto-business.service';
import { ExternalInvestment } from '../model/externalInvestment';

@Component({
  selector: 'app-external-investment',
  templateUrl: './external-investment.component.html',
  styleUrls: ['./external-investment.component.css']
})
export class ExternalInvestmentComponent implements OnInit {

  investments : ExternalInvestment[];

  @Input()
  isNotAllowed! : boolean;

  constructor(private businessService : CryptoBusinessService) {
    this.investments=[];
   }

  ngOnInit(): void {
    this.loadExternalInvestment();
  }

  loadExternalInvestment() : void {
    this.businessService.getExternalInvestment().subscribe(investments=>{
      this.investments=investments;      
    })
  }

}
