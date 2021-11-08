export class Action{
	
	date:Date ;
	type:string ="BTC"; 
	movment:string;	
	price:number;
	amount:number;
	result:number;		
	sumAmount:number=0;
	averagePrice:number=0;
	resultSell:number=0;

	constructor(date : Date,movment : string, amount: number, price: number, previousAmount:number, previousPrice: number){
			this.date=date;
			this.movment=movment;
			this.price=price;		
			this.amount=amount;			
			this.result=this.amount*this.price;
			this.calculateStayAmount(previousAmount);			
			this.calculateAveragePrice(previousAmount, previousPrice);	
			this.calculateSellResult(previousPrice);
	}	

	calculateStayAmount(previousAmount:number){
		if(this.movment==="Vente"){
			this.sumAmount=previousAmount-this.amount;
		}else{
			this.sumAmount=previousAmount+this.amount;
		}

		//console.log("new sumValue is "+this.sumAmount);
	}

	calculateAveragePrice(previousAmount:number, previousPrice: number){

		if(this.movment==="Vente"){
			this.averagePrice=previousPrice;
			//console.log("new averagePrice is "+this.averagePrice);
		}else{
			this.averagePrice=((previousPrice*previousAmount)+this.result)/this.sumAmount
			//console.log("new averagePrice is "+this.averagePrice+ " result "+this.result+" this.sumAmount "+this.sumAmount + " previous price "+previousPrice);
		}
	}

	calculateSellResult(previousPrice : number){

		if(this.movment==="Vente"){
			this.resultSell=this.result - (this.amount*previousPrice);
			
		}
	}
}