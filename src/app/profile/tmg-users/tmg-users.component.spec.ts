import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmgUsersComponent } from './tmg-users.component';

describe('TmgUsersComponent', () => {
  let component: TmgUsersComponent;
  let fixture: ComponentFixture<TmgUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TmgUsersComponent]
    });
    fixture = TestBed.createComponent(TmgUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
