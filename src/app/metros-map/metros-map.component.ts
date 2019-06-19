import {Component, OnInit} from '@angular/core';
import {LiveMapEntity} from '../live-map/live-map.component';

@Component({
  selector: 'app-metros-map',
  templateUrl: './metros-map.component.html',
  styleUrls: ['./metros-map.component.scss']
})
export class MetrosMapComponent implements OnInit {
  entity: LiveMapEntity = LiveMapEntity.METROS;

  constructor() { }

  ngOnInit() {
  }

}
