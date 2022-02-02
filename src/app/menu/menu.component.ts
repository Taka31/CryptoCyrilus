import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CryptoBusinessService } from '../crypto-business.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

	product_id: string;
  isAllowed:boolean =false;

  constructor(private actRoute: ActivatedRoute,private cryptoService:CryptoBusinessService) { 
  	 this.product_id = this.actRoute.snapshot.params.id;  	 
  }

  ngOnInit(): void {
    this.cryptoService.checkUser().subscribe(result=>{
      const obj = JSON.parse(JSON.stringify(result))
      const allowed = obj['number']==1?true:false;
      if(allowed){
        this.isAllowed =true;        
      }else{
         this.isAllowed =false;
      }
    })
  }
}


