import { IUtils } from './../../shared/idorp/providers/IUtils';
import { HttpService } from './../../shared/idorp/service/HttpService';
import { Component, OnInit, AfterViewInit, Input, OnChanges, Output, EventEmitter, forwardRef } from '@angular/core';
import { IDCONF } from '../../shared/idorp/config/app.config';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';
import { DynamicBase } from '../dynamic.base';
import { GpbService } from '../../shared/idorp/service/gpb.service';

@Component({
  selector: 'checkboxs-dynamic',
  template: `
  <ng-container *ngIf="_boxType === 1">
    <label class="checkbox-inline"  *ngFor="let opt of opt_list">
      <input type="checkbox" value="{{opt.key.l_id}}"  (change)="changed($event)"
            [disabled]="isDisabled"
            [checked]="isChecked(opt.key.l_id)"
            >
      {{ opt.value.open_id }}
    </label>
  </ng-container>

  <ng-container  *ngIf="_boxType === 2">
  <div class="checkbox" *ngFor="let opt of opt_list">
    <label>
      <input type="checkbox" value="{{opt.key.l_id}}" (change)="changed($event)"
             [disabled]="isDisabled"
             [checked]="isChecked(opt.key.l_id)">
      {{ opt.value.open_id }}
    </label>
  </div>
</ng-container>
	  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxsDynamicComponent),
    multi: true
  }]
})

export class CheckboxsDynamicComponent extends DynamicBase {

  @Input()
  opt_list: any = [];


  _boxType = 1;

  @Input()
  public set boxType(values: any) {
    if (values) {
      this._boxType = values;
    }
  }

  inV: any = [];

  isChecked(v: any) {
    if (this.inV.length > 0) {
      let retn = false;
      this.inV.forEach((vv: any) => {
        const vstr = v + '';
        if (vstr === vv) {
          retn = true;
        }
      });
      return retn;
    } else {
      return false;
    }
  }
  changed(ev: any) {
    if (ev.currentTarget.checked) {
      this.inV.push(ev.currentTarget.value);
    } else {
      _.remove(this.inV, (n: any) => {
        return n === ev.currentTarget.value;
      });
    }
    this.changeOut.emit(_.join(this.inV, ','));
    this.propagateChange(_.join(this.inV, ','));
    this.propagateTouched();
  }

  /**
   * 给外部formControl写入数据
   * @param {*} value
   */
  writeV(v: any) {
    const value = v + '';
    if (IUtils.isNotEmpty(value)) {
      this.inV = value.split(',');
    }
  }
}
