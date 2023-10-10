import { Component, OnInit,ViewChild } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-vivienda',
  templateUrl: './vivienda.component.html',
  styleUrls: ['./vivienda.component.css']
})


export class ViviendaComponent implements OnInit {
  displayedColumns: string[]= [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  dataSource: MatTableDataSource<any>;
  constructor(public api: RestService) {
    this.dataSource=new MatTableDataSource();
  }
  ngOnInit(): void {
      this.getVivienda();
      this.postVivienda();
      this.putVivienda();
      this.deleteVivienda();
  }
  public getVivienda(){
      this.api.Get("vivienda").then((res)=>{

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

  

  public postVivienda(){
    this.api.Post("vivienda", {
      idUsu: "2",
      direccion: "calle 98#54",
      barrio: "Marichuela",
      ciudad: "Bogota",
      status:"0"
    })
  }

  public putVivienda(){
    this.api.Put("vivienda/",2, {
      idControl: "2",
      idUsu: "2",
      direccion: "calle 98#54",
      barrio: "Marichuela",
      ciudad: "Bogota",
      status:"0"
    })
  }

  public deleteVivienda(){
    this.api.Delete("vivienda", {
      idUsu: "2",
      direccion: "calle 98#54",
      barrio: "Marichuela",
      ciudad: "Bogota",
      status:"0"
    },"2")
  }
}



