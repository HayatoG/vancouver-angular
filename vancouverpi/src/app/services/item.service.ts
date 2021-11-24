import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Item } from '../model/item';
@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  
  listarItem(): Observable<Item[]> {
    return this.http.get<Item[]>('http://localhost:8080/vancouver/webapi/item')
  }

  inserirItem(item:Item): Observable<void>{
    return this.http.post<void>('http://localhost:8080/vancouver/webapi/item', Item)
  }

  atualizar(item: Item): Observable <void>{
    return this.http.put<void>('http://localhost:8080/vancouver/webapi/item', Item);
  }

  excluir(id_item: number): Observable<void>{
    let parametro = new HttpParams();
    parametro = parametro.append('id_item',id_item);
    return this.http.delete<void>('http://localhost:8080/vancouver/webapi/item', {params:parametro})
  }



}
