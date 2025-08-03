import { Component, OnInit } from '@angular/core';
import { ClienteDTO } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-read',
  templateUrl: './cliente-read.component.html',
  styleUrls: ['./cliente-read.component.css']
})
export class ClienteReadComponent implements OnInit {

  clientes!: ClienteDTO[]
  clientesFiltrados!: ClienteDTO[]
  filtro: string = ''
  displayedColumns = ['id_cliente', 'nome_cli', 'cpf_cli', 'telefone_cli', 'email_cli', 'cep_ctt', 'endereco', 'complemento_ctt', 'municipio_ctt', 'uf_ctt', 'action']

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.read().subscribe(clientes => {
      this.clientes = clientes
      this.clientesFiltrados = clientes
      console.log(clientes)  
    })
  }

  filtrarClientes(): void {
    const termo = this.filtro.trim().toLowerCase();
    this.clientesFiltrados = this.clientes.filter(c => 
      c.nome_cli.toLowerCase().includes(termo) ||
      c.cpf_cli.toLowerCase().includes(termo)
    );
  }
}
