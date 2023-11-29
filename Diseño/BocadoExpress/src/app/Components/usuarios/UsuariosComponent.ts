import { Component, OnInit,ViewChild,AfterViewInit } from "@angular/core";
import { RestService } from "src/app/Services/rest.service";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
import { FormUsuariosComponent } from "../Forms/form-usuarios/form-usuarios.component";
import Swal from 'sweetalert2';
import { BehaviorSubject } from "rxjs";
import { FormDataComponent } from "src/app/Services/Data_Formulario/form-data/form-data.component";

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {
  displayedColumns: string[]= [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  cargando:boolean;
  public DataDialog=new BehaviorSubject<any>({});
  dataSource: MatTableDataSource<any>;
    constructor(public api: RestService, private matDialog:MatDialog,private ServiceFormularioData:FormDataComponent) {
      this.cargando=true;
      this.dataSource=new MatTableDataSource();
    }
    ngAfterViewInit(): void {
      this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
      this.dataSource.paginator=this.paginator
      this.dataSource.sort=this.sort;
    }
    openDialog(acccion:string,body?:any){
      this.ServiceFormularioData.SetFormularioData(body);
      this.ServiceFormularioData.SetTypeAccion(acccion!='Modificar' ? acccion : 'Modificar');
      this.matDialog.open(FormUsuariosComponent);
  }

    ngOnInit(): void {
        this.getUser();
        
    }
    public getUser(){
        this.api.Get("Usuarios").then((res)=>{
          this.displayedColumns=Object.keys(res.data[0]);
          this.dataSource.data=res.data;
          this.dataSource.paginator=this.paginator
          this.dataSource.sort=this.sort;
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
      }
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  
  
  public DeleteUsuario(id){
     
    this.api.Delete("Usuarios",id).then((res:any)=>{
        console.log(res);
        this.getUser();
    })
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

        this.DeleteUsuario(id) 
    }
  })
}

  
  }
   
  
  
  

    

