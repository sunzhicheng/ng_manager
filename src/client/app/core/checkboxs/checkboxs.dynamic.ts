import { IdTool } from '../../shared/tool/IdTool';
import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';
import { DynamicBase } from '../dynamic.base';

@Component({
  moduleId: module.id,
  selector: 'checkboxs-dynamic',
  templateUrl: 'checkboxs.dynamic.html',
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
    if (IdTool.isNotEmpty(value)) {
      this.inV = value.split(',');
    }
  }
}
