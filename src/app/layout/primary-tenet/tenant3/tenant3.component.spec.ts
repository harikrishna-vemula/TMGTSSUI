import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tenant3Component } from './tenant3.component';

describe('Tenant3Component', () => {
  let component: Tenant3Component;
  let fixture: ComponentFixture<Tenant3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Tenant3Component]
    });
    fixture = TestBed.createComponent(Tenant3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
