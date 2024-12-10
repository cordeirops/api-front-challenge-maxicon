import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../client-service/client.service';
import { Client } from '../client-model/client.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-list-client',
  standalone: true,
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ListClientComponent implements OnInit {
  clients: Client[] = [];
  selectedClient: Client = { id: 0, name: '', age: 0, email: '', cpf: '' }; // Cliente selecionado para edição

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
    this.loadClients();
  }

  // Método para carregar os clientes
  loadClients(): void {
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

  // Método para abrir o modal com as informações do cliente
  openModal(client: Client): void {
    this.selectedClient = { ...client };  // Cria uma cópia do cliente para edição
    const modal = new bootstrap.Modal(document.getElementById('clientModal'));
    modal.show();  // Exibe o modal
  }

  updateClient(): void {
    if (this.selectedClient.id) {
      this.clientService.updateClient(this.selectedClient.id, this.selectedClient).subscribe(
        (data) => {
          alert('Cliente atualizado com sucesso!');
          this.loadClients();  // Recarrega a lista de clientes
          const modal = new bootstrap.Modal(document.getElementById('clientModal'));
          modal.hide();  // Fecha o modal
        },
        (error) => {
          console.error('Erro ao atualizar cliente:', error);
          alert('Erro ao atualizar cliente.');
        }
      );
    }
  }
  // Método para excluir um cliente
  deleteClient(id: number): void {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.clientService.deleteClient(id).subscribe(
        () => {
          alert('Cliente excluído com sucesso!');
          this.loadClients();  // Recarrega a lista de clientes
        },
        (error) => {
          console.error('Erro ao excluir cliente:', error);
          alert('Erro ao excluir cliente.');
        }
      );
    }
  }
}
