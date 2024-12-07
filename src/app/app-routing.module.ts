import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientsComponent } from './clients/clients.component';
import { LoanComponent } from './loan/loan.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { ListClientComponent } from './list-client/list-client.component';
const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'clientes', component: ClientsComponent },
  { path: 'emprestimos', component: LoanComponent },
  { path: 'create-client', component: CreateClientComponent },
  { path: 'list-client', component: ListClientComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
