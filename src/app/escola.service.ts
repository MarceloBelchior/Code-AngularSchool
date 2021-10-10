import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EscolasService {

  constructor(
    private http: HttpClient) { }

 getEscolas() {
   return this.http.get<any>('/api/Escolas/ListaEscolas');
 }
 getOrigem(logradouro : string) {
   return this.http.get<any>('/api/Escolas/logradouro/' +  logradouro );
 }
}

