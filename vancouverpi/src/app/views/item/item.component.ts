import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/model/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  items = new Array<Item>();
  itemEdicao?: Item = undefined;
  estaEditando = false;

  constructor(private ItemService:ItemService) { }


  ngOnInit(): void {
    this.listarItem();
  }

  listarItem(): void{
    this.ItemService.listarItem().subscribe(items => {
      this.items = items;
    });
  }

  salvar(): void{
    if (this.itemEdicao == undefined){
      return
    }
    if(!this.estaEditando){
    this.ItemService.inserirItem(this.itemEdicao).subscribe(() => {
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

