import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/model/item';
import { ItemService } from 'src/app/services/item.service';
import { Cliente } from 'src/app/model/cliente';
import { Categoria } from 'src/app/model/categoria';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  items = new Array<Item>();
  itemEdicao?: Item = undefined;
  estaEditando = false;

  textomod:string | undefined;
  textomodCate: string | undefined;

  clientes = new Array <Cliente>();
  clienteEdicao?: Number;

  categorias = new Array <Categoria>();
  categoriaEdicao?: Number;

  constructor(private ItemService:ItemService) { }


  

  ngOnInit(): void {
    this.listarItem();
    this.listarClientes();
    this.listarCategoria();
  }

  selecionaCliente(val:any){
    this.salvaIdCliente(val);
  }

  salvaIdCliente(val:any){
    this.textomod = "O valor " + val + " foi selecionado na lista"
  }



  selecionaCategoria(valor:any){
    this.salvaIdCategoria(valor);
  }

  salvaIdCategoria(valor:any){
    this.textomodCate = "O valor da categoria " + valor + " foi selecionado na lista"
  }



  listarItem(): void{
    this.ItemService.listarItem().subscribe(items => {
      this.items = items;
    });
  }

  listarClientes(): void{
    this.ItemService.listarCliente().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  listarCategoria(): void{
    this.ItemService.listarCategorias().subscribe(categoria => {
      this.categorias = categoria;
    });
  }

  salvar(): void{
    if (this.itemEdicao == undefined){
      return
    }
    if(!this.estaEditando){
    this.ItemService.inserir(this.itemEdicao).subscribe(() => {
      this.listarItem();
      this.cancelar ();
    });
  }
  else{
      this.ItemService.atualizar(this.itemEdicao).subscribe(()=>{
         this.listarItem();
         this.cancelar();
         this.estaEditando=false;
      });
    }
  }

  novoItem(){
    this.itemEdicao = new Item();
    this.estaEditando = false;
  }

  cancelar(){
    this.itemEdicao = undefined;
    this.estaEditando = false;
  }

  selecionarItem(item:Item){
    this.itemEdicao = item;
    this.estaEditando = true;
  }

  excluir(item: Item){
    const resposta = confirm(`Confirma a exclusão de ${item.nome_item}`);
    if(resposta && item && item.id_item){
      this.ItemService.excluir(item.id_item).subscribe(() => {
        this.listarItem();
      });
    }
  }

}

