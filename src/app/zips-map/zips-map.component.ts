import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {from, interval, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {LiveMapEntity} from '../live-map/live-map.component';

declare var mapboxgl;
declare var ResizeObserver;

@Component({
  selector: 'app-zips-map',
  templateUrl: './zips-map.component.html',
  styleUrls: ['./zips-map.component.scss']
})
export class ZipsMapComponent implements OnInit, OnDestroy {

  private map: any;
  private numberFormatter = new Intl.NumberFormat('en-US');
  private CONTAINER = 'map';
  private subscription = new Observable().subscribe();

  constructor() {
  }

  ngOnInit() {
    this.map = new mapboxgl.Map({
      container: this.CONTAINER,
      style: 'mapbox://styles/sardanalokesh/cjx333skt03oq1cpbzli1vwug',
      center: [-95.712891, 37.09024],
      zoom: 3.4
    });

    this.map.on('load', this.init.bind(this));
    this.handleResize();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private init() {
    const url = `${environment.restUrl}/zipsData?first=true`;
    const loader = document.getElementById('loader');

    const source = interval(5000);
    this.subscription.add(source.pipe(
      switchMap(val => {
        return from(fetch(url));
      }),
      switchMap(val => from(val.json()))
    ).subscribe(data => {
      this.map.getSource('points').setData(data);
    }));

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
      id: 'heatmap-layer',
      type: 'heatmap',
      source: 'points',
      maxzoom: 9,
      paint: {
// Increase the heatmap weight based on frequency and property magnitude
        'heatmap-weight': [
          'interpolate',
          ['linear'],
          ['get', 'visits'],
          0, 0,
          2000, 0.2,
          4000, 0.4,
          6000, 0.6,
          8000, 0.8,
          10000, 1
        ],
// Increase the heatmap color weight weight by zoom level
// heatmap-intensity is a multiplier on top of heatmap-weight
        'heatmap-intensity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0, 1,
          9, 3
        ],
// Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
// Begin color ramp at 0-stop with a 0-transparancy color
// to create a blur-like effect.
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0, 'rgba(33,102,172,0)',
          0.2, 'rgb(103,169,207)',
          0.4, 'rgb(209,229,240)',
          0.6, 'rgb(253,219,199)',
          0.8, 'rgb(239,138,98)',
          1, 'rgb(178,24,43)'
        ],
// Adjust the heatmap radius by zoom level
        'heatmap-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0, 1,
          9, 7
        ],
// Transition from heatmap to circle layer by zoom level
        'heatmap-opacity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          7, 1,
          9, 0
        ],
      }
    }, 'waterway-label');

    this.map.addLayer({
      id: 'points-layer',
      type: 'circle',
      source: 'points',
      minzoom: 7,
      paint: {
        'circle-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          7, [
            'interpolate',
            ['linear'],
            ['get', 'visits'],
            1, 1,
            10000, 4
          ],
          16, [
            'interpolate',
            ['linear'],
            ['get', 'visits'],
            1, 5,
            10000, 50
          ]
        ],
// Color circle by earthquake magnitude
        'circle-color': [
          'interpolate',
          ['linear'],
          ['get', 'visits'],
          1, 'rgba(33,102,172,0)',
          2000, 'rgb(103,169,207)',
          4000, 'rgb(209,229,240)',
          6000, 'rgb(253,219,199)',
          8000, 'rgb(239,138,98)',
          10000, 'rgb(178,24,43)'
        ],
        'circle-stroke-color': 'white',
        'circle-stroke-width': 1,
// Transition from heatmap to circle layer by zoom level
        'circle-opacity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          7, 0,
          8, 1
        ]
      }
    }, 'waterway-label');

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    this.map.on('mouseenter', 'points-layer', e => {
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

    this.map.on('mouseleave', 'points-layer', () => {
      this.map.getCanvas().style.cursor = '';
      popup.remove();
    });
  }

  private handleResize() {
    if (!ResizeObserver) {
      return;
    }
    const ro = new ResizeObserver(entries => {
      if (this.map) {
        this.map.resize();
      }
    });
    ro.observe(document.querySelector('#' + this.CONTAINER));
  }

}
