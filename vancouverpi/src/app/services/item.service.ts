import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Item } from '../model/item';
import { Cliente } from '../model/cliente';
import { Categoria } from '../model/categoria';
@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  
  listarItem(): Observable<Item[]> {
    return this.http.get<Item[]>('http://localhost:8080/vancouver/webapi/item')
  }

  listarCliente(): Observable <Cliente[]> {
    return this.http.get<Cliente[]>('http://localhost:8080/vancouver/webapi/usuario');
  }

  listarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>('http://localhost:8080/vancouver/webapi/categoria')
  }

  inserir(item: Item): Observable<void>{
    return this.http.post<void>('http://localhost:8080/vancouver/webapi/item', item)
  }

  atualizar(item: Item): Observable <void>{
    return this.http.put<void>('http://localhost:8080/vancouver/webapi/item', item);
  }

  excluir(id_item: number): Observable<void>{
    let parametro = new HttpParams();
    parametro = parametro.append('id_item',id_item);
    return this.http.delete<void>('http://localhost:8080/vancouver/webapi/item', {params:parametro})
  }



}
