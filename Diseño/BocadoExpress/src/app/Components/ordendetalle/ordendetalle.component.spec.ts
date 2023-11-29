import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdendetalleComponent } from './ordendetalle.component';

describe('OrdendetalleComponent', () => {
  let component: OrdendetalleComponent;
  let fixture: ComponentFixture<OrdendetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdendetalleComponent]
    });
    fixture = TestBed.createComponent(OrdendetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
