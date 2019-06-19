import { Component, OnInit } from '@angular/core';
import {Server} from '../config/server';
import * as Highcharts from 'highcharts/highstock';
import * as theme from 'highcharts/themes/dark-unica';

@Component({
  selector: 'app-time-series-chart',
  templateUrl: './time-series-chart.component.html',
  styleUrls: ['./time-series-chart.component.scss']
})
export class TimeSeriesChartComponent implements OnInit {

  private dataUrl = `${Server.BASE_URL}/timeSeriesData`;

  constructor() { }

  ngOnInit() {
    theme.default(Highcharts);
    fetch(this.dataUrl).then(res => {
      return res.json();
    }).then(data => {
      Highcharts.stockChart('chart', {
        rangeSelector: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        title: {
          text: ''
        },
        series: [{
          name: 'Views',
          type: 'column',
          data: data.map(d => [d.date, d.views]),
          tooltip: {
            valueDecimals: 2
          }
        }]
      });
    });
  }

}
