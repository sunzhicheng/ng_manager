import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit, forwardRef, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../shared/idorp/service/HttpService';
import { IUtils } from '../../shared/idorp/providers/IUtils';
import { ControlValueAccessor } from '@angular/forms';
import { DynamicBase } from '../dynamic.base';

declare let $: any;

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'combodate-dynamic',
  template: `
  <input type="text" class="combodate form-control"
  id="{{namekey}}"  [disabled]="isDisabled"
  [attr.data-format]="_dataforma" [attr.data-template]="_datatemplate"
   >
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CombodateDynamicComponent),
    multi: true
  }]
})

export class CombodateDynamicComponent  extends DynamicBase  implements AfterViewInit  {

  _dataforma: any = 'HH:mm';
  @Input()
  public set dataforma(v: any) {
    if (v) {
      this._dataforma = v;
    }
  }

  _datatemplate: any = 'HH : mm';
  @Input()
  public set datatemplate(v: any) {
    if (v) {
      this._datatemplate = v;
    }
  }

  combodate: any;

  ngAfterViewInit() {
    (<any>$('#' + this.namekey)).combodate({
      firstItem: 'name', //show 'hour' and 'minute' string at first item of dropdown
      minuteStep: 1,
    });
    this.combodate =  (<any>$('#' + this.namekey)).data('combodate');
    $('.combodate select').change(() => {
        const hm = this.combodate.getValue();
        //这里返回零点到当前时间点的毫秒数
        const hmArr = hm.split(':');
        const h = parseInt(hmArr[0], 10);
        const m = parseInt(hmArr[1], 10);
        const v = h * 60 * 60 * 1000 + m * 60 * 1000;
        this.propagateChange(v);
        this.propagateTouched();
    });
  }
  /**
   * 给外部formControl写入数据
   * @param {*} value
   */
  writeV(value: any) {
    if (IUtils.isNotEmpty(value)) {
      // this.stringTime = IUtils.dateFormat(new Date(value), this.format);
      // if (this.combodate) {
      //   this.combodate.setValue('06:30');
      // }
    }
  }
}
