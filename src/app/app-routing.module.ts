import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MetrosMapComponent} from './metros-map/metros-map.component';
import {StatesMapComponent} from './states-map/states-map.component';

const routes: Routes = [{
  path: 'metros',
  component: MetrosMapComponent
}, {
  path: 'states',
  component: StatesMapComponent
}, {
  path: '',
  pathMatch: 'full',
  redirectTo: '/metros'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
