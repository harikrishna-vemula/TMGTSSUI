import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tenant4Component } from './tenant4.component';

describe('Tenant4Component', () => {
  let component: Tenant4Component;
  let fixture: ComponentFixture<Tenant4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Tenant4Component]
    });
    fixture = TestBed.createComponent(Tenant4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
