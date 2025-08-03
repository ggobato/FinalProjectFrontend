import { Component, OnInit } from '@angular/core';
import { Fornecedores } from '../fornecedores.model';
import { FornecedorService } from '../fornecedores.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fornecedores-create',
  templateUrl: './fornecedores-create.component.html',
  styleUrls: ['./fornecedores-create.component.css']
})
export class FornecedoresCreateComponent implements OnInit {

  fornecedor: Fornecedores = {
    nome_for: '',
    razao_social_for: '',
    cnpj_for:'',
    telefone_for:'',
    email_for:''
  }

  constructor(private fornecedorService: FornecedorService,
    private router: Router) { }

  ngOnInit(): void {

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


  createFornecedor(): void {
    if (!this.fornecedor.nome_for || !this.fornecedor.cnpj_for || !this.fornecedor.telefone_for || !this.fornecedor.razao_social_for) {
      alert('Preencha todos os campos obrigatórios!(*)');
      return;
    }

    if (this.fornecedor.cnpj_for.length < 14) {
      this.fornecedorService.showMessage('CNPJ inválido');
      return;
    }

    if (this.fornecedor.telefone_for.length < 15) {
      this.fornecedorService.showMessage('Número de telefone inválido')
    }

    this.fornecedorService.create(this.fornecedor).subscribe(() => {
      this.fornecedorService.showMessage('Fornecedor criado!')
      this.router.navigate(['/fornecedores'])
    })
  }

  cancel(): void {
    this.router.navigate(['/fornecedores'])
  }

}
