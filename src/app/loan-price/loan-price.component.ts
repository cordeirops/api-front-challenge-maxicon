import { Component, OnInit } from '@angular/core';
import { LoanService } from '../loan-service/loan-service.component'; // Make sure the path is correct
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';


interface Currency {
  simbolo: string;
  nomeFormatado: string;
}

interface PtaxItem {
  paridadeCompra: number;
  paridadeVenda: number;
  cotacaoCompra: number;
  cotacaoVenda: number;
  dataHoraCotacao: string;
  tipoBoletim: string;
}

@Component({
  selector: 'app-loan-price',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loan-price.component.html',
  styleUrls: ['./loan-price.component.css']
})
export class LoanPriceComponent implements OnInit {

  // Inicializando diretamente na declaração
  minDate: string = '';
  currentDate: string = '';

  currencies: Currency[] = [];
  selectedCurrency: string = '';
  ptax: number | null = null; // Certifique-se de que a variável "ptax" esteja definida

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    // Define a data mínima e a data atual
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    this.currentDate = this.minDate; // A data atual

    this.loanService.getCurrencies().subscribe(
      (data) => {
        console.log('Moedas recebidas:', data);  // Verifique o que está sendo retornado
        this.currencies = data;  // Armazena a lista de moedas
      },
      (error) => {
        console.error('Erro ao buscar moedas:', error);
      }
    );
  }
  
  // Chama o serviço para pegar a PTAX
  onCurrencyChange() {
    if (!this.currentDate || !this.selectedCurrency) {
      console.log('Selecione uma moeda e uma data válida.');
      return;
    }
  
    // Formatar a data para o formato MM-dd-yyyy
    const date = new Date(this.currentDate);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${month}-${day}-${year}`;
  
    console.log('Formatted Date:', formattedDate);
  
    // Chama o serviço para obter o PTAX
    this.loanService.getPtax(this.selectedCurrency, formattedDate).subscribe(
      (response: number | null) => {
        this.ptax = response; // Atualiza o valor de "ptax"
        console.log('PTAX (Fechamento):', this.ptax);
      },
      error => {
        console.error('Erro ao buscar PTAX:', error);
        this.ptax = null; // Define como null em caso de erro
      }
    );
  }
  
  
}