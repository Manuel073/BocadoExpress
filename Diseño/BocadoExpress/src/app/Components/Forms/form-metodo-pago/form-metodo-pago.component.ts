import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-metodo-pago',
  templateUrl: './form-metodo-pago.component.html',
  styleUrls: ['./form-metodo-pago.component.css']
})
export class FormMetodoPagoComponent {
  carritoForm= this.fb.group({
    
    Nombre: new FormControl("", Validators.required),
    //Estado: new FormControl("", Validators.required)
  });
  constructor(private fb: FormBuilder){}  
  OnSubmit():void{
    if(this.carritoForm.valid){
      Swal.fire("Completado", "Metodo de pago agregado", "success")
  
    }else{
      Swal.fire("Advertencia!", "Agregue los datos requeridos", "error")
    }
}}
