import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//importando matSnackBar
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { FornecedorDTO } from './fornecedores.model';

@Injectable({
  providedIn: 'root'
})

export class FornecedorService {

  baseUrl = "http://localhost:8080/fornecedores"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(fornecedor: FornecedorDTO): Observable<FornecedorDTO>{
    return this.http.post<FornecedorDTO>(this.baseUrl, fornecedor)
  }

  read(): Observable<FornecedorDTO[]>{
    return this.http.get<FornecedorDTO[]>(this.baseUrl)
  }

  readById(id_fornecedor: string): Observable<FornecedorDTO>{
    const url = `${this.baseUrl}/${id_fornecedor}`
    return this.http.get<FornecedorDTO>(url)
  }
 
  update(fornecedor: FornecedorDTO): Observable<FornecedorDTO>{
    const url = `${this.baseUrl}/${fornecedor.id_fornecedor}`
    return this.http.put<FornecedorDTO>(url, fornecedor)
  }
  
  delete(id_fornecedor: number): Observable<FornecedorDTO>{    
    const url = `${this.baseUrl}/${id_fornecedor}`
    return this.http.delete<FornecedorDTO>(url)
  }
}  
