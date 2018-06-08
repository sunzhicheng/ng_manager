import {
    Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges, ElementRef, Renderer
} from '@angular/core';
import { HighChartsService } from './hightcharts.service';
import * as  Highcharts from 'highcharts';

/**
 *<sd-c-line
    [title_text]='标题'
    [subtitle_text]='副标题'
    [xAxis_categories]='x轴数据'
    [yAxis_title_text]='y轴标题'
    [series]='数据'
    [exporting]='true'
></sd-c-line>
 * https://www.highcharts.com/docs/getting-started
 */
@Component({
    moduleId: module.id,
    selector: 'sd-c-line',
    templateUrl: 'line.html',
})
export class ChartslineComponent implements OnInit, OnChanges {

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
     * example ['一月', '二月', '三月', '四月', '五月', '六月'
     *   , '七月', '八月', '九月', '十月', '十一月', '十二月']
     */
    @Input()
    set xAxis_categories(value: any) {
        this.getChart().update({
            xAxis: {
                categories: value,
                labels: {
                    formatter: function () {
                        return this.value + '月';
                    }
                }
            }
        });
    }

    @Input()
    set xAxis_formatter(fun: any) {
        this.getChart().update({
            xAxis: {
                labels: {
                    formatter: fun
                }
            }
        });
    }


    @Input()
    set yAxis_title_text(value: any) {
        this.getChart().update({ yAxis: { title: { text: value || '' } } });
    }

    /**
     * example
     *    [{
     *        name: 'Tokyo',
     *        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2,
     *               26.5, 23.3, 18.3, 13.9, 9.6]
     *    }]
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


    addPoint(name: string, x: any, y: any) {
        let series_item: any;
        for (let index = 0; index < this.getChart().series.length; index++) {
            const series_name: string = this.getChart().series[index].name;
            if (name === series_name) {
                series_item = this.getChart().series[index];
                break;
            }
        }
        if (series_item) {
            series_item.addPoint([x, y], true, true);
        } else {
            console.log('addPoint...name not match...');
        }
    }




    getChart() {
        if (!this.chart) {
            console.log('Highcharts : ', Highcharts);
            // console.log('el', this.el);
            // console.log(this.el.nativeElement.firstChild);
            this.chart = Highcharts.chart(this.el.nativeElement.firstChild,
                this.getLine()
            );
            console.log('ngOnInit chart.....');
        }
        return this.chart;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        //
    }


    getLine() {
        const chart = {
            type: 'spline'
        };
        const title = {
            text: 'No data'
        };
        // const subtitle = {
        //     text: 'subtitle'
        // };
        // const xAxis = {
        //     categories: ['一月', '二月', '三月', '四月', '五月', '六月'
        //         , '七月', '八月', '九月', '十月', '十一月', '十二月']
        // };
        const yAxis = {
            // title: {
            //     text: 'Temperature (\xB0C)'
            // },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        };
        const tooltip = {
            valueSuffix: '\xB0C',
            crosshairs: true,
            shared: true
        };
        const legend = {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        };
        const series: any = [
            {
                name: ' ',
                data: []
            }
        ];
        const exporting: any = { enabled: false };

        const json: any = {};
        json.chart = chart;
        json.title = title;
        // json.subtitle = subtitle;
        // json.xAxis = xAxis;
        json.yAxis = yAxis;
        json.tooltip = tooltip;
        json.legend = legend;
        json.series = series;
        json.exporting = exporting;
        return json;
    }

}
