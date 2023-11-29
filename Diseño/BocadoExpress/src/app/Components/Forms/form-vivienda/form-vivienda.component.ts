import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-vivienda',
  templateUrl: './form-vivienda.component.html',
  styleUrls: ['./form-vivienda.component.css']
})
export class FormViviendaComponent {
  
  
  productosForm= this.fb.group({
    
    Nombre: new FormControl("", Validators.required),
    Direccion: new FormControl("", Validators.required),
    Barrio: new FormControl("",Validators.required),
    Ciudad: new FormControl("",Validators.required),
    //Estado: new FormControl("", Validators.required)
  });
  constructor(private fb: FormBuilder){;}  
  OnSubmit():void{
    if(this.productosForm.valid){
      Swal.fire("Completado", "Vivienda agregada", "success")
  
    }else{
      Swal.fire("Advertencia!", "Agregue los datos requeridos", "error")
    }
  }
}
