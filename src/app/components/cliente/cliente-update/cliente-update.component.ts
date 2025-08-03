import { Component, OnInit } from '@angular/core';
import { ClienteDTO } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatoDTO } from 'src/app/models/contato.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  //cliente!: ClienteDTO;

  cliente: ClienteDTO = {
  id_cliente: 0,
  nome_cli: '',
  cpf_cli: '',
  telefone_cli: '',
  email_cli: '',
  contatos: {
    cep: '',
    municipio: '',
    logradouro: '',
    numero: '',
    complemento: '',
    uf: ''
  }
};

  constructor(
    private http: HttpClient,
    private clienteService: ClienteService, 
    private router: Router, 
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id_cliente = this.route.snapshot.paramMap.get('id_cliente')
    this.clienteService.readById(id_cliente!).subscribe((cliente: ClienteDTO) =>{
      this.cliente = cliente
      console.log(cliente)
    })
  }

  buscaEnderecoPorCep(cep: string): void {
    const cepNumeros = cep.replace(/\D/g, '');

    this.http.get<any>(`https://viacep.com.br/ws/${cepNumeros}/json/`)
      .subscribe(dados => {
        if (!dados.erro) {
          this.cliente.contatos.logradouro = dados.logradouro;
          this.cliente.contatos.municipio = dados.localidade;
          this.cliente.contatos.uf = dados.uf;
        } else {
          console.warn('CEP não encontrado:', cep)
        }
      }, erro => {
        console.error('Erro ao buscar CEP:', erro);
      });
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

  cepFormatado: string = '';

  onCepInput(event: any): void {
    let valor = event.target.value;

    // Remove qualquer caractere que não seja número
    valor = valor.replace(/\D/g, '');

    // Limita a 8 dígitos
    if (valor.length > 8) {
      valor = valor.substring(0, 8);
    }

    // Aplica a máscara XXXXX-XXX
    if (valor.length > 5) {
      valor = valor.replace(/^(\d{5})(\d{1,3})$/, '$1-$2');
    }

    this.cepFormatado = valor;

    if (valor.length === 9) {
      this.buscaEnderecoPorCep(valor);
    }
  }

  updateCliente(): void {
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
    this.clienteService.update(this.cliente).subscribe(() => {
      this.clienteService.showMessage('Cliente atualizado com sucesso!')
      this.router.navigate(['/clientes'])
    })
  }

  cancel(): void {
    this.router.navigate(['/clientes'])
  }
}
