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
      this.get();
  }
  public get(){
      this.api.Get("metodo.pago");
  }
}


