import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './views/cliente/cliente.component';
import { SobreComponent } from './views/sobre/sobre.component';

const routes: Routes = [
  {
    path: 'sobre',
    component: SobreComponent
  },

  {
    path:'usuario',
    component: ClienteComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
