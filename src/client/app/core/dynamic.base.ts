import { BaseComponent } from '../shared/idorp/component/BaseComponent';
import { ControlValueAccessor, DefaultValueAccessor } from '@angular/forms';
import { IUtils } from '../shared/idorp/providers/IUtils';
import { GpbService } from '../shared/idorp/service/gpb.service';
import { HttpService } from '../shared/idorp/service/HttpService';
import { IDCONF } from '../shared/idorp/config/app.config';
import { Input, Output, EventEmitter } from '@angular/core';

export class DynamicBase extends BaseComponent implements ControlValueAccessor  {

  propagateChange: any;
  propagateTouched: any;
  namekey: any = IUtils.uuid();

  protoEntry: any;
  pager: any;

  isDisabled = false;

  /**
   * 传进来的值
   */
  inV: any = [];

  /**请求接口需要的属性*/
  _proto: any;
  _request_url: any;
  @Input()
  public set proto(values: any) {
    this._proto = values;
  }
  @Input()
  public set request_url(values: any) {
    this._request_url = values;
  }
  @Output()
  public changeOut: EventEmitter<any> = new EventEmitter();
  /**
   * 过滤参数
   */
  @Input()
  filterJson: any;

  oldFilterJson: any;

  filterJsonUpdate = false;

  /**
   * 共子类调用
   * @param v
   */
  writeV(v: any) {
    console.log('');
  }
  /**
   * 共子类调用
   * @param v
   */
  setDisabled(v: boolean) {
    console.log('');
  }
  /**
   * 给外部formControl写入数据
   * @param {*} value
   */
  writeValue(v: any) {
    if (!v) {
      v = '';
    }
    if (this.inV.sort().toString() === v.toString()) {
      return;
    }
    this.inV.splice(0, this.inV.length);
    this.writeV(v);
  }
  /**
   * 把外面登记的监测change的函数赋值给this.propagateChange
   * 当内部数据改变时,可使用this.propagateChange(this.imgs)去触发传递出去
   * @param {*} fn
   */
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }
  /**
   * 也是一样注册,当 touched 然后调用
   * @param {*} fn
   */
  registerOnTouched(fn: any) {
    this.propagateTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.setDisabled(isDisabled);
  }
  public constructor() {
    super();
  }

}
