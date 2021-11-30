import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Item } from '../model/item';
import { Cliente } from '../model/cliente';
import { Categoria } from '../model/categoria';
import { Reserva } from '../model/reserva';
@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private http: HttpClient) { }

  
  listarItem(): Observable<Item[]> {
    return this.http.get<Item[]>('http://localhost:8080/vancouver/webapi/item')
  }

  listarCliente(): Observable <Cliente[]> {
    return this.http.get<Cliente[]>('http://localhost:8080/vancouver/webapi/usuario');
  }

  listarReserva(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>('http://localhost:8080/vancouver/webapi/reserva')
  }

  inserir(reserva: Reserva): Observable<void>{
    return this.http.post<void>('http://localhost:8080/vancouver/webapi/reserva', reserva)
  }

  atualizar(reserva: Reserva): Observable <void>{
    return this.http.put<void>('http://localhost:8080/vancouver/webapi/reserva', reserva);
  }

  excluir(id_reserva: number): Observable<void>{
    let parametro = new HttpParams();
    parametro = parametro.append('id_reserva',id_reserva);
    return this.http.delete<void>('http://localhost:8080/vancouver/webapi/reserva', {params:parametro})
  }

}
