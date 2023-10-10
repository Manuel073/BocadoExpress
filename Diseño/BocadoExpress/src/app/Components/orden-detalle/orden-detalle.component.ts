import { Component, OnInit,ViewChild } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-orden-detalle',
  templateUrl: './orden-detalle.component.html',
  styleUrls: ['./orden-detalle.component.css']
})
export class OrdenDetalleComponent implements OnInit {
  displayedColumns: string[]= [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  dataSource: MatTableDataSource<any>;
  constructor(public api: RestService) {
    this.dataSource=new MatTableDataSource();
  }

  ngOnInit(): void {
      this.getOrdendetalle();
      this.postOrdendetalle();
      this.putOrdendetalle();
      this.deleteOrdendetalle();
      
  }
  public getOrdendetalle(){
      this.api.Get("OrdenDetalle").then((res)=>{

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
  

  public postOrdendetalle(){
    this.api.Post("OrdenDetalle", {
      idOrdenDetalle: "1",
      idOrde: "1",
      idProduc: "2",
      cantidad: 6,
      precio: 1630,
      status:"0"
      
    })
  }

  public putOrdendetalle(){
    this.api.Put("OrdenDetalle", 1,{
      idOrdenDetalle: "1",
      idOrde: "1",
      idProduc: "2",
      cantidad: 6,
      precio: 1630,
      status:"0"
      
    })
  }

  public deleteOrdendetalle(){
    this.api.Delete("OrdenDetalle", {
      
      idOrde: "1",
      idProduc: "2",
      cantidad: 6,
      precio: 1630,
      status:"0"
    },"3")
  }
} 
