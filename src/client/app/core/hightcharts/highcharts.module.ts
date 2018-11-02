import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartslineComponent } from './line';
import { ColumComponent } from './colum';
import { ChartspieComponent } from './pie';
import { HighChartsService } from './hightcharts.service';


@NgModule({
    imports: [CommonModule],
    declarations: [ChartslineComponent, ColumComponent, ChartspieComponent],
    exports: [ChartslineComponent, ColumComponent, ChartspieComponent],
    providers: [HighChartsService]
})
export class HighChartsModule {
}