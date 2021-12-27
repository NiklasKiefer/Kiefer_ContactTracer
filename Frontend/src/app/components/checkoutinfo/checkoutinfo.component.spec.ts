import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutinfoComponent } from './checkoutinfo.component';

describe('CheckoutinfoComponent', () => {
  let component: CheckoutinfoComponent;
  let fixture: ComponentFixture<CheckoutinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
