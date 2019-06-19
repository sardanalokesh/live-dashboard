import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesMapComponent } from './states-map.component';

describe('StatesMapComponent', () => {
  let component: StatesMapComponent;
  let fixture: ComponentFixture<StatesMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatesMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
