import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
  
})
export class ClienteComponent implements OnInit {

  clientes = new Array<Cliente>();
  clienteEdicao?: Cliente = undefined;
  estaEditando = false;

  constructor(private ClienteService: ClienteService) { }

  
  ngOnInit(): void {
    this.listarClientes();
  }

  listarClientes(): void{
    this.ClienteService.listarCliente().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  salvar(): void{
    if (this.clienteEdicao == undefined){
      return
    }
    if(!this.estaEditando){
    this.ClienteService.inserir(this.clienteEdicao).subscribe(() => {
      this.listarClientes();
      this.cancelar ();
    });
  }
  else{
      this.ClienteService.atualizar(this.clienteEdicao).subscribe(()=>{
         this.listarClientes();
         this.cancelar();
         this.estaEditando=false;
      });
    }
  }

  novoCliente(){
    this.clienteEdicao = new Cliente();
    this.estaEditando = false;
  }

  cancelar(){
    this.clienteEdicao = undefined;
    this.estaEditando = false;
  }

  selecionarCliente(cliente:Cliente){
    this.clienteEdicao = cliente;
    this.estaEditando = true;
  }

  excluir(cliente: Cliente){
    const resposta = confirm(`Confirma a exclusão de ${cliente.nome_usuario}`);
    if(resposta && cliente && cliente.id_usuario){
      this.ClienteService.excluir(cliente.id_usuario).subscribe(() => {
        this.listarClientes();
      });
    }
  }

}
