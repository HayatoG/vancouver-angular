import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../model/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  listarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>('http://localhost:8080/vancouver/webapi/categoria')
  }

  inserirCategoria(categoria:Categoria): Observable<void>{
    return this.http.post<void>('http://localhost:8080/vancouver/webapi/categoria', categoria)
  }

  atualizar(categoria: Categoria): Observable <void>{
    return this.http.put<void>('http://localhost:8080/vancouver/webapi/categoria', categoria);
  }

  excluir(id_categoria: number): Observable<void>{
    let parametro = new HttpParams();
    parametro = parametro.append('id_categoria',id_categoria);
    return this.http.delete<void>('http://localhost:8080/vancouver/webapi/categoria', {params:parametro})
  }

}
