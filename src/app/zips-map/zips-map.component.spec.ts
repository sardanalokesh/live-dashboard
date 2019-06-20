import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipsMapComponent } from './zips-map.component';

describe('ZipsMapComponent', () => {
  let component: ZipsMapComponent;
  let fixture: ComponentFixture<ZipsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZipsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
