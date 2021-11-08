import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCryptoComponent } from './detail-crypto.component';

describe('DetailCryptoComponent', () => {
  let component: DetailCryptoComponent;
  let fixture: ComponentFixture<DetailCryptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCryptoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
