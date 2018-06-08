import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HighchartsComponent } from './highcharts';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'highcharts', component: HighchartsComponent }
    ])
  ],
  exports: [RouterModule]
})
export class HighchartsRoutingModule { }
