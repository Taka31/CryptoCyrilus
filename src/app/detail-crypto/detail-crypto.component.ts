import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action } from '../model/action';
import { TYPE } from '../model/type';
import { BTC } from '../model/cryptoName';
import { XRP } from '../model/cryptoName';
import { ICP } from '../model/cryptoName';
import { Movment } from '../model/movment';
import { EnumNameCrypto } from '../model/enumNameCrypto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-crypto',
  templateUrl: './detail-crypto.component.html',
  styleUrls: ['./detail-crypto.component.css']
})
export class DetailCryptoComponent implements OnInit {

  actions: Action[] = [];
  action: Action | undefined;
  types = TYPE;
  type: string = "Achat";
  btcTab: Movment[] | undefined;

  lastAmount: number = 0;
  lastPrice: number = 0;
  cumulGain: number = 0;

  constructor(private route: ActivatedRoute, private router: Router) {

  };


  ngOnInit(): void {
    // refresh the same link with diferent parameter    
    this.route.params.subscribe(routeParams => {
      console.log("REFRESH PAGE");
      this.init();
    });


  }

  init() {
    this.clean();
    var value = this.route.snapshot.paramMap.get('id');

    console.log(value);

    switch (value) {
      case EnumNameCrypto.XRP:
        console.log("XPR Loaded....");
        this.btcTab = XRP;
        break;
        case EnumNameCrypto.ICP:
        console.log("ICP Loaded....");
        this.btcTab = ICP;
        break;
      default:
        console.log("BTC Loaded....");
        this.btcTab = BTC;
        break;
    }

    for (var i = 0; i < this.btcTab.length; i++) {
      console.log(this.btcTab[i].date)
      this.createAction(this.btcTab[i].action, this.btcTab[i].amount, this.btcTab[i].price,this.btcTab[i].date);
    }
  }

  createAction(typeTemp: string, amount: number, price: number, date:Date=new Date()): void {   
    console.log("ma date est "+date)
    if (this.actions.length > 0) {
      this.action = new Action(date,typeTemp, amount, price, this.actions[this.actions.length - 1].sumAmount, this.actions[this.actions.length - 1].averagePrice);
    } else {
      this.action = new Action(date,typeTemp, amount, price, 0, 0);
    }

    this.actions.push(this.action);
    this.initSituation();
  }

  positionType(value: string) {
    //console.log(" new value is "+value)
    this.type = value;
  }


  initSituation(): void {

    if (this.actions.length > 0) {
      this.lastAmount = this.actions[this.actions.length - 1].sumAmount;
      this.lastPrice = this.actions[this.actions.length - 1].averagePrice;
      this.initSumEarn()
    }

  }

  initSumEarn() {
    this.cumulGain = 0;
    for (var i = this.actions.length - 1; i >= 0; i--) {
      this.cumulGain = this.cumulGain + this.actions[i].resultSell;
    }
  }

  clean() {
    this.actions = [];
    this.action = undefined;
    this.type = "Achat";
    this.btcTab = [];
    this.lastAmount = 0;
    this.lastPrice = 0;
    this.cumulGain = 0;
  }


}
