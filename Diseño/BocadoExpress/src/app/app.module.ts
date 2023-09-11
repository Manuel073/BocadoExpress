import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './Components/usuarios/UsuariosComponent';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './Components/menu/menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AvatarModule } from 'ngx-avatars';
import { HttpClientModule } from '@angular/common/http';
import { CarritoComponent } from './Components/carrito/carrito.component';
import { MetodoPagoComponent } from './Components/metodo-pago/metodo-pago.component';
import { OrdenComponent } from './Components/orden/orden.component';
import { OrdenDetalleComponent } from './Components/orden-detalle/orden-detalle.component';
import { ProductoComponent } from './Components/producto/producto.component';
import { ViviendaComponent } from './Components/vivienda/vivienda.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    MenuComponent,
    CarritoComponent,
    MetodoPagoComponent,
    OrdenComponent,
    OrdenDetalleComponent,
    ProductoComponent,
    ViviendaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    // Specify AvatarModule as an import
    AvatarModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
