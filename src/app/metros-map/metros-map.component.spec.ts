import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetrosMapComponent } from './metros-map.component';

describe('MetrosMapComponent', () => {
  let component: MetrosMapComponent;
  let fixture: ComponentFixture<MetrosMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetrosMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetrosMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
