import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestService } from 'src/app/Services/rest.service';


@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {
  displayedColumns: string[]= [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  dataSource: MatTableDataSource<any>;
  constructor(public api: RestService) {
    this.dataSource=new MatTableDataSource();
  }

  
  ngOnInit(): void {
      this.get();
      this.postOrden();
      this.putOrden();
      this.deleteOrden();
  }
  public get(){
      this.api.Get("Orden").then((res)=>{

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

  public postOrden(){
    this.api.Post("orden", {
      idOrden: "1",
      idUsu: "1",
      idMetodoPa: "1",
      total: 60000,
      idVivien: "1",
      status:"0"
     })
}

  public putOrden(){
    this.api.Put("orden", 1,{
      idOrden: "1",
      idUsu: "1",
      idMetodoPa: "1",
      total: 60000,
      idVivien: "1",
      status:"0"
    })
  }

  public deleteOrden(){
    this.api.Delete("orden", {
      idOrden: "1",
      idUsu: "1",
      idMetodoPa: "1",
      total: 60000,
      idVivien: "1",
      status:"0"
    },"2")
  }
}


