import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges, ElementRef, Renderer } from '@angular/core';
import { HighChartsService } from './hightcharts.service';
import * as  Highcharts from 'highcharts';

/**
<sd-c-colum
    [title_text]='标题'
    [subtitle_text]='副标题'
    [xAxis_categories]='x轴数据'
    [yAxis_title_text]='y轴标题'
    [series]='数据'
    [exporting]='true'
>
</sd-c-colum>
 * https://www.highcharts.com/docs/getting-started
 */
@Component({
    moduleId: module.id,
    selector: 'sd-c-colum',
    templateUrl: 'colum.html',
})
export class ColumComponent implements OnInit, OnChanges {

    @Input()
    set title_text(value: any) {
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
        this.getChart().update({ xAxis: { categories: value } });
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

    chart: any;

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
            //生成时间戳id
            this.chart = Highcharts.chart(this.el.nativeElement.firstChild,
                this.getColumn()
            );
            console.log('ngOnInit chart.....');
        }
        return this.chart;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        //
    }



    //柱状图
    getColumn() {
        const chart = {
            type: 'column'
        };
        // const title = {
        //     text: '每月平均降雨量'
        // };
        // const subtitle = {
        //     text: 'Source: runoob.com'
        // };
        const xAxis = {
            // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            crosshair: true
        };
        const yAxis = {
            min: 0,
            // title: {
            //     text: '降雨量 (mm)'
            // }
        };
        const tooltip = {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        };
        const plotOptions = {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        };
        const credits = {
            enabled: false
        };

        const series: any = [{
            name: ' ',
            data: []
        }];
        const exporting: any = { enabled: false };

        const json: any = {};
        json.chart = chart;
        // json.title = title;
        // json.subtitle = subtitle;
        json.tooltip = tooltip;
        json.xAxis = xAxis;
        json.yAxis = yAxis;
        json.series = series;
        json.plotOptions = plotOptions;
        json.credits = credits;
        json.exporting = exporting;
        return json;
    }

}
