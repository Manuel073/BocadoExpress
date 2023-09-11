import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {
  constructor(public api: RestService) {
  }

  
  ngOnInit(): void {
      this.get();
  }
  public get(){
      this.api.Get("orden");
  }
}


