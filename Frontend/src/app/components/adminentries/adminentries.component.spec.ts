import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminentriesComponent } from './adminentries.component';

describe('AdminentriesComponent', () => {
  let component: AdminentriesComponent;
  let fixture: ComponentFixture<AdminentriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminentriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminentriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
