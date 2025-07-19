import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoService } from '../produto.service';
import { Produto } from '../produto.model';

@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.css']
})
export class ProdutoCreateComponent implements OnInit {

  produto: Produto = {
    nome_prod: '',
    marca_prod: '',
    qtde_prod: 0,
    preco_prod: 0,
    descricao_prod: ''
  }

  constructor(private produtoService: ProdutoService,
    private router: Router) { }

  ngOnInit(): void {
  }

  createProduto(): void {
    this.produtoService.create(this.produto).subscribe(() => {
      this.produtoService.showMessage('Produto criado com sucesso!');
      this.router.navigate(['/produtos']);
    })
  } 

  cancel(): void {
    this.router.navigate(['/produtos'])
  }

}
