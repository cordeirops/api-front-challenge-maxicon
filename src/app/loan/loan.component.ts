import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loan',
  standalone: true,
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css'],
  imports: [CommonModule, FormsModule, NgbModule],
})
export class LoanComponent implements OnInit {
  loan = {
    dateStart: '',   // Inicializa como string
    pv: 0,           // Valor presente
    fees_i: 0,       // Taxa de juros
    period_n: 0,     // Número de parcelas
  };

  minDate!: NgbDate;  // Data mínima no formato NgbDate
  maxDate: NgbDate = new NgbDate(2100, 12, 31); // Data máxima para o calendário
  result: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const today = new Date();
    this.minDate = new NgbDate(today.getFullYear(), today.getMonth() + 1, today.getDate());
    this.loan.dateStart = this.formatDate(this.minDate); // Define a data inicial como string formatada
  }

  // Envia os dados para a API REST
  onSubmit(): void {
    this.sendLoanRequest();
  }

  sendLoanRequest(): void {
    const loanData = {
      date_start: this.loan.dateStart,
      pv: this.loan.pv.toFixed(2),
      fees_i: this.loan.fees_i.toFixed(2),
      period_n: this.loan.period_n,
    };

    console.log('Dados enviados para a API:', loanData);

    this.http.post<any>('http://localhost:8080/calculate-price', loanData).subscribe(
      (response) => {
        this.result = response; // Atualiza os resultados com a resposta da API
      },
      (error) => {
        console.error('Erro ao calcular financiamento:', error);
      }
    );
  }

  // Formata um objeto NgbDate para uma string no formato yyyy-MM-dd
  formatDate(ngbDate: NgbDate): string {
    return `${ngbDate.year}-${String(ngbDate.month).padStart(2, '0')}-${String(ngbDate.day).padStart(2, '0')}`;
  }

  // Restaura o formulário ao estado inicial
  resetForm(): void {
    const today = new Date();
    this.minDate = new NgbDate(today.getFullYear(), today.getMonth() + 1, today.getDate());
    this.loan = {
      dateStart: this.formatDate(this.minDate), // Atualiza a data inicial ao resetar
      pv: 0,
      fees_i: 0,
      period_n: 0,
    };
    this.result = null;
  }
}
