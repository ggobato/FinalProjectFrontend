import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements OnInit {

  totalClientes: number = 0;
  totalFornecedores: number = 0;  
  totalFuncionarios: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<number>('http://localhost:8080/clientes/count').subscribe(dado => this.totalClientes = dado);
    this.http.get<number>('http://localhost:8080/fornecedores/count').subscribe(dado => this.totalFornecedores = dado);
    this.http.get<number>('http://localhost:8080/funcionarios/count').subscribe(dado => this.totalFuncionarios = dado);
  }

}
