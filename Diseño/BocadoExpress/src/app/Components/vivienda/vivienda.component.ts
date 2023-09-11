import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-vivienda',
  templateUrl: './vivienda.component.html',
  styleUrls: ['./vivienda.component.css']
})
export class ViviendaComponent implements OnInit {
  constructor(public api: RestService) {
  }

  
  ngOnInit(): void {
      this.get();
  }
  public get(){
      this.api.Get("vivienda");
  }
}

