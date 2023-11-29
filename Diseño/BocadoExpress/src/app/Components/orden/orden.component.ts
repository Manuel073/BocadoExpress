import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestService } from 'src/app/Services/rest.service';
import { MatDialog } from "@angular/material/dialog";
import { FormOrdenComponent } from '../Forms/form-orden/form-orden.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {
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
    this.matDialog.open(FormOrdenComponent,{
        width:'370px', 
    })
}
  
  ngOnInit(): void {
      this.get();
      //this.postOrden();
      //this.putOrden();
      //this.deleteOrden();
  }
  public get(){
      this.api.Get("Orden").then((res)=>{
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

//   public postOrden(){
//     this.api.Post("orden", {
//       idOrden: "1",
//       idUsu: "1",
//       idMetodoPa: "1",
//       total: 60000,
//       idVivien: "1",
//       status:"0"
//      })
// }

  // public putOrden(){
  //   this.api.Put("orden", 1,{
  //     idOrden: "1",
  //     idUsu: "1",
  //     idMetodoPa: "1",
  //     total: 60000,
  //     idVivien: "1",
  //     status:"0"
  //   })
  // }

  public deleteOrden(id){
    this.api.Delete("orden",id)
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

          this.deleteOrden(id) 
      }
    })
  }



}

 
