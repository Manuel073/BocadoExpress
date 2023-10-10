import { Component, OnInit,ViewChild } from "@angular/core";
import { RestService } from "src/app/Services/rest.service";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
    selector: 'app-producto',
    templateUrl: './producto.component.html',
    styleUrls: ['./producto.component.css']
})

export class ProductoComponent implements OnInit {
    displayedColumns: string[]= [];
     @ViewChild(MatPaginator) paginator: MatPaginator;
     @ViewChild(MatSort) sort:MatSort;
    dataSource: MatTableDataSource<any>;
    constructor(public api: RestService) {
        this.dataSource=new MatTableDataSource();
    }


    ngOnInit(): void {
        this.getProducto();
        this.postProducto();
        this.putProducto();
        this.deleteProducto();
    }
    public getProducto(){
        this.api.Get("Productoes").then((res)=>{

            for (let index = 0; index < res.length; index++){
              this.loadTable([res[index]])
            }
            this.dataSource.data=res
            this.dataSource.paginator=this.paginator
            this.dataSource.sort=this.sort;
            console.log(res);
          });
    }
    loadTable(data: any[]) {
        this.displayedColumns=[];
        if(data.length>0){
          for(let column in data[0]){
          this.displayedColumns.push(column)
          }
          this.displayedColumns.push('Acciones')
        }
      }
      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }

    public postProducto(){
        this.api.Post("Productoes", {
            idControl: "1",
            nombre: "verdura",
            fecha: "2022/2/24",
            precio: "14000",
            
        })
    }

    public putProducto(){
        this.api.Put("Productoes",1, {
            idControl: "1",
            nombre: "verdura",
            fecha: "2022/2/24",
            precio: "14000",
           
            
        })
    }

    public deleteProducto(){
        this.api.Delete("Productoes", {
            idControl: "1",
            nombre: "verdura",
            fecha: "2022/2/24",
            precio: "14000",
            
           
        },"3")
    }

}