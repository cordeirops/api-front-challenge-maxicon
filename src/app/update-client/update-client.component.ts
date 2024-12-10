import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../client-service/client.service';
import { Client } from '../client-model/client.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-client',
  standalone: true,
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css'],
  imports: [CommonModule, FormsModule]
})
export class UpdateClientComponent implements OnInit {
  client: Client = { id: 0, name: '', age: 0, email: '', cpf: '' };  // Inicialize com valores padrão

  constructor(
    private clientService: ClientService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    // Recuperando o cliente passado via Router State
    const navigation = this.router.getCurrentNavigation();
    console.log('Navegação:', navigation); // Adicione log para inspecionar a navegação
  
    if (navigation?.extras.state?.['client']) {
      this.client = navigation.extras.state['client']; // Inicializa o cliente com os dados passados
    } else {
      console.error('Cliente não encontrado!');
    }
  }

  // Método para enviar os dados atualizados
  onSubmit(): void {
    if (this.client.id) {
      this.clientService.updateClient(this.client.id, this.client).subscribe(
        (data) => {
          alert('Cliente atualizado com sucesso!');
          this.router.navigate(['/list-client']);  // Redireciona de volta para a lista de clientes
        },
        (error) => {
          console.error('Erro ao atualizar cliente:', error);
          alert('Erro ao atualizar cliente.');
        }
      );
    }
  }
}
