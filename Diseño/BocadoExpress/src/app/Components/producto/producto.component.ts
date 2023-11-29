import { Component, OnInit,ViewChild,AfterViewInit } from "@angular/core";
import { RestService } from "src/app/Services/rest.service";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormProductoComponent } from "../Forms/form-producto/form-producto.component";
import { MatDialog } from "@angular/material/dialog";
import Swal from 'sweetalert2';




@Component({
    selector: 'app-producto',
    templateUrl: './producto.component.html',
    styleUrls: ['./producto.component.css']
})

export class ProductoComponent implements OnInit {
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
        this.matDialog.open(FormProductoComponent,{
            width:'370px', 
        })
    }

    ngOnInit(): void {
        this.getProducto();
        // this.postProducto();
        // this.putProducto();
        //this.deleteProducto();
    }
    public getProducto(){
        this.api.Get("Productoes").then((res)=>{
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

     

    // public postProducto(){
    //     this.api.Post("Productoes", {
    //         idControl: "1",
    //         nombre: "verdura",
    //         fecha: "2022/2/24",
    //         precio: "14000",
            
    //     })
    // }

    // public putProducto(){
    //     this.api.Put("Productoes",1, {
    //         idControl: "1",
    //         nombre: "verdura",
    //         fecha: "2022/2/24",
    //         precio: "14000",
           
            
    //     })
    // }

    public deleteProducto(id){
        this.api.Delete("Productoes",id)
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
    
              this.deleteProducto(id) 
          }
        })
      }
    
    
}