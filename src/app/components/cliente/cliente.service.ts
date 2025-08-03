import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//importando matSnackBar
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ClienteDTO } from './cliente.model';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  baseUrl = "http://localhost:8080/clientes"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(cliente: ClienteDTO): Observable<ClienteDTO>{
    return this.http.post<ClienteDTO>(this.baseUrl, cliente)
  }

  read(): Observable<ClienteDTO[]>{
    return this.http.get<ClienteDTO[]>(this.baseUrl)
  }

  readById(id_cliente: string): Observable<ClienteDTO>{
    const url = `${this.baseUrl}/${id_cliente}`
    return this.http.get<ClienteDTO>(url)
  }
 
  update(cliente: ClienteDTO): Observable<ClienteDTO>{
    const url = `${this.baseUrl}/${cliente.id_cliente}`
    return this.http.put<ClienteDTO>(url, cliente)
  }
  
  delete(id_cliente: number): Observable<ClienteDTO>{    
    const url = `${this.baseUrl}/${id_cliente}`
    return this.http.delete<ClienteDTO>(url)
  }


}  
