import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailCryptoComponent } from './detail-crypto/detail-crypto.component';


const routes: Routes = [	
	{path : 'dashboard', component:DashboardComponent,runGuardsAndResolvers: 'always'},
	{path : '', redirectTo: '/dashboard', pathMatch:'full',runGuardsAndResolvers: 'always'},
	{path : 'cryptoDetail/:id', component : DetailCryptoComponent,runGuardsAndResolvers: 'always'}
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
