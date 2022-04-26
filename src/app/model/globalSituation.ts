export class GlobalSituation{    
    amountEuro :number;
    amountDollar : number;
    sumSituation: number;
    sumEarnedLoss : number;
    sumExternalInvestmentSituation : number;
    total : number;
    totalPercentage: number;

    constructor(){
        
        this.amountEuro=0;
        this.amountDollar=0;
        this.sumSituation=0;
        this.sumEarnedLoss=0;
        this.sumExternalInvestmentSituation=0;
        this.totalPercentage=0;
        this.total=0;
    }

    setAmountEuro(amountEuro : number) : void{
        this.amountEuro=amountEuro;
    }

    setAmountDollar(ratioDollar : number) : void{
        this.amountDollar=this.amountEuro*ratioDollar;
    }

    setSumInvestedMoney(sumSituation: number) {
        this.sumSituation=sumSituation;
    }

    setSumEarnedLoss(sumEarnedLoss: number) {
        this.sumEarnedLoss=sumEarnedLoss;
    }   

    setSumExternalInvestmentSituation(sumExternalInvestmentSituation : number){
        this.sumExternalInvestmentSituation=sumExternalInvestmentSituation;
    }

    fetchTotal(){        
        this.total = this.sumSituation+ this.sumEarnedLoss+this.sumExternalInvestmentSituation;
        this.totalPercentage=this.total/this.amountDollar;
    }
}