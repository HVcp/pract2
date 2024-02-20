import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditflightsComponent } from './addeditflights.component';

describe('AddeditflightsComponent', () => {
  let component: AddeditflightsComponent;
  let fixture: ComponentFixture<AddeditflightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddeditflightsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddeditflightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
