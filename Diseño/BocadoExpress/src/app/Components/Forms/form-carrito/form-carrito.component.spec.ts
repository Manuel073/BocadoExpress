import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCarritoComponent } from './form-carrito.component';

describe('FormCarritoComponent', () => {
  let component: FormCarritoComponent;
  let fixture: ComponentFixture<FormCarritoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCarritoComponent]
    });
    fixture = TestBed.createComponent(FormCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
