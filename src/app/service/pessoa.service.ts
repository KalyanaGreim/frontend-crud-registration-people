import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllPessoas(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getPessoaById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createPessoa(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  updatePessoa(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deletePessoa(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
