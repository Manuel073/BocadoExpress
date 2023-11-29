import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-carrito',
  templateUrl: './form-carrito.component.html',
  styleUrls: ['./form-carrito.component.css']
})
export class FormCarritoComponent {
  carritoForm= this.fb.group({
    
    NombreUsuario: new FormControl("", Validators.required),
    NombreProducto: new FormControl("", Validators.required),
    Cantidad: new FormControl("",Validators.required),
    //Estado: new FormControl("", Validators.required)
  });
  constructor(private fb: FormBuilder){}  

  OnSubmit():void{
    if(this.carritoForm.valid){
      Swal.fire("Completado", "Carrito agregado", "success")
  
    }else{
      Swal.fire("Advertencia!", "Agregue los datos requeridos", "error")
    }
  }}
