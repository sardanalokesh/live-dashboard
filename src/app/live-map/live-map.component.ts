import {Component, Input, OnInit} from '@angular/core';
import {from, interval} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {Server} from '../config/server';

declare var mapboxgl;
declare var ResizeObserver;

export enum LiveMapEntity {
  METROS,
  STATES
}

@Component({
  selector: 'app-live-map',
  templateUrl: './live-map.component.html',
  styleUrls: ['./live-map.component.scss']
})
export class LiveMapComponent implements OnInit {

  @Input() entity: LiveMapEntity;

  private map: any;
  private delta = 0;
  private framesPerSecond = 10;
  private opacity = 1;
  private radius = 0;
  private numberFormatter = new Intl.NumberFormat('en-US');
  private CONTAINER = 'map';
  private COLORS = [
    '#22CECF',
    '#F3A436',
    '#CE4041'
  ];
  private MAX_RADIUS = 10;

  constructor() {
  }

  ngOnInit() {
    this.map = new mapboxgl.Map({
      container: this.CONTAINER,
      style: 'mapbox://styles/sardanalokesh/cjx333skt03oq1cpbzli1vwug',
      center: [-95.712891, 37.09024],
      zoom: 2.8
    });

    this.map.on('load', this.init.bind(this));
    this.handleResize();

  }

  private init() {
    const url = `${Server.BASE_URL}/${this.entity === LiveMapEntity.METROS ? 'metrosData' : 'statesData'}`;
    const loader = document.getElementById('loader');

    const source = interval(5000);
    source.pipe(
      switchMap(val => {
      return from(fetch(url));
      }),
      switchMap(val => from(val.json()))
    ).subscribe(data => {
        this.map.getSource('points').setData(data);
      });

    this.map.on('sourcedata', event => {
      if (this.map.getSource('points') && this.map.isSourceLoaded('points')) {
        loader.style.display = 'none';
      }
    });

    this.map.addSource('points', {
      type: 'geojson',
      data: url
    });

    this.map.addLayer({
      id: 'pointBgLayer',
      source: 'points',
      type: 'circle',
      paint: {
        'circle-radius': [
          'interpolate',
          ['linear'],
          ['get', 'visits'],
          0, 0,
          100, 2,
          10000, this.MAX_RADIUS
        ],
        'circle-opacity': 0,
        'circle-radius-transition': {duration: 0},
        'circle-opacity-transition': {duration: 0},
        'circle-stroke-width': 1,
        'circle-stroke-color': [
          'step',
          ['get', 'visits'],
          this.COLORS[0],
          4000, this.COLORS[1],
          8000, this.COLORS[2]
        ]
      }
    });

    this.map.addLayer({
      id: 'pointCenterLayer',
      source: 'points',
      type: 'circle',
      paint: {
        'circle-radius': [
          'interpolate',
          ['linear'],
          ['get', 'visits'],
          0, 0,
          100, 2,
          10000, this.MAX_RADIUS
        ],
        'circle-opacity': 0.7,
        'circle-color': [
          'step',
          ['get', 'visits'],
          this.COLORS[0],
          4000, this.COLORS[1],
          8000, this.COLORS[2]
        ]
      }
    });

    this.map.addLayer({
      id: 'points-label',
      type: 'symbol',
      source: 'points',
      transition: {duration: 0},
      layout: {
        'text-field': [
          'number-format',
          ['get', 'visits'],
          {
            locale: 'en-US',
            'max-fraction-digits': 2
          }
        ],
        'text-size': 10
      },
      paint: {
        'text-halo-color': '#ffffff',
        'text-halo-width': 1
      }
    });

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    this.map.on('mouseenter', 'pointCenterLayer', e => {
      this.map.getCanvas().style.cursor = 'pointer';

      const coordinates = e.features[0].geometry.coordinates.slice();
      const visits = e.features[0].properties.visits;
      const name = e.features[0].properties.name;
      const html = `
                <div style="text-align: center;">
                    <b>${name}</b><br/>
                    <span>Visits: ${this.numberFormatter.format(visits)}</span>
                </div>
        `;

      popup.setLngLat(coordinates)
        .setHTML(html)
        .addTo(this.map);
    });

    this.map.on('mouseleave', 'pointCenterLayer', () => {
      this.map.getCanvas().style.cursor = '';
      popup.remove();
    });

    this.animateMarkers(0);
  }

  private animateMarkers(timestamp) {
    setTimeout(() => {
      requestAnimationFrame(this.animateMarkers.bind(this));

      this.delta += 1;
      this.opacity -= ( .9 / this.framesPerSecond );

      if (this.opacity > 0) {
        this.map.setPaintProperty('pointBgLayer', 'circle-radius', [
          'interpolate',
          ['linear'],
          ['get', 'visits'],
          0, 0,
          100, ['+', 2, this.delta],
          10000, ['+', this.MAX_RADIUS, this.delta]
        ]);
        this.map.setPaintProperty('pointBgLayer', 'circle-stroke-opacity', this.opacity);
      } else {
        this.delta = 0;
        this.radius = 0;
        this.opacity = 1;
      }

    }, 1500 / this.framesPerSecond);

  }

  private handleResize() {
    if (!ResizeObserver) { return; }
    const ro = new ResizeObserver( entries => {
      if (this.map) { this.map.resize(); }
    });
    ro.observe(document.querySelector('#' + this.CONTAINER));
  }

}
