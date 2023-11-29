import { Component,OnInit} from '@angular/core';
import { RestService } from './Services/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'BocadoExpress';
  public isValid:boolean=false;

  constructor(private api:RestService){
  }
  ngOnInit(): void {
    this.ValidSession();
  }

  public ValidSession():void{
     let ValidStorage=sessionStorage.getItem('token');

     if(ValidStorage != null){
       this.isValid=true;
     }else{
       this.isValid=false;
     }
  }

  

}
