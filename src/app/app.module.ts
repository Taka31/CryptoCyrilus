import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddActionComponent } from './add-action/add-action.component';
import { MenuComponent } from './menu/menu.component';
import { DetailCryptoComponent } from './detail-crypto/detail-crypto.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,  
    AddActionComponent, MenuComponent, DetailCryptoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
