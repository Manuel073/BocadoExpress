import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
import { FormOrdenDetalleComponent } from '../Forms/form-orden-detalle/form-orden-detalle.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ordendetalle',
  templateUrl: './ordendetalle.component.html',
  styleUrls: ['./ordendetalle.component.css']
})
export class OrdendetalleComponent implements OnInit {
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
    this.matDialog.open(FormOrdenDetalleComponent,{
        width:'370px', 
    })
}

  ngOnInit(): void {
      this.getOrdendetalle();
      // this.postOrdendetalle();
      // this.putOrdendetalle();
      //this.deleteOrdendetalle();
      
  }
  public getOrdendetalle(){
      this.api.Get("ordendetalle").then((res)=>{

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
  

  // public postOrdendetalle(){
  //   this.api.Post("OrdenDetalle", {
  //     idOrdenDetalle: "1",
  //     idOrde: "1",
  //     idProduc: "2",
  //     cantidad: 6,
  //     precio: 1630,
  //     status:"0"
      
  //   })
  // }

  // public putOrdendetalle(){
  //   this.api.Put("OrdenDetalle", 1,{
  //     idOrdenDetalle: "1",
  //     idOrde: "1",
  //     idProduc: "2",
  //     cantidad: 6,
  //     precio: 1630,
  //     status:"0"
      
  //   })
  // }

  public deleteOrdenDetalle(id){
    this.api.Delete("ordendetalle",id)
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

          this.deleteOrdenDetalle(id) 
      }
    })
  }
} 


