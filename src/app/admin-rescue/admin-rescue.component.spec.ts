import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRescueComponent } from './admin-rescue.component';

describe('AdminRescueComponent', () => {
  let component: AdminRescueComponent;
  let fixture: ComponentFixture<AdminRescueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRescueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRescueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
