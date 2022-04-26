import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddActionComponent } from './add-action/add-action.component';
import { MenuComponent } from './menu/menu.component';
import { DetailCryptoComponent } from './detail-crypto/detail-crypto.component';
import { environment } from '../environments/environment';
import { CryptoCreationComponent } from './crypto-creation/crypto-creation.component';
import { DatePipe } from '@angular/common';
import { DepositComponent } from './deposit/deposit.component';
import { ExternalInvestmentComponent } from './external-investment/external-investment.component';
import { BalanceReportComponent } from './balance-report/balance-report.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,  
    AddActionComponent, MenuComponent, DetailCryptoComponent, CryptoCreationComponent, DepositComponent, ExternalInvestmentComponent, BalanceReportComponent, 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule  
  ],
  providers: [
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
