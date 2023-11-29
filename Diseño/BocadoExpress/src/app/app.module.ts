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
import { OrdenComponent } from './Components/orden/orden.component';
import { ProductoComponent } from './Components/producto/producto.component';
import { ViviendaComponent } from './Components/vivienda/vivienda.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { FormViviendaComponent } from './Components/Forms/form-vivienda/form-vivienda.component';
import { FormUsuariosComponent } from './Components/Forms/form-usuarios/form-usuarios.component';
import { FormProductoComponent } from './Components/Forms/form-producto/form-producto.component';
import { FormOrdenDetalleComponent } from './Components/Forms/form-orden-detalle/form-orden-detalle.component';
import { FormOrdenComponent } from './Components/Forms/form-orden/form-orden.component';
import { FormMetodoPagoComponent } from './Components/Forms/form-metodo-pago/form-metodo-pago.component';
import { FormCarritoComponent } from './Components/Forms/form-carrito/form-carrito.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { OrdendetalleComponent } from './Components/ordendetalle/ordendetalle.component';
import { MetodopagoComponent } from './Components/metodopago/metodopago.component';
import { FormDataComponent } from './Services/Data_Formulario/form-data/form-data.component';
import { LoginComponent } from './Components/login/login.component';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    MenuComponent,
    CarritoComponent,
    OrdenComponent,
    ProductoComponent,
    ViviendaComponent,
    FormViviendaComponent,
    FormUsuariosComponent,
    FormProductoComponent,
    FormOrdenDetalleComponent,
    FormOrdenComponent,
    FormMetodoPagoComponent,
    FormCarritoComponent,
    OrdendetalleComponent,
    MetodopagoComponent,
    FormDataComponent,
    LoginComponent,
    
    
  ],
  imports: [
    
    MatProgressSpinnerModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
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
    AvatarModule,
    FormsModule, 
    ReactiveFormsModule,
    MatTabsModule
    
  ],
  
  providers: [FormDataComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
