import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { HttpClientModule } from '@angular/common/http';  // Importando HttpClientModule
import { ClientService } from './client-service/client.service';  
import { FormsModule } from '@angular/forms';  // Importando FormsModule

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule    
  ],
  providers: [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
