import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LiveMapEntity} from '../live-map/live-map.component';
import {from, interval, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {switchMap} from 'rxjs/operators';

declare var mapboxgl;
declare var ResizeObserver;

@Component({
  selector: 'app-metros-polygon-map',
  templateUrl: './metros-polygon-map.component.html',
  styleUrls: ['./metros-polygon-map.component.scss']
})
export class MetrosPolygonMapComponent implements OnInit, OnDestroy {

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
    const url = `${environment.restUrl}/metrosData2`;
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
      id: 'polygonLayer',
      type: 'fill',
      source: 'points',
      paint: {
        'fill-color': [
          'step',
          ['to-number', ['get', 'visits'], -1],
          '#fff',
          0, '#F7EA26',
          1000, '#F4D123',
          2000, '#F2B920',
          3000, '#F0A11D',
          4000, '#EE891A',
          5000, '#EC7117',
          6000, '#EA5914',
          7000, '#E84111',
          8000, '#E6290E',
          9000, '#E4110C',
          10000, '#AB0C08'
        ],
        'fill-opacity': 1,
        'fill-outline-color': '#000',
      }
    });

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    this.map.on('mousemove', 'polygonLayer', e => {
      this.map.getCanvas().style.cursor = 'pointer';
      const visits = e.features[0].properties.visits;
      const name = e.features[0].properties.name;
      const html = `
                <div style="text-align: center;">
                    <b>${name}</b><br/>
                    <span>Visits: ${this.numberFormatter.format(visits)}</span>
                </div>
        `;

      popup.setLngLat(e.lngLat)
        .setHTML(html)
        .addTo(this.map);
    });

    this.map.on('mouseleave', 'polygonLayer', () => {
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
