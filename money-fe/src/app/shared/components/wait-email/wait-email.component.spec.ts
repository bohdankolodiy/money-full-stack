import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitEmailComponent } from './wait-email.component';

describe('WaitEmailComponent', () => {
  let component: WaitEmailComponent;
  let fixture: ComponentFixture<WaitEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaitEmailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaitEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
