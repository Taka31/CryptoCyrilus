import { TypeAction } from './type';
import { Movment } from './movment';
export class Action{
	
	movment:Movment;	
	result:number;		
	sumAmount:number=0;
	averagePrice:number=0;
	resultSell:number=0;

	constructor(movment:Movment, previousAmount:number, previousPrice: number){
			this.movment=movment;
			this.result=this.movment.amount*this.movment.price;
			this.calculateStayAmount(previousAmount);			
			this.calculateAveragePrice(previousAmount, previousPrice);	
			this.calculateSellResult(previousPrice);
	}	

	calculateStayAmount(previousAmount:number){
		if(this.movment.action===TypeAction.Sell){
			this.sumAmount=previousAmount-this.movment.amount;
		}else{
			this.sumAmount=previousAmount+this.movment.amount;
		}

		//console.log("new sumValue is "+this.sumAmount);
	}

	calculateAveragePrice(previousAmount:number, previousPrice: number){

		if(this.movment.action===TypeAction.Sell){
			this.averagePrice=previousPrice;
			//console.log("new averagePrice is "+this.averagePrice);
		}else{
			this.averagePrice=((previousPrice*previousAmount)+this.result)/this.sumAmount
			//console.log("new averagePrice is "+this.averagePrice+ " result "+this.result+" this.sumAmount "+this.sumAmount + " previous price "+previousPrice);
		}
	}

	calculateSellResult(previousPrice : number){

		if(this.movment.action===TypeAction.Sell){
			this.resultSell=this.result - (this.movment.amount*previousPrice);
			
		}
	}
}