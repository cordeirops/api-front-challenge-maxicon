import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { HttpClientModule } from '@angular/common/http';  // Importando HttpClientModule
import { ClientService } from './client-service/client.service';  
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';  // Importando FormsModule
import { RouterModule } from '@angular/router';
import { LoanComponent } from './loan/loan.component';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    LoanComponent,
    NgbModule,
    NgbDatepickerModule   
  ],
  providers: [ClientService],
  bootstrap: [AppComponent]  // Apenas o AppComponent deve ser colocado aqui
})
export class AppModule { }
