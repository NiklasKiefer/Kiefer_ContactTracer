import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckininfoComponent } from './checkininfo.component';

describe('CheckininfoComponent', () => {
  let component: CheckininfoComponent;
  let fixture: ComponentFixture<CheckininfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckininfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckininfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
