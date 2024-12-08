import { Component, OnInit } from '@angular/core';
import { Loan, LoanService } from '../loan-service/loan-service.component'; // Make sure the path is correct
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';


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

  pv: number = 0;

  fees_i: number = 0;
  period_n: number = 0;

  currency: string = '';

  loanResult: any = null; // Adicionando a variável para armazenar o resultado


  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    // Define a data mínima e a data atual
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    this.currentDate = this.minDate; // A data atual
    this.fees_i = 0;
    this.period_n = 0;

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

  // Método que será chamado no submit
  onSubmit() {
    if (!this.ptax) {
      console.log('PTAX não definida. Aguardando dados da PTAX...');
      return;
    }

    // Cria o objeto Loan com os dados fornecidos
    const loan: Loan = {
      date_start: this.currentDate,
      pv: this.pv,
      fees_i: this.fees_i,
      period_n: this.period_n,
      ptax: this.ptax,
      currency: this.selectedCurrency
    };

    // Chama o método do serviço para calcular o preço do empréstimo
    this.loanService.calculateLoanPrice(loan).subscribe(
      (result) => {
        this.loanResult = result; // Atualizando o loanResult com a resposta
        console.log('Resultado do empréstimo:', this.loanResult);
      },
      (error) => {
        console.error('Erro ao calcular o empréstimo:', error);
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