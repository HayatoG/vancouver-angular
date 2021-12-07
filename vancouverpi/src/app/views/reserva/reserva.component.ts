import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/model/item';
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

  reservas = new Array <Reserva>();
  reservasEdicao?: Reserva;
  estaEditando = false;

  textomodCliente: string | undefined;

  textomodItem: string | undefined;

  textomodValorFinal: number = 0;

  textomodValorItem: number = 0;

  textomodReserva = new Date();
  textomodDevolucao = new Date();

  clientes = new Array <Cliente>();
  clienteEdicao?: Number;

  items = new Array <Item>();
  itemEdicao?: Number;
 
  categorias = new Array <Categoria>();
  categoriaEdicao?: Number;

  dataRes = Date(); 
  dataDev= Date();


  testeReserva: number | undefined;

  constructor(private ReservaService:ReservaService) { }

  ngOnInit(): void {
    this.listarReserva();
    this.listarItem();
    this.listarClientes();
  }

  selecionarIdCliente(val:any){
    this.salvaIdCliente(val);
  }

  salvaIdCliente(val:any){
    this.textomodCliente = "O valor " + val + " foi selecionado na lista"
  }

  selecionarIdItem(valor:any){
    this.salvaIdItem(valor);
  }

  salvaIdItem(valor:any){
    this.textomodItem = "O valor do Item " + valor + " foi selecionado na lista"
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

  listarReserva(): void{
    this.ReservaService.listarReserva().subscribe(reservas => {
      this.reservas = reservas;
    })
  }

  salvar(): void{
    if (this.reservasEdicao == undefined){
      return
    }
    if(!this.estaEditando){
      this.ReservaService.inserir(this.reservasEdicao).subscribe(() => {
      this.listarReserva();
      this.cancelar();
    });
  }
  else{
      this.ReservaService.atualizar(this.reservasEdicao).subscribe(()=>{
         this.listarReserva();
         this.cancelar();
         this.estaEditando=false;
      });
    }
  }

  novaReserva(){
    this.reservasEdicao = new Reserva();
    this.estaEditando = false;
  }

  cancelar(){
    this.itemEdicao = undefined;
    this.estaEditando = false;
  }

  selecionarReserva(reserva:Reserva){
    this.reservasEdicao = reserva;
    this.estaEditando = true;
  }

  excluir(reserva: Reserva){
    const resposta = confirm(`Confirma a exclusão de ${reserva.id_reserva}`);
    if(resposta && reserva && reserva.id_reserva){
      this.ReservaService.excluir(reserva.id_reserva).subscribe(() => {
        this.listarReserva();
      });
    }
  }

  selecionarValorReserva(valReserva:Date){
    this.salvaValorReserva(valReserva);
  }

  salvaValorReserva(valorReserva:Date){
    this.textomodReserva = valorReserva;
  }

  selecionarValorDevolucao(valDevolucao:Date){
    this.salvaValorDevolucao(valDevolucao);
  }

  salvaValorDevolucao(valorDevolucao:Date){
    this.textomodDevolucao = valorDevolucao;
  }

  selecionarValorItem(valItem:any){
    this.salvaValorItem(valItem);
  }

  salvaValorItem(valorItem:any){
    this.textomodValorItem = valorItem;
  }


  calculaDiferenca(textomodDevolucao: Date, textomodReserva: Date) {

    var oneDay = 1000 * 3600 * 24;

    var diffInTime = textomodDevolucao.getTime() - textomodReserva.getTime();

    var diff = Math.round(diffInTime / oneDay);

    this.testeReserva = diff;
    
  }

  definePreco(textomodDiferenca: number) {

    this.textomodValorFinal = textomodDiferenca * this.textomodValorItem;
    
  }

}

