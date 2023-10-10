import { Component, OnInit,ViewChild } from "@angular/core";
import { RestService } from "src/app/Services/rest.service";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {
  displayedColumns: string[]= [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  dataSource: MatTableDataSource<any>;
    constructor(public api: RestService) {
      this.dataSource=new MatTableDataSource();
    }
    ngOnInit(): void {
        this.getUser();
        /* this.postUser();
        this.putUser();
        this.deleteUser(); */
    }
    public getUser(){
        this.api.Get("Usuarios").then((res)=>{

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
      }
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    public postUser(){
      this.api.Post("Usuarios", {
          
        nombre: "Steven",
        contraseña: "145",
        fechaCreaUsu: "2023/09/28",
        status: 0
      })
  }
  
  public putUser(){
      this.api.Put("usuarios",1,{
  
        idUsuario:1 ,
        nombre: "Steven",
        contraseña: "145",
        fechaCreaUsu: "2023/09/28",
        status: 0
      })
  }
  
  public deleteUser(){
      this.api.Delete("usuarios",{
  
        nombre: "Steven",
        contraseña: "145",
        fechaCreaUsu: "2023/09/28",
        status: 0
        
      },"2")
  }
  
  }
  

    

