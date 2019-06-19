import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {
  MatButtonModule,
  MatButtonToggleModule, MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatSelectModule,
  MatToolbarModule
} from '@angular/material';
import { MetrosMapComponent } from './metros-map/metros-map.component';
import { StatesMapComponent } from './states-map/states-map.component';
import { LiveMapComponent } from './live-map/live-map.component';
import { FooterComponent } from './footer/footer.component';
import { TimeSeriesChartComponent } from './time-series-chart/time-series-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MetrosMapComponent,
    StatesMapComponent,
    LiveMapComponent,
    FooterComponent,
    TimeSeriesChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatIconModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
