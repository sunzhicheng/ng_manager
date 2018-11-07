import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DemoService } from './demo.service';
import { IdSysAppAcountService } from '../../idsys/idsysappacount/idsysappacount.service';
import { BaseComponent } from '../../shared/idorp/component/BaseComponent';



declare let $: any;

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'demo-hightcharts',
  template: `
  <div id="hightchartsDIV">
  <sd-c-line
  [title_text]="'线状图'"
  [subtitle_text]="'演示'"
  [xAxis_categories]="xAxis_categories"
  [yAxis_title_text]="'数据'"
  [series]="series"
  [exporting]="true"
  ></sd-c-line>

  <sd-c-pie
  [title_text]="'饼状图'"
  [subtitle_text]="'演示'"
  [series]="series"
  [exporting]='true'
></sd-c-pie>

<sd-c-colum
[title_text]="'柱状图'"
[subtitle_text]="'演示'"
[xAxis_categories]="xAxis_categories"
[yAxis_title_text]="'数据'"
[series]="series"
[exporting]='true'
>
</sd-c-colum>
</div>
  `,
  viewProviders: []
})

export class DemoHightchartsComponent extends BaseComponent implements OnInit {
  xAxis_categories: any;
  series: any;
  public constructor(
    private route: ActivatedRoute,
    public demoService: DemoService,
    public accountService: IdSysAppAcountService,
    public _router: Router) {
      super();
  }
  ngOnInit(): void {
    $('demo-hightcharts').addClass('vbox');
    $('#hightchartsDIV').addClass('vbox');
    this.log('DemoReportLineComponent ... init()');
    this.xAxis_categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.series = [{
      name: '数据1',
      data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2,
                26.5, 23.3, 18.3, 13.9, 9.6]
    }];
  }
}
