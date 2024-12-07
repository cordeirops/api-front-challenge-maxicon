import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private apiUrl = 'http://localhost:8080/loans';  // URL da sua API

  constructor(private http: HttpClient) { }

  // // Método para pegar todos os empréstimos
  // getLoans(): Observable<Loan[]> {
  //   return this.http.get<Loan[]>(this.apiUrl);
  // }


  getCurrencies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-currencies`);
  }

  getPtax(currency: string, date: string): Observable<number | null> {
    const ptaxDTO = { currency, date };
    return this.http.post<any>(`${this.apiUrl}/get-ptax`, ptaxDTO).pipe(
      map(response => {
        if (response && Array.isArray(response) && response.length > 0) {
          // Acessa o primeiro item do array, que contém os dados relevantes
          const fechamento = response.find(
            (item: any) => item.tipoBoletim === 'Fechamento PTAX'
          );
          return fechamento ? fechamento.cotacaoVenda : null;
        }
        return null; // Retorna null se não houver resultados
      })
    );
  }
  // // Método para criar um novo empréstimo
  // createLoanPrice(loan: Loan): Observable<Loan> {
  //   var locate  = 'http://localhost:8080/loans/calculate-price';
  //   return this.http.post<Loan>(this.apiUrl, loan);
  // }

}