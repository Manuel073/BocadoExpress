import { Component, OnInit,ViewChild } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  displayedColumns: string[]= [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  dataSource: MatTableDataSource<any>;
  constructor(public api: RestService) {
    this.dataSource=new MatTableDataSource();
  }

  
  ngOnInit(): void {
      this.getCarrito();
      this.postCarrito();
      this.putCarrito();
      this.deleteCarrito();
  }
  public getCarrito(){
      this.api.Get("carrito").then((res)=>{

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
  public postCarrito(){
    this.api.Post("usuarios", {
        
      idUsu: 0,
      idProduc: 0,
      cantidad: 25,
      status: 0,
    })
}

public putCarrito(){
    this.api.Put("usuarios",1,{
      idControl: "1",
      idUsu: 0,
      idProduc: 0,
      cantidad: 25,
      status: 0,
    })
}

public deleteCarrito(){
    this.api.Delete("usuarios",{

      idUsu: 0,
      idProduc: 0,
      cantidad: 25,
      status: 0,
      
    },"2")
}

}




