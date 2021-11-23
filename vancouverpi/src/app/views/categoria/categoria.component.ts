import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categoria = new Array<Categoria>();
  categoriaEdicao?: Categoria = undefined;
  estaEditando = false;

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.listarCategoria();
  }

  listarCategoria(): void{
    this.categoriaService.listarCategorias().subscribe(categoria => {
      this.categoria = categoria;
    });
  }

  salvar():void{
    if(this.categoriaEdicao == undefined){
      return;
    }
    if(!this.estaEditando){
    this.categoriaService.inserirCategoria(this.categoriaEdicao).subscribe(() => {
      this.listarCategoria();
    })
  }
  else{
    this.categoriaService.atualizar(this.categoriaEdicao).subscribe(()=>{
      this.listarCategoria();
      this.cancelar();
      this.estaEditando=false;
   });

  }
  }

  novoCategoria(){
    this.categoriaEdicao = new Categoria();
  }

  cancelar(){
    this.categoriaEdicao = undefined;
  }

  selecionarCategoria(categoria:Categoria){
    this.categoriaEdicao = categoria;
    this.estaEditando = true;
  }

  excluir(categoria: Categoria){
    const resposta = confirm(`Confirma a exclusão de ${categoria.nome_categoria}`);
    if(resposta && this.categoriaEdicao && categoria.id_categoria){
      this.categoriaService.excluir(categoria.id_categoria).subscribe(() => {
        this.listarCategoria();
      });
    }
  }

}
