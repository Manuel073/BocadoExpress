import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-orden-detalle',
  templateUrl: './form-orden-detalle.component.html',
  styleUrls: ['./form-orden-detalle.component.css']
})
export class FormOrdenDetalleComponent {
  
  
  productosForm= this.fb.group({
    
    Nombre: new FormControl("", Validators.required),
    Total: new FormControl("", Validators.required),
    Cantidad: new FormControl("",Validators.required),
    Precio: new FormControl("",Validators.required),
    //Estado: new FormControl("", Validators.required)
  });
  constructor(private fb: FormBuilder){}  
  OnSubmit():void{
    if(this.productosForm.valid){
      Swal.fire("Completado", "Detalle de orden agregado", "success")
  
    }else{
      Swal.fire("Advertencia!", "Agregue los datos requeridos", "error")
    }
  }
}
