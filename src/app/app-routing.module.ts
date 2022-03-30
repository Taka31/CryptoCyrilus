import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailCryptoComponent } from './detail-crypto/detail-crypto.component';
import { CryptoCreationComponent } from './crypto-creation/crypto-creation.component';
import { DepositComponent } from './deposit/deposit.component';


const routes: Routes = [	
	{path : 'dashboard', component:DashboardComponent,runGuardsAndResolvers: 'always'},
	{path : '', redirectTo: '/dashboard', pathMatch:'full',runGuardsAndResolvers: 'always'},
	{path : 'cryptoDetail/:id/:name', component : DetailCryptoComponent,runGuardsAndResolvers: 'always'},
  {path : 'cryptoCreation', component : CryptoCreationComponent,runGuardsAndResolvers: 'always'},
  {path : 'deposit', component : DepositComponent,runGuardsAndResolvers: 'always'}
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
