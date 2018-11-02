/**
 * Created by luyu on 17-1-10.
 */
import { Component, ViewEncapsulation, AfterContentInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare let _: any;
declare let $: any;

@Component({
  moduleId: module.id,
  selector: 'index-cmp',
  templateUrl: 'index.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class IndexComponent implements OnInit {

  weekToday: any;
  reportEntry: any;
  proSaleCount: any;
  orderCount: any;
  turnover: any;
  orderCancelCount: any;
  lockerOuter: any;
  lockerInner: any;
  onlyOuter: any;
  onlyInner: any;
  lockerTotal: any;
  lockerInUse: any;
  lockerUnUse: any;
  lockerBlock: any;
  locker12Mon: any;
  pager: any;

  normal_count: any = 0;
  fail_count: any = 0;
  out_contact_count: any = 0;
  error_count: any = 0;

  map: any;

  constructor(
    private _router: Router,
    ) {
  }

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    // $('index-cmp').addClass('vbox');
    const week: number = new Date().getDay();
    console.log('HomeComponent ngOnInit...week', week);
    if (week === 0) {
      this.weekToday = '星期日';
    } else if (week === 1) {
      this.weekToday = '星期一';
    } else if (week === 2) {
      this.weekToday = '星期二';
    } else if (week === 3) {
      this.weekToday = '星期三';
    } else if (week === 4) {
      this.weekToday = '星期四';
    } else if (week === 5) {
      this.weekToday = '星期五';
    } else if (week === 6) {
      this.weekToday = '星期六';
    }

    // let ZkfReportEntry = this.toolGpb.getReportEntry();
    // this.reportEntry = new ZkfReportEntry({ pager: {pm: 2, pageNo: 1, pagePerCount: 6, totalCount: 0, hg: 2 },web_index:{ }});

    console.log('HomeComponent ngOnInit...');
    // this.initMap();
    // setTimeout(this.timeOutCalendar(),30);//日历
    // setTimeout(this.countPoi(),30);//设备预警统计
    // setTimeout(this.timeoutBar(),30);//本周营业额

  }
}
