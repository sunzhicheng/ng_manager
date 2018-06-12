import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToolGpbService } from '../../shared/tool/tool-gpb.service';
import { ToolHttpService } from '../../shared/tool/tool-http.service';

declare let $: any;

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-datepicker',
  templateUrl: `datepicker.html`
})

export class DatePickerComponent implements OnInit {

  hasInit = false;

  formatHasInit = false;

  date_strHasInit = false;

  _date_str: any;

  _format: any;

  oringe: any;

  id: any;

  @Input()
  placeholder = '';

  @Output()
  public changeDateOut: EventEmitter<any> = new EventEmitter();

  @Input()
  public set date_str(value: any) {
    this.oringe = value;
    this.date_strHasInit = true;
    this.initPick();
  }

  /**
   * @param value "format"
   *
   * 1 yyyy-MM-dd hh:mm:ss
   * 2 yyyy-MM-dd
   */
  @Input()
  public set format(value: any) {
    this.formatHasInit = true;
    this._format = value;
    this.initPick();
  }


  public constructor(private toolGpb: ToolGpbService,
                     private toolHttp: ToolHttpService,
                     private route: ActivatedRoute,
                     public _router: Router) {
  }


  initPick() {
    if (this.hasInit) {
      return ;
    }
    if (this.formatHasInit && this.date_strHasInit) {
      this.hasInit = true;

      this.id = this.id || 'format' + this.toolHttp.getUnlike_num();
      // var _mat:any = this._format||'yyyy-mm-dd hh:mm:ss';
      const _mat1: any = this._format === 2 ? 'yyyy-MM-dd hh:mm:ss' : 'yyyy-MM-dd';
      const _mat2: any = this._format === 2 ? 'yyyy-mm-dd hh:mm:ss' : 'yyyy-mm-dd';
      const minView: any = this._format === 2 ? 0 : 2;

      if (this.oringe) {
        // this._date_str = this.dateFormat2(this.oringe,_mat1);
      }
      this.changed();

      //中英文
      const locale: string = localStorage.getItem('lang') || 'cn';
      if (locale === 'en') {
        delete $.fn.datetimepicker.dates['zh-CN'];
      }

      setTimeout(() => {
        const $date: any = (<any>$)('#' + this.id);
        // var $date:any = (<any>$)('.form_datetime');
        $date.datetimepicker({
          language: 'zh-CN',
          format: _mat2,
          minView: minView,
          todayBtn: true,
          autoclose: true
        }).on('changeDate', (ev: any) => {
          this._date_str = ev.currentTarget.value;
          this.changed();
        });
        // $date.datetimepicker('update');
      }, 200);
    }

  }


  ngOnInit() {
    //
  }

  changed() {
    this.changeDateOut.emit(this._date_str);
  }

  //ts数字类型转化
  // dateFormat2(longDate:any, formatStr:any) {
  //   formatStr = formatStr || 'yyyy-mm-dd';
  //   var result = this.toolHttp.dateFormat(new Date(Number(longDate)), formatStr);
  //   return result;
  // }
}
