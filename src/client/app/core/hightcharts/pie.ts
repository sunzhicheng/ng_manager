import {
    Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges, ElementRef, Renderer
} from '@angular/core';
import { HighChartsService } from './hightcharts.service';
import * as  Highcharts from 'highcharts';


/**
 *
 * <sd-c-pie
    [title_text]='标题'
    [subtitle_text]='副标题'
    [series]='数据'
    [exporting]='true'
></sd-c-pie>
 * https://www.highcharts.com/docs/getting-started
 */
@Component({
    moduleId: module.id,
    selector: 'sd-c-pie',
    templateUrl: 'pie.html',
})
export class ChartspieComponent implements OnInit, OnChanges {

    chart: any;

    @Input()
    set title_text(value: any) {
        console.log('set title_text...');
        this.getChart().setTitle({ text: value || '' });
    }

    @Input()
    set subtitle_text(value: any) {
        this.getChart().setTitle(null, { text: value || '' });
    }


    /**
     * example
     *    [{
                name: 'web',
                data:
                [
                    ['Firefox', 100],
                    ['IE', 60],
                    ['Safari', 20],
                    ['Opera', 15],
                    ['Others', 5]
                ]
            }]
     *
     */
    @Input()
    set series(value: any) {
        //动态添加或减少series
        if (value) {
            const cur_series_row = this.getChart().series.length;
            const options_row = value.length;
            for (let index = 0; index < cur_series_row; index++) {
                this.getChart().series[0].remove();
            }
            for (let index = 0; index < options_row; index++) {
                this.getChart().addSeries(value[index]);
            }
        }
    }

    //是否显示导出按钮
    @Input()
    set exporting(value: boolean) {
        this.getChart().update({ exporting: { enabled: value ? true : false } });
    }

    // @Input()
    // set options(options: any) {
    //     if (options) {
    //         this._option = options;
    //         //动态添加或减少series
    //         if (this._option.series) {
    //             const cur_series_row = this.chart.series.length;
    //             const options_row = this._option.series.length;
    //             if (cur_series_row !== options_row) {
    //                 for (let index = 0; index < cur_series_row; index++) {
    //                     this.chart.series[index].remove();
    //                 }
    //                 for (let index = 0; index < options_row; index++) {
    //                     this.chart.addSeries(this._option.series[index]);
    //                 }
    //             }
    //         }
    //         this.updateChart();
    //     }
    // }

    constructor(private el: ElementRef, private highchartservice: HighChartsService) {
        // renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'red');
    }



    /**
     * Get the names OnInit
     */
    ngOnInit() {
        const me = this;
        me.chart = me.getChart();
    }





    getChart() {
        if (!this.chart) {
            // console.log('el', this.el);
            // console.log(this.el.nativeElement.firstChild);
            this.chart = Highcharts.chart(this.el.nativeElement.firstChild,
                this.getPie()
            );
            console.log('ngOnInit chart.....');
        }
        return this.chart;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        //
    }


    //饼图
    getPie() {
        const chart: any = {
            type: 'pie',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        };
        // const title = {
        //     text: '2014 年各浏览器市场占有比例'
        // };
        const tooltip = {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>({point.y})'
        };
        const plotOptions = {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
                    style: {
                        color: Highcharts.Color || 'black'
                    }
                },
                showInLegend: true
            }
        };
        const series: any = [{
            name: ' ',
            data: [
                // ['Firefox', 45.0],
                // ['IE', 26.8],
                // {
                //     name: 'Chrome',
                //     y: 12.8,
                //     sliced: true,
                //     selected: true
                // },
                // ['Safari', 8.5],
                // ['Opera', 6.2],
                // ['Others', 0.7]
            ]
        }];
        const exporting: any = { enabled: false };

        const json: any = {};
        json.chart = chart;
        // json.title = title;
        json.tooltip = tooltip;
        json.series = series;
        json.plotOptions = plotOptions;
        json.exporting = exporting;
        return json;
    }

}
