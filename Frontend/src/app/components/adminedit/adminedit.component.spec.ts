import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmineditComponent } from './adminedit.component';

describe('AdmineditComponent', () => {
  let component: AdmineditComponent;
  let fixture: ComponentFixture<AdmineditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmineditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmineditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
