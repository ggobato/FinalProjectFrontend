import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Router } from '@angular/router';
import { Clientes } from '../cliente.model';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Clientes = {
    nome_cli: '',
    cpf_cli:'',
    telefone_cli:'',
    email_cli:''
  }

  //importando clienteService
  constructor(private clienteService: ClienteService,
    private router: Router) { }
  
  ngOnInit(): void {
    
  }

  cpfFormatado: string = '';

  onCpfInput(event: any): void {
    let valor = event.target.value;

    valor = valor.replace(/\D/g, '');

    if (valor.length > 11) {
      valor = valor.substring(0, 11);
    }

    if (valor.length > 9) {
      valor = valor.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})$/, '$1.$2.$3-$4');
    } else if (valor.length > 6) {
      valor = valor.replace(/^(\d{3})(\d{3})(\d{1,3})$/, '$1.$2.$3');
    } else if (valor.length > 3) {
      valor = valor.replace(/^(\d{3})(\d{1,3})$/, '$1.$2');
    }

    this.cpfFormatado = valor;
  }

  telefoneFormatado: string = '';

  onTelefoneInput(event: any): void {
    let valor = event.target.value;

    valor = valor.replace(/\D/g, '');

    if (valor.length > 11) {
      valor = valor.substring(0, 11);
    }

    if (valor.length > 6) {
      valor = valor.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
    } else if (valor.length > 2) {
      valor = valor.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    } else {

      valor = valor.replace(/^(\d{0,2})/, '($1');
    }

    this.telefoneFormatado = valor;
  }

  createCliente(): void {
    if (!this.cliente.nome_cli || !this.cliente.cpf_cli || !this.cliente.telefone_cli || !this.cliente.email_cli) {
      alert('Preencha todos os campos obrigatórios!(*)');
      return;
    }

    if (this.cliente.cpf_cli.length < 14) {
      this.clienteService.showMessage('CPF inválido');
      return;
    }

    if (this.cliente.telefone_cli.length < 15) {
      this.clienteService.showMessage('Número de telefone inválido')
    }
    this.clienteService.create(this.cliente).subscribe(() => {
      this.clienteService.showMessage('Cliente criado!')
      this.router.navigate(['/clientes'])
    })
  }

  cancel(): void {
    this.router.navigate(['/clientes'])
  }  

}
