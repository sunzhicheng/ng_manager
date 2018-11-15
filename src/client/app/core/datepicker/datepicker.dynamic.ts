import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, Input, AfterViewInit, forwardRef } from '@angular/core';
import { IdTool } from '../../shared/tool/IdTool';
import { DynamicBase } from '../dynamic.base';

declare let $: any;

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'datepicker-dynamic',
  template: `
  <input  type="text" class="form-control form_datetime" [value]="stringTime"  [disabled]="isDisabled"
  id="{{namekey}}"   >
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerDynamicComponent),
    multi: true
  }]
})

export class DatePickerDynamicComponent extends DynamicBase  implements AfterViewInit  {

  _format: any = 'yyyy-mm-dd hh:ii:ss';
  @Input()
  public set format(values: any) {
    if (values) {
      this._format = values;
    }
  }

  // 0	从小时视图开始，选分
  // 1	从天视图开始，选小时
  // 2	从月视图开始，选天
  // 3	从年视图开始，选月
  // 4	从十年视图开始，选年
  @Input()
  minView: any = 0;
  @Input()
  minuteStep: any = 5;


  stringTime: any = '';

  ngAfterViewInit() {
    setTimeout(() => {
      (<any>$)('#'   + this.namekey).datetimepicker({
        language: 'zh-CN',
        format: this._format,
        minView: this.minView,
        minuteStep: this.minuteStep,
        autoclose: true,
      }).on('changeDate', (ev: any) => {
        const time = new Date(ev.currentTarget.value);
        this.propagateChange(time.getTime());
        this.propagateTouched();
      });
    }, 1000);
  }
  /**
   * 给外部formControl写入数据
   * @param {*} value
   */
  writeV(value: any) {
    if (IdTool.isNotEmpty(value)) {
      this.inV.push(value);
      this.stringTime = IdTool.dateFormat(new Date(value), 'yyyy-MM-dd HH:mm:ss');
    } else {
      this.stringTime = '';
    }
  }
}
