import { Component, OnInit } from '@angular/core';
import { FornecedorDTO } from '../fornecedores.model';
import { FornecedorService } from '../fornecedores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fornecedores-update',
  templateUrl: './fornecedores-update.component.html',
  styleUrls: ['./fornecedores-update.component.css']
})
export class FornecedoresUpdateComponent implements OnInit {

  //fornecedor!: FornecedorDTO;

  fornecedor: FornecedorDTO = {
    id_fornecedor: 0,
    nome_for: '',
    razao_social_for: '',
    cnpj_for: '',
    telefone_for: '',
    email_for: '',
    contatos: {
      cep: '',
      municipio: '',
      logradouro: '',
      numero: '',
      complemento: '',
      uf: ''
    }
  } 

  constructor(
    private http: HttpClient,
    private fornecedorService: FornecedorService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id_fornecedor = this.route.snapshot.paramMap.get('id_fornecedor')
    this.fornecedorService.readById(id_fornecedor!).subscribe((fornecedor: FornecedorDTO) =>{
      this.fornecedor = fornecedor
    })
  }

  buscaEnderecoPorCep(cep: string): void {
    const cepNumeros = cep.replace(/\D/g, '');

    this.http.get<any>(`https://viacep.com.br/ws/${cepNumeros}/json/`)
      .subscribe(dados => {
        if (!dados.erro) {
          this.fornecedor.contatos.logradouro = dados.logradouro;
          this.fornecedor.contatos.municipio = dados.localidade;
          this.fornecedor.contatos.uf = dados.uf;
        } else {
          console.warn('CEP não encontrado:', cep)
        }
      }, erro => {
        console.error('Erro ao buscar CEP:', erro);
      });
  }

  cnpjFormatado: string = '';

  onCnpjInput(event: any): void {
    let value = event.target.value;

    value = value.replace(/\D/g, '');

    if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
    }
    if (value.length > 6) {
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    }
    if (value.length > 10) {
      value = value.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4');
    }
    if (value.length > 15) {
      value = value.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5');
    }
  
    if (value.length > 18) {
      value = value.substring(0, 18);
    }

    event.target.value = value;
  }

  cepFormatado: string = '';

  onCepInput(event: any): void {
    let valor = event.target.value;

    valor = valor.replace(/\D/g, '');

    if (valor.length > 8) {
      valor = valor.substring(0, 8);
    }

    if (valor.length > 5) {
      valor = valor.replace(/^(\d{5})(\d{1,3})$/, '$1-$2');
    }

    this.cepFormatado = valor;

    if (valor.length === 9) {
      this.buscaEnderecoPorCep(valor);
    }
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

  updateFornecedor(): void {
    if (!this.fornecedor.nome_for || !this.fornecedor.cnpj_for || !this.fornecedor.telefone_for || !this.fornecedor.razao_social_for || !this.fornecedor.contatos.cep || !this.fornecedor.contatos.municipio || !this.fornecedor.contatos.logradouro || !this.fornecedor.contatos.numero || !this.fornecedor.contatos.uf) {
      alert('Preencha todos os campos obrigatórios!(*)');
      return;
    }

    if (this.fornecedor.cnpj_for.length < 14) {
      this.fornecedorService.showMessage('CNPJ inválido');
      return;
    }

     if (this.fornecedor.contatos.cep.length < 9) {
      this.fornecedorService.showMessage('CEP inválido');
      return
    }

    if (this.fornecedor.telefone_for.length < 15) {
      this.fornecedorService.showMessage('Número de telefone inválido')
    }
    this.fornecedorService.update(this.fornecedor).subscribe(() => {
      this.fornecedorService.showMessage('Fornecedor atualizado com sucesso!')
      this.router.navigate(['/fornecedores'])
    })
  }

  cancel(): void {
    this.router.navigate(['/fornecedores'])
  }
}
