import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action } from '../model/action';
import { TypeAction } from '../model/type';
import { Movment } from '../model/movment';
import { Router } from '@angular/router';
import { CryptoBusinessService } from '../crypto-business.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-detail-crypto',
  templateUrl: './detail-crypto.component.html',
  styleUrls: ['./detail-crypto.component.css']
})
export class DetailCryptoComponent implements OnInit {

  actions: Action[] = [];
  actionModel: Action =new Action(new Date(),TypeAction.Buy,0.0,0.0,0.0,0.0)
  type: TypeAction = TypeAction.Buy;
  btcTab: Movment[] | undefined;   
  idCrypto:string =""; 
  nameCrypto:string="";

  situation_owned_number: number = 0;
  situation_position_price: number = 0;
  situation_earned_lost: number = 0;

  isLoading = true;

  constructor(private route: ActivatedRoute, private router: Router, private cryptoService:CryptoBusinessService,public datepipe: DatePipe) {

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
    this.idCrypto = this.route.snapshot.paramMap.get('id')!;
    this.nameCrypto = this.route.snapshot.paramMap.get('name')!;
        console.log("Crypto with id :"+this.idCrypto+" Loading....");            

        this.cryptoService.getMovments(this.idCrypto).subscribe(movments=> {
          this.btcTab=movments;
          if(this.btcTab){
            for (var i = 0; i < this.btcTab.length; i++) {              
              this.createAction(this.btcTab[i].action, this.btcTab[i].amount, this.btcTab[i].price,this.btcTab[i].date);           
            }
            this.initSituation();
          }else{
            console.log("NO RESULT");
          }
          this.isLoading=false;  
        });         
  }

  createAction(buyOrNot: string, amount: number, price: number, date:Date=new Date()): void {    
    
    var action: Action;
    
    if (this.actions.length > 0) {
      action = new Action(date,buyOrNot, amount, price, this.actions[this.actions.length - 1].sumAmount, this.actions[this.actions.length - 1].averagePrice);
    } else {
      action = new Action(date,buyOrNot, amount, price, 0, 0);
    }

    this.actions.push(action);   
  }

  changePosition() {
    this.type==TypeAction.Buy?this.type=TypeAction.Sell:this.type=TypeAction.Buy;    
  }

  addMovment(): void{
    //call API
    var sellBuyBoolean=0;
    if(this.type==TypeAction.Sell){
      sellBuyBoolean=1;
    }

    const dateTransform=this.datepipe.transform(this.actionModel.date,'yyyy-MM-dd');
    this.cryptoService.addMovment(this.actionModel.price,this.actionModel.amount,sellBuyBoolean,this.idCrypto,dateTransform).subscribe(()=>this.init());
    
  }


  initSituation(): void {

    if (this.actions.length > 0) {
      this.situation_owned_number = this.actions[this.actions.length - 1].sumAmount;
      this.situation_position_price = this.actions[this.actions.length - 1].averagePrice;      
      if(this.situation_owned_number<0.0000000001){
        this.situation_position_price=0;
      }
      this.initSumEarn()      
      this.cryptoService.updateCryptoSituation(this.situation_owned_number,this.situation_position_price, this.situation_earned_lost,this.idCrypto).subscribe();
    }

  }

  initSumEarn() {
    this.situation_earned_lost = 0;
    for (var i = this.actions.length - 1; i >= 0; i--) {
      this.situation_earned_lost = this.situation_earned_lost + this.actions[i].resultSell;
    }
  }

  clean() {
    this.actions = [];
//    this.actionModel = new Action(new Date(),TypeAction.Buy,0.0,0.0,0.0,0.0);
    this.type = TypeAction.Buy;
    this.btcTab = [];    
    this.situation_owned_number = 0;
    this.situation_position_price = 0;
    this.situation_earned_lost = 0;
  }


}
