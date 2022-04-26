import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action } from '../model/action';
import { TypeAction } from '../model/type';
import { Movment } from '../model/movment';
import { CryptoBusinessService } from '../crypto-business.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-detail-crypto',
  templateUrl: './detail-crypto.component.html',
  styleUrls: ['./detail-crypto.component.css']
})
export class DetailCryptoComponent implements OnInit {

  actions: Action[] = [];
  actionModelForm: Action =new Action({amount:0.0,price:0.0,action:TypeAction.Buy,date:new Date()},0.0,0.0)
  typeActionForm: TypeAction = TypeAction.Buy;    
  idCrypto:string =""; 
  nameCrypto:string="";

  situation_owned_number: number = 0;
  situation_position_price: number = 0;
  situation_earned_lost: number = 0;

  isLoading = true;

  constructor(private route: ActivatedRoute, private cryptoService:CryptoBusinessService,public datepipe: DatePipe) {

  };


  ngOnInit(): void {
    // refresh the same link with diferent parameter    
    this.route.params.subscribe(routeParams => {    
      this.init();
    });
  }

  init() {
    this.clean();
    this.idCrypto = this.route.snapshot.paramMap.get('id')!;
    this.nameCrypto = this.route.snapshot.paramMap.get('name')!;
        console.log("Crypto with id :"+this.idCrypto+" Loading....");            

        this.cryptoService.getMovments(this.idCrypto).subscribe(movmentsTab=> {          
          if(movmentsTab){
            for (var i = 0; i < movmentsTab.length; i++) {  
              if(!movmentsTab[i].isDeleted){
                this.createAction(movmentsTab[i]);   
              }       
            }
            this.initSituation();
          }else{
            console.log("NO RESULT");
          }
          this.isLoading=false;  
        });         
  }

  createAction(movment:Movment): void {    
    
    var action: Action;
    
    if (this.actions.length > 0) {
      action = new Action(movment, this.actions[this.actions.length - 1].sumAmount, this.actions[this.actions.length - 1].averagePrice);
    } else {
      action = new Action(movment, 0, 0);
    }

    this.actions.push(action);   
  }

  changePosition() {

    if(this.typeActionForm==TypeAction.Buy){
      this.typeActionForm=TypeAction.Sell;
    }else if(this.typeActionForm==TypeAction.Sell){
      this.typeActionForm=TypeAction.Interest;
    }else{
      this.typeActionForm=TypeAction.Buy;
    }    
  }

  addMovment(): void{
    //call API
    var sellBuyBoolean=0;
    if(this.typeActionForm==TypeAction.Sell){
      sellBuyBoolean=1;
    }

    // Interest control, price is always equal to 0
    if(this.typeActionForm==TypeAction.Interest){
      this.actionModelForm.movment.price=0;
    }

    const dateTransform=this.datepipe.transform(this.actionModelForm.movment.date,'yyyy-MM-dd');
    this.cryptoService.addMovment(this.actionModelForm.movment.price,this.actionModelForm.movment.amount,sellBuyBoolean,this.idCrypto,dateTransform).subscribe(()=>this.init());
    
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
    this.typeActionForm = TypeAction.Buy;    
    this.situation_owned_number = 0;
    this.situation_position_price = 0;
    this.situation_earned_lost = 0;
  }

  removeMovment(id? :number){
    if(id){      
      this.cryptoService.deleteMovment(id).subscribe(()=>this.init());
    }
    
  }


}
