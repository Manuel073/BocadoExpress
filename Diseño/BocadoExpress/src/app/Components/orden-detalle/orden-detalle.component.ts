import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-orden-detalle',
  templateUrl: './orden-detalle.component.html',
  styleUrls: ['./orden-detalle.component.css']
})
export class OrdenDetalleComponent implements OnInit {
  constructor(public api: RestService) {
  }

  ngOnInit(): void {
      this.get();
  }
  public get(){
      this.api.Get("orden-detalle");
  }
} {
}
