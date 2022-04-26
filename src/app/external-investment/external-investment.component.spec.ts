import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalInvestmentComponent } from './external-investment.component';

describe('ExternalInvestmentComponent', () => {
  let component: ExternalInvestmentComponent;
  let fixture: ComponentFixture<ExternalInvestmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalInvestmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
