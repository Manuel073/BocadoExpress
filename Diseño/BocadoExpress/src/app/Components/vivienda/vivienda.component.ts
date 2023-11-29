import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
import { FormViviendaComponent } from '../Forms/form-vivienda/form-vivienda.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vivienda',
  templateUrl: './vivienda.component.html',
  styleUrls: ['./vivienda.component.css']
})


export class ViviendaComponent implements OnInit {
  displayedColumns: string[]= [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  cargando:boolean;
  dataSource: MatTableDataSource<any>;
  
  constructor(public api: RestService, private matDialog:MatDialog) {
    this.cargando=true;
    this.dataSource=new MatTableDataSource();
  }
  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
    this.dataSource.paginator=this.paginator
    this.dataSource.sort=this.sort;
  }
  openDialog(){
    this.matDialog.open(FormViviendaComponent,{
        width:'370px', 
    })
}

  ngOnInit(): void {
      this.getVivienda();
      // this.postVivienda();
      // this.putVivienda();
      //this.deleteVivienda();
  }
  public getVivienda(){
      this.api.Get("vivienda").then((res)=>{
        this.displayedColumns=Object.keys(res[0]);
        this.dataSource.data=res;
        this.displayedColumns.push('Acciones');
       setTimeout(() => {
        this.cargando=false;
       }, 600);
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

  

  // public postVivienda(){
  //   this.api.Post("vivienda", {
  //     idUsu: "2",
  //     direccion: "calle 98#54",
  //     barrio: "Marichuela",
  //     ciudad: "Bogota",
  //     status:"0"
  //   })
  // }

  // public putVivienda(){
  //   this.api.Put("vivienda/",2, {
  //     idControl: "2",
  //     idUsu: "2",
  //     direccion: "calle 98#54",
  //     barrio: "Marichuela",
  //     ciudad: "Bogota",
  //     status:"0"
  //   })
  // }

  public deleteVivienda(id){
    this.api.Delete("vivienda",id)
  }

Eliminar(id){
 
  Swal.fire({
      title: '¿Desea eliminar la información?',
      text: "Los cambios no se podran restablecer! ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      
      if (result.isConfirmed) {

          Swal.fire(
            'Información eliminada',
            `La descipcion del elemento ${id} ha sido retirado.`,
            'success'
          )
          
          setInterval(()=>{
          window.location.reload();
          }, 2000)

          this.deleteVivienda(id) 
      }
    })
  }
}



