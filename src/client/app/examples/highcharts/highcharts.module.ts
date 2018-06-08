import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { HighchartsRoutingModule } from './highcharts-routing.module';
import { HighchartsComponent } from './highcharts';
import { CoreModule } from '../../core/core.module';


@NgModule({
  imports: [SharedModule, CoreModule,
    CommonModule,
    FormsModule,
    HighchartsRoutingModule],
  declarations: [HighchartsComponent],
  exports: [HighchartsComponent],
  providers: []
})
export class HighchartsModule { }
