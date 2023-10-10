import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-metodo-pago',
  templateUrl: './metodo-pago.component.html',
  styleUrls: ['./metodo-pago.component.css']
})
export class MetodoPagoComponent implements OnInit {
  constructor(public api: RestService) {
  }

  
  ngOnInit(): void {
      this.getMetodopago();
      this.postMetodopago();
      this.putMetodopago();
      this.deleteMetodopago();
    
  }
  public getMetodopago(){
      this.api.Get("metodo-pago");
  }

  public postMetodopago(){
    this.api.Post("metodo-pago", {
        
      
      nombremetod: "Daviplata",
      status: 0,
    })
  }

  public putMetodopago(){
    this.api.Put("metodo-pago", 1,{
    
      nombremetod: "Daviplata",
      status: 0,
    }, )
  }

  public deleteMetodopago(){
    this.api.Delete("metodo-pago", {
      
      nombremetod: "Daviplata",
      status: 0,
    }, "1")
  }


}


