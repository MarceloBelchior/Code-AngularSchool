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
 GetRota(slat : number,slog: number, elat: number, elog : number) {
  return this.http.get<any>('/api/Escolas/Directions?sLatitude='+ slat + '&sLongitude='+ slog+'&eLatitude=' + elat + '&eLongitude=' + elog);
}
}

