import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

	product_id: string;

  constructor(private actRoute: ActivatedRoute) { 
  	 this.product_id = this.actRoute.snapshot.params.id;
  	 console.log(this.product_id);
  }

  ngOnInit(): void {

  	  /*const id = this.route.snapshot.paramMap.id;
  	  console.log(id);*/

  }

}
