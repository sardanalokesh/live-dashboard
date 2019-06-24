import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetrosPolygonMapComponent } from './metros-polygon-map.component';

describe('MetrosPolygonMapComponent', () => {
  let component: MetrosPolygonMapComponent;
  let fixture: ComponentFixture<MetrosPolygonMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetrosPolygonMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetrosPolygonMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
