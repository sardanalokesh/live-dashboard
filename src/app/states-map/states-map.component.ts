import {Component, OnInit} from '@angular/core';
import {LiveMapEntity} from '../live-map/live-map.component';

@Component({
  selector: 'app-states-map',
  templateUrl: './states-map.component.html',
  styleUrls: ['./states-map.component.scss']
})
export class StatesMapComponent implements OnInit {
  entity: LiveMapEntity = LiveMapEntity.STATES;

  constructor() { }

  ngOnInit() {
  }

}
