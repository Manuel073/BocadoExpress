import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './Components/usuarios/UsuariosComponent';
import { CarritoComponent } from './Components/carrito/carrito.component';
import { OrdenComponent } from './Components/orden/orden.component';
import { ProductoComponent } from './Components/producto/producto.component';
import { ViviendaComponent } from './Components/vivienda/vivienda.component';
import { OrdendetalleComponent } from './Components/ordendetalle/ordendetalle.component';
import { MetodopagoComponent } from './Components/metodopago/metodopago.component';
import { LoginComponent } from './Components/login/login.component';



const routes: Routes = [
{path: "usuarios",component:UsuariosComponent},
{path: "carrito",component:CarritoComponent},
{path: "metodopago",component:MetodopagoComponent},
{path: "orden",component:OrdenComponent},
{path: "ordendetalle",component:OrdendetalleComponent},
{path: "producto",component:ProductoComponent},
{path: "vivienda",component:ViviendaComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
