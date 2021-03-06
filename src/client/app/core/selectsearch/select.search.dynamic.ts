import { Component, AfterViewInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';
import { DynamicBase } from '../dynamic.base';
import { IdTool } from '../../shared/tool/IdTool';
declare const $: any;

@Component({
  selector: 'select-search-dynamic',
  template: `
    <select id="{{namekey}}" [disabled]="isDisabled"
    >
    <option *ngFor="let opt of opt_list" [value]="opt.key.l_id"
     [selected]="isSelected(opt.key.l_id)">{{ opt.value.open_id }}</option>
    </select>
	  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectSearchDynamicComponent),
    multi: true
  }]
})

export class SelectSearchDynamicComponent extends DynamicBase implements AfterViewInit {
  @Input()
  opt_list: any = [];
  @Input()
  select_width: any = 200;

  selectpicker: any;

  ngAfterViewInit(): void {
    this.selectpicker = $('#' + this.namekey).select2({
      // formatNoMatches: '关键字{0},没有匹配到结果',
      // noneSelectedText: '没有选择项',
      width: this.select_width,
    });
    if (IdTool.isNotEmptyArray(this.inV)) {
      this.selectpicker.select2('val', this.inV[0]);
    }
    setTimeout(() => {
      this.propagateChange(this.selectpicker.val());
      this.propagateTouched();
      this.selectpicker.on('change', (e: any) => {
        this.propagateChange(this.selectpicker.val());
        this.propagateTouched();
        this.changeOut.emit(this.selectpicker.val());
      });
    }, 1000);
  }
  isSelected(value: any) {
    let retn = false;
    if (IdTool.isNotEmptyArray(this.inV)) {
      this.inV.forEach((v: any) => {
        if (v.toString() === value.toString()) {
          retn = true;
        }
      });
    }
    return retn;
  }
  /**
   * 给外部formControl写入数据
   * @param {*} value
   */
  writeV(v: any) {
    const value = v + '';
    this.inV.push(value);
  }
}
