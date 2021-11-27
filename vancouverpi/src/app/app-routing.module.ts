import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './views/categoria/categoria.component';
import { ClienteComponent } from './views/cliente/cliente.component';
import { ItemComponent } from './views/item/item.component';
import { ReservaComponent } from './views/reserva/reserva.component';
import { SobreComponent } from './views/sobre/sobre.component';

const routes: Routes = [
  {
    path: 'sobre',
    component: SobreComponent
  },

  {
    path:'usuario',
    component: ClienteComponent
  },

  {
    path:'categoria',
    component: CategoriaComponent
  },

  {
    path:'reserva',
    component: ReservaComponent
  },

  {
    path:'item',
    component: ItemComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
