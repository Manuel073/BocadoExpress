import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-orden',
  templateUrl: './form-orden.component.html',
  styleUrls: ['./form-orden.component.css']
})
export class FormOrdenComponent {

  productosForm= this.fb.group({
    
    Nombre: new FormControl("", Validators.required),
    Total: new FormControl("", Validators.required),
    Ciudad: new FormControl("",Validators.required),
    MetodoPago: new FormControl("",Validators.required),
    //Estado: new FormControl("", Validators.required)
  });
  constructor(private fb: FormBuilder){}  
  OnSubmit():void{
    if(this.productosForm.valid){
      Swal.fire("Completado", "Orden agregado", "success")
  
    }else{
      Swal.fire("Advertencia!", "Agregue los datos requeridos", "error")
    }
  }
}
