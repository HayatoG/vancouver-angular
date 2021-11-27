import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SobreComponent } from './views/sobre/sobre.component';
import { ClienteComponent } from './views/cliente/cliente.component';
import { FormsModule } from '@angular/forms';
import { CategoriaComponent } from './views/categoria/categoria.component';
import { ItemComponent } from './views/item/item.component';
import { ReservaComponent } from './views/reserva/reserva.component';

@NgModule({
  declarations: [
    AppComponent,
    SobreComponent,
    ClienteComponent,
    CategoriaComponent,
    ItemComponent,
    ReservaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
