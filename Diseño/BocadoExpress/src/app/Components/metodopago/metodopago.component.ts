import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
import { FormMetodoPagoComponent } from '../Forms/form-metodo-pago/form-metodo-pago.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-metodopago',
  templateUrl: './metodopago.component.html',
  styleUrls: ['./metodopago.component.css']
})
export class MetodopagoComponent  implements OnInit,AfterViewInit{
   
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
      this.matDialog.open(FormMetodoPagoComponent,{
          width:'370px', 
      })
  }
    
    ngOnInit(): void {
        this.getMetodopago();
        //this.postMetodopago();
        //this.putMetodopago();
        //this.deleteMetodopago();
      
    }
  
    
    public getMetodopago(){
        this.api.Get("MetodoPago/MetodoPago").then((res)=>{
          this.displayedColumns=Object.keys(res[0]);
          this.dataSource.data=res;
          this.displayedColumns.push('Acciones');
         setTimeout(() => {
          this.cargando=false;
         }, 600);
        })
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
  
    // public postMetodopago(){
    //   this.api.Post("metodo-pago", {
          
        
    //     nombremetod: "Daviplata",
    //     status: 0,
    //   })
    // }
  
    // public putMetodopago(){
    //   this.api.Put("metodo-pago", 1,{
      
    //     nombremetod: "Daviplata",
    //     status: 0,
    //   }, )
    // }
  
    public deleteMetodoPago(id){
      this.api.Delete("Metodopago",id)
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
  
            this.deleteMetodoPago(id) 
        }
      })
    
      
  }}

