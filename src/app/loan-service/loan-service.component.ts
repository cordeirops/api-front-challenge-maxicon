import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Loan {
  date_start: string;
  pv: number;
  fees_i: number;
  period_n: number;
  ptax: number | null;
  currency: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }



  getCurrencies(): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/currency/get-currencies`);
  }

  getPtax(currency: string, date: string): Observable<number | null> {
    const ptaxDTO = { currency, date };
    return this.http.post<any>(`http://localhost:8080/currency/get-ptax`, ptaxDTO).pipe(
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

  // Método para criar um novo empréstimo
  calculateLoanPrice(loan: Loan): Observable<Loan> {
    const url = 'http://localhost:8080/loan/calculate-price';
    return this.http.post<Loan>(url, loan);
  }

}


