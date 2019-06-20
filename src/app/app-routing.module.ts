import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MetrosMapComponent} from './metros-map/metros-map.component';
import {StatesMapComponent} from './states-map/states-map.component';
import {ZipsMapComponent} from './zips-map/zips-map.component';

const routes: Routes = [{
  path: 'metros',
  component: MetrosMapComponent
}, {
  path: 'states',
  component: StatesMapComponent
}, {
  path: 'zips',
  component: ZipsMapComponent
}, {
  path: '',
  pathMatch: 'full',
  redirectTo: '/states'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
