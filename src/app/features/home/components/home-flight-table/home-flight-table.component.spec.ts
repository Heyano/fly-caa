import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFlightTableComponent } from './home-flight-table.component';

describe('HomeFlightTableComponent', () => {
  let component: HomeFlightTableComponent;
  let fixture: ComponentFixture<HomeFlightTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeFlightTableComponent]
    });
    fixture = TestBed.createComponent(HomeFlightTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
