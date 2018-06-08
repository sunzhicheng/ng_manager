import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ChartspieComponent } from './hightcharts/pie';
import { ChartslineComponent } from './hightcharts/line';
import { ColumComponent } from './hightcharts/colum';
import { HighChartsService } from './hightcharts/hightcharts.service';

@NgModule({
  imports: [RouterModule],
  declarations: [NavbarComponent, ToolbarComponent,
    ChartspieComponent,
    ChartslineComponent,
    ColumComponent],
  exports: [RouterModule,
    NavbarComponent, ToolbarComponent,
    ChartspieComponent,
    ChartslineComponent,
    ColumComponent],
  providers: [HighChartsService]
})
export class CoreModule {

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
