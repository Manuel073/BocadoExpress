import { Component, OnInit } from "@angular/core";
import { RestService } from "src/app/Services/rest.service";


@Component({
    selector: 'app-producto',
    templateUrl: './producto.component.html',
    styleUrls: ['./producto.component.css']
})

export class ProductoComponent implements OnInit {
    constructor(public api: RestService) {
    }

    
    ngOnInit(): void {
        this.get();
    }
    public get(){
        this.api.Get("Productoes");
    }
}