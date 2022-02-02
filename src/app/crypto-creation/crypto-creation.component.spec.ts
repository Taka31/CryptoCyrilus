import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoCreationComponent } from './crypto-creation.component';

describe('CryptoCreationComponent', () => {
  let component: CryptoCreationComponent;
  let fixture: ComponentFixture<CryptoCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
