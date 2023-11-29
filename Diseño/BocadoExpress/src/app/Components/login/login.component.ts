import { Component } from '@angular/core';
import { FormControl, FormGroup,Validators} from '@angular/forms';
import { RestService } from 'src/app/Services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public LoginUser=new FormGroup({
    
     usuario:new FormControl('',Validators.required),
     contraseña:new FormControl('',Validators.required),
     direccion:new FormControl('',Validators.required),
     celular:new FormControl('',Validators.required),
     correo:new FormControl('',Validators.required),
     status:new FormControl(true),
     validlogin:new FormControl(null)
  })
  public isValid:boolean=true;

   constructor(private api:RestService){
   }

   public Onsubmit(accion:string){

    switch (accion) {
      case 'deposit':
        this.api.GetParams('AccesUser/ConfirmSession',
        `user=${this.LoginUser.get('usuario').value}&pswd=${this.LoginUser.get('contraseña').value}`)
        .then(res=>{
         debugger;
           if(res.token.statusCode == undefined){
              sessionStorage.setItem('token',res.token);
              Swal.fire({
                icon:'success',
                text:'Ingresado correctamente',
                toast:true,
                showCloseButton:false,
                showCancelButton:false,
                showConfirmButton:false,
                timerProgressBar:true,
                timer:1200
              }).then(()=>{
                 location.reload();
              })
           }else{
             Swal.fire({
               icon:'error',
               text:`${res.token.value}`,
               toast:true,
               showCloseButton:false,
               showCancelButton:false,
               showConfirmButton:false,
               timerProgressBar:true,
               timer:1200
             })
           }
        })
        break;
        case 'Register':
          // falta la logica al de registrar. post.
          break;
    
      default:
        break;
    }

      
   }
}
