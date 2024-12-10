import { Component, OnInit } from '@angular/core';
import { Loan, LoanService } from '../loan-service/loan-service.component'; // Make sure the path is correct
import { CommonModule } from '@angular/common';



interface Currency {
  simbolo: string;
  nomeFormatado: string;
}

@Component({
  selector: 'app-list-loan',
  templateUrl: './list-loan.component.html',
  styleUrls: ['./list-loan.component.css'],
  imports: [CommonModule]
})
export class ListLoanComponent implements OnInit {
  loans: any[] = []; // Array para armazenar os empréstimos

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loanService.getLoans().subscribe(
      (data: any[]) => {
        this.loans = data; // Atribuir os dados retornados pelo serviço ao array loans
        console.log(this.loans);
      },
      (error) => {
        console.error('Erro ao carregar os dados do empréstimo:', error);
      }
    );
  }

  toggleInstallments(loanId: number): void {
    const loan = this.loans.find(l => l.id === loanId);
    if (loan) {
      loan.showInstallments = !loan.showInstallments; // Alterna a visibilidade das parcelas
    }
  }
}
