import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAfterCareComponent } from './admin-after-care.component';

describe('AdminAfterCareComponent', () => {
  let component: AdminAfterCareComponent;
  let fixture: ComponentFixture<AdminAfterCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAfterCareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAfterCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
