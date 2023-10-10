import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOrdenDetalleComponent } from './form-orden-detalle.component';

describe('FormOrdenDetalleComponent', () => {
  let component: FormOrdenDetalleComponent;
  let fixture: ComponentFixture<FormOrdenDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormOrdenDetalleComponent]
    });
    fixture = TestBed.createComponent(FormOrdenDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
