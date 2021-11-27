import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/model/item';
import { ItemService } from 'src/app/services/item.service';
import { Cliente } from 'src/app/model/cliente';
import { Categoria } from 'src/app/model/categoria';
import { Reserva } from 'src/app/model/reserva';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  items = new Array<Item>();
  itemEdicao?: Item = undefined;
  estaEditando = false;

  textomod:string | undefined;
  textomodCate: string | undefined;

  clientes = new Array <Cliente>();
  clienteEdicao?: Number;

  categorias = new Array <Categoria>();
  categoriaEdicao?: Number;

  reservas = new Array <Reserva>();
  reservasEdicao?: Item = undefined;

  constructor(private ReservaService:ReservaService) { }

  

  ngOnInit(): void {
    this.listarItem();
    this.listarClientes();
    this.listarCategoria();
    this.listarReserva();
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
    this.ReservaService.listarItem().subscribe(items => {
      this.items = items;
    });
  }

  listarClientes(): void{
    this.ReservaService.listarCliente().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  listarCategoria(): void{
    this.ReservaService.listarCategorias().subscribe(categoria => {
      this.categorias = categoria;
    });
  }

  listarReserva(): void{
    this.ReservaService.listarReserva().subscribe(reserva => {
      this.reserva = reserva;
    })
  }

  salvar(): void{
    if (this.itemEdicao == undefined){
      return
    }
    if(!this.estaEditando){
      this.ReservaService.inserir(this.itemEdicao).subscribe(() => {
      this.listarItem();
      this.cancelar ();
    });
  }
  else{
      this.ReservaService.atualizar(this.itemEdicao).subscribe(()=>{
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

  novaReserva(){
    this.reservasEdicao = new Reserva ();
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

