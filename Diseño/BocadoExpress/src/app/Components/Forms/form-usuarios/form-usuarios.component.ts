import { Component,Inject,OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { FormDataComponent } from "../../../Services/Data_Formulario/form-data/form-data.component";




@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.css'],
  
})

export class FormUsuariosComponent implements OnInit {

  selectedDate: Date;
  onDateSelected(event: any) {
    this.selectedDate = event.value;
  }
  productosForm= this.fb.group({
    
    Nombre: new FormControl("", Validators.required),
    Contraseña: new FormControl("", Validators.required),
    Fecha: new FormControl("",Validators.required),
    status: new FormControl("", Validators.required)
  });

  public result2:any='';
  constructor(private fb: FormBuilder,public serviceFormulario:FormDataComponent ){
    
  }  
  ngOnInit(): void {  
    //La informacion ponerla en un formulario.
    const result=Object.values(this.serviceFormulario.GetFormularioData());
    console.log(result[3]);
    const Formatter=result[3];

    this.productosForm.get('Nombre').setValue(result[1]);
    this.productosForm.get('Contraseña').setValue(result[2]);
    this.productosForm.get('status').setValue(result[4].toString());
    this.productosForm.get('Fecha').setValue(Formatter.replaceAll('/','-'));

    console.log(this.productosForm.value)

  }


  OnSubmit():void{
    if(this.productosForm.valid){
      
      if(this.serviceFormulario.TypeAccion=='Modificar'){

      }
      Swal.fire("Completado", "Usuario agregado", "success")
  
    }else{
      Swal.fire("Advertencia!", "Agregue los datos requeridos", "error")
    }
  }
}