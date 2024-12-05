import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importe o CommonModule
import { ClientService } from '../client-service/client.service';
import { Client } from '../client-model/client.model';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css'],
  imports: [CommonModule]
})
export class ListClientComponent implements OnInit {
  clients: Client[] = [];

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(
      (data) => {
        console.log(data);  // Verifique o que está sendo retornado pela API
        this.clients = data;
      },
      (error) => {
        console.error('Erro ao carregar clientes:', error);
      }
    );
  }
}
