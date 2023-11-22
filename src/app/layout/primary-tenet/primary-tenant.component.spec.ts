import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryTenantComponent } from './primary-tenant.component';

describe('PrimaryTenantComponent', () => {
  let component: PrimaryTenantComponent;
  let fixture: ComponentFixture<PrimaryTenantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrimaryTenantComponent]
    });
    fixture = TestBed.createComponent(PrimaryTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
