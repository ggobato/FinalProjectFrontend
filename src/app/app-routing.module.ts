import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {ProductCrudComponent} from  './views/product-crud/product-crud.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteCrudComponent } from './views/cliente-crud/cliente-crud.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ProdutosCreateComponent } from './components/produtos/produtos-create/produtos-create.component';
import { ProdutosUpdateComponent } from './components/produtos/produtos-update/produtos-update.component';
import { ProdutosDeleteComponent } from './components/produtos/produtos-delete/produtos-delete.component';

//configuração para rotear entre as paginas na home
const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "produtos",
    component: ProductCrudComponent
  },
  {
    path: "produtos/create",
    component: ProdutosCreateComponent
  },
  {
    path: "produtos/update/:proId",
    component: ProdutosUpdateComponent
  },
  {
    path: "produtos/delete/:proId",
    component: ProdutosDeleteComponent
  },
  {
    path: "clientes",
    component: ClienteCrudComponent
  },
  {
    path: "clientes/create",
    component: ClienteCreateComponent
  },
  {
    path: "clientes/update/:cliId",
    component: ClienteUpdateComponent
  },
  {
    path: "clientes/delete/:cliId",
    component: ClienteDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
