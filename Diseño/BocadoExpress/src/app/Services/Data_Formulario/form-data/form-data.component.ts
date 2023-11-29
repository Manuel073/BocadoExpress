import { Component } from '@angular/core';

@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.css'],
})
export class FormDataComponent {
  public FormData: object;
  public TypeAccion: string;

  public SetFormularioData(data: any): void {
    this.FormData = data;
  }

  public GetFormularioData(): object {
    return this.FormData;
  }

  public GetTypeAccion(): string {
    return this.TypeAccion;
  }

  public SetTypeAccion(accion: any) {
    this.TypeAccion = accion;
  }
}
