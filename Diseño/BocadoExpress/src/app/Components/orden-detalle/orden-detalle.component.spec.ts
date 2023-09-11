import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenDetalleComponent } from './orden-detalle.component';

describe('OrdenDetalleComponent', () => {
  let component: OrdenDetalleComponent;
  let fixture: ComponentFixture<OrdenDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdenDetalleComponent]
    });
    fixture = TestBed.createComponent(OrdenDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
