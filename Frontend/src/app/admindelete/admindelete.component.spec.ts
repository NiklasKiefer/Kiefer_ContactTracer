import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindeleteComponent } from './admindelete.component';

describe('AdmindeleteComponent', () => {
  let component: AdmindeleteComponent;
  let fixture: ComponentFixture<AdmindeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmindeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmindeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
