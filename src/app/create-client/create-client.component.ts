import { Component } from '@angular/core';
import { ClientService } from '../client-service/client.service';
import { Client } from '../client-model/client.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-client',
  imports: [FormsModule],
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent {
  client: Client = new Client();  // Cria uma nova instância do cliente

  constructor(private clientService: ClientService) {}

  onSubmit(): void {
    this.clientService.createClient(this.client).subscribe(
      (response) => {
        console.log('Cliente cadastrado com sucesso!', response);
        // Limpar o formulário ou redirecionar após sucesso
        this.client = new Client();  // Limpa os dados do formulário
      },
      (error) => {
        console.error('Erro ao cadastrar cliente:', error);
        // Exibir mensagem de erro
      }
    );
  }
}
