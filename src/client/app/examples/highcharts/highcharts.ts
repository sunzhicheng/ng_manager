import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartslineComponent } from '../../core/hightcharts/line';

/**
 * This class represents the lazy loaded HomeComponent.
 * https://www.highcharts.com/docs/getting-started
 */
@Component({
    moduleId: module.id,
    selector: 'sd-highcharts',
    templateUrl: 'highcharts.html',
})
export class HighchartsComponent implements OnInit {

    @ViewChild(ChartslineComponent)
    public linechart: ChartslineComponent;

    title_text: any;
    subtitle_text: any;
    xAxis_categories: any;
    xAxis_formatter: any;
    yAxis_title_text: any;
    series: any;

    pie_series: any;

    /**
     * Creates an instance of the HomeComponent with the injected
     */
    // constructor() { }

    /**
     * Get the names OnInit
     */
    ngOnInit() {
        const me = this;
        setTimeout(function () {
            me.title_text = 'title_text';
            me.subtitle_text = 'subtitle_text';
            me.xAxis_categories = ['1', '2', '3', '4', '5', '6',
                '7', '8', '9', '10', '11', '12'];
            me.xAxis_formatter = function name(value: any) {
                return this.value + '月';
            };
            me.yAxis_title_text = 'yAxis_title_text';
            me.series = [
                {
                    name: 'Tokyo',
                    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2,
                        26.5, 23.3, 18.3, 13.9, 9.6],
                },
                {
                    name: 'New York1',
                    data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8,
                        24.1, 20.1, 14.1, 8.6, 2.5]
                },
                {
                    name: 'London',
                    data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
                }, {
                    name: 'Berlin',
                    data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
                }
            ];
        }, 1);

        setTimeout(function () {
            me.series = [
                {
                    name: 'Tokyo',
                    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2,
                        26.5, 23.3, 11.3, 20.9, 19.6],
                },
                // {
                //     name: 'New York',
                //     data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8,
                //         24.1, 20.1, 5.1, 18.6, 22.5]
                // }
            ];
        }, 2000);


        setTimeout(function () {
            let x_init: any = 12;
            setInterval(function () {
                x_init++;
                const x = x_init;
                const y = Math.ceil(Math.random() * 1000);
                me.linechart.addPoint('Tokyo', x, y);
            }, 1000);
        }, 5000);


        setTimeout(function () {
            me.title_text = 'title_text';
            me.subtitle_text = 'subtitle_text';
            me.pie_series =
                [
                    {
                        name: 'web',
                        data:
                        [
                            ['Firefox', 100],
                            ['IE', 60],
                            ['Safari', 20],
                            ['Opera', 15],
                            ['Others', 5]
                        ]
                    }
                ];
        }, 1);
    }


}
