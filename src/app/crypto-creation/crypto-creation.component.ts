import { Component, OnInit } from '@angular/core';
import { CryptoBusinessService } from '../crypto-business.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crypto-creation',
  templateUrl: './crypto-creation.component.html',
  styleUrls: ['./crypto-creation.component.css']
})
export class CryptoCreationComponent implements OnInit {

  
  constructor(private cryptoBusinessService:CryptoBusinessService, private router:Router) { }

  ngOnInit(): void {
  
  }

  addNameCrypto(name : string, gecko:string){
    console.log(name);
    this.cryptoBusinessService.createCrypto(name,gecko).subscribe(()=>this.router.navigateByUrl('/dashboard'));
  }

}
