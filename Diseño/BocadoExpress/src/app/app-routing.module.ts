import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './Components/usuarios/UsuariosComponent';
import { CarritoComponent } from './Components/carrito/carrito.component';
import { MetodoPagoComponent } from './Components/metodo-pago/metodo-pago.component';
import { OrdenComponent } from './Components/orden/orden.component';
import { OrdenDetalleComponent } from './Components/orden-detalle/orden-detalle.component';
import { ProductoComponent } from './Components/producto/producto.component';
import { ViviendaComponent } from './Components/vivienda/vivienda.component';

const routes: Routes = [
{path: "usuarios",component:UsuariosComponent},
{path: "carrito",component:CarritoComponent},
{path: "metodo-pago",component:MetodoPagoComponent},
{path: "orden",component:OrdenComponent},
{path: "orden-detalle",component:OrdenDetalleComponent},
{path: "producto",component:ProductoComponent},
{path: "vivienda",component:ViviendaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
