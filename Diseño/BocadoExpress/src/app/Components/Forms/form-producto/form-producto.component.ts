import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent {

  productosForm= this.fb.group({
    
    Nombre: new FormControl("", Validators.required),
    Fecha: new FormControl("", Validators.required),
    Precio: new FormControl("",Validators.required),
    Estado: new FormControl("", Validators.required)
  });
  constructor(private fb: FormBuilder){}  
  OnSubmit():void{
    Swal.fire("Completado", "Producto agregado", "success");
  }
}
