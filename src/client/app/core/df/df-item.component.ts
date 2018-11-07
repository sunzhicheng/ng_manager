import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, AfterViewChecked, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DFControlService } from './df-control.service';
import { IUtils } from '../../shared/idorp/providers/IUtils';
import _ from 'lodash';
import { Router } from '@angular/router';

declare let $: any;

@Component({
  moduleId: module.id,
  selector: 'df-item',
  templateUrl: 'df-item.component.html'
})
export class DFItemComponent implements OnChanges, AfterViewChecked {
  @Input() item: any;
  @Input() f_type: any = 1;
  @Input() form: FormGroup;

  //下拉框选择改变form
  @Output()
  public selectchangeout: EventEmitter<any> = new EventEmitter();
  //按钮点击
  @Output()
  public btnclickout: EventEmitter<any> = new EventEmitter();

  //自定义按钮点击
  @Output()
  public customerSubmitOut: EventEmitter<any> = new EventEmitter();
  //控制按钮频繁点击
  lazyClick = false;
  private defaultValue: any;
  private tempValue: any;
  constructor(private qcs: DFControlService,
    private _router: Router
  ) {
  }
  ngAfterViewChecked(): void {
    if (this.form && this.item) {
      if (!this.item.key) {
        return;
      }
      if (this.form.controls[this.item.key] && this.form.controls[this.item.key].touched) {
        //处理修改的时候 从有值被清除成恐值  设置相应的空标识  NULL  或者  -999999  start
        const inValue = this.form.controls[this.item.key].value;
        if (this.isEmpty(inValue) && !this.isEmpty(this.defaultValue)) {
          if (this.item.type === 'text') {
            this.tempValue = this.qcs.empty_char;
          } else if (this.item.type === 'number') {
            this.tempValue = this.qcs.empty_int;
          } else {
            this.tempValue = this.qcs.empty_char;
          }
        } else {
          if (this.tempValue !== inValue) {
            this.tempValue = inValue;
          }
        }
        //处理修改的时候 从有值被清除成恐值  设置相应的空标识  NULL  或者  -999999  end
      } else {
        //设置默认值  用于比较行为是否重新设置为空  且默认值只是第一次设置
        if (!this.defaultValue && this.form.controls[this.item.key]) {
          this.defaultValue = this.form.controls[this.item.key].value;
        }
      }
    }
  }
  /**
   * 获取item的type
   */
  getType() {
    return this.item && this.item.type ? this.item.type : 'text';
  }

  isEmpty(v: any) {
    return IUtils.isEmpty(v) || v === '0' || v === 0;
  }
  get isValid() {
    if (this.form.controls[this.item.key] && this.form.controls[this.item.key].touched) {
      const valid = this.form.controls[this.item.key].valid;
      const errors = this.form.controls[this.item.key].errors;
      if (!valid && errors) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
  getErrorMsg() {
    let errorMsg = '';
    const errors = this.form.controls[this.item.key].errors;
    if (errors && this.item.rules && this.item.rules.length > 0) {
      this.item.rules.forEach((rule: any) => {
        if (errors[rule.name]) {
          errorMsg = rule.errorMsg;
        }
      });
    }
    return errorMsg;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // if (this.form) {
    //   console.log('form  : ' + JSON.stringify(this.form));
    // }
  }
  getDefaultValue() {
    return this.defaultValue;
  }
  getTempValue() {
    return this.tempValue;
  }
  /**
   * 下拉框触发事件
   * @param target
   */
  public selectchange(target: any) {
    if (this.item.fi_type === 'fi_select') { //下拉框特殊处理
      const tagetIndex = target.currentTarget.selectedIndex;
      const value = this.item.opt_list[tagetIndex].key.l_id;
      this.selectchangeout.emit({ item: this.item, v: value });
    } else {
      this.selectchangeout.emit({ item: this.item, v: target });
    }
  }
  /**
   * 控制表单里面的按钮点击   或者   列表页面  除去搜索按钮的其他操作
   */
  btnclick() {
    this.btnclickout.emit(this.item);
  }
  cancel() {
    if (this.item.router_link) {
      const link = [this.item.router_link];
      this._router.navigate(link);
    } else {
      if (history.state.navigationId > 1) {
        history.back();
      }
    }
  }

  /**
   * 除了确认和取消按钮之外的  提交动作  如表单审核
   */
  customerSubmit() {
    this.customerSubmitOut.emit(this.item);
  }

  isRequire() {
    let isrequird = false;
    if (this.item && this.item.rules && this.item.rules.length > 0) {
      this.item.rules.forEach((rule: any) => {
        if (rule.name === 'required') {
          isrequird = true;
        }
      });
    }
    return isrequird;
  }
  /**
   * 是否有提交权限
   */
  hasSubmit(permissoin: any) {
    if (!permissoin) {
      return true;
    } else {
      const permissions = sessionStorage.permissions;
      const permissoinBaseArr = permissoin.split(',');
      if (permissions) {
        const permissoinArr = permissions.split(',');
        let isHas = false;
        for (let i = 0; i < permissoinArr.length; i++) {
          const p = permissoinArr[i];
          permissoinBaseArr.forEach((pbase: any) => {
            if (p === pbase) {
              isHas = true;
            }
          });
          if (isHas) {
            break;
          }
        }
        return isHas;
      } else {
        return false;
      }
    }
  }

  /**
   * 限制输入值的长度
   * @param e
   * @param item
   */
  limitLength(e: any, item: any) {
    let value = e.currentTarget.value;
    let length = item.length;
    if (length) {
      if (value.length > length) {
        value = value.slice(0, length);
        e.currentTarget.value = value;
      }
    } else {
      if (item.type === 'int') {
        //int 类型  默认 9
        length = 9;
      } else if (item.type === 'long') {
        //int 类型  默认 18
        length = 18;
      }
      if (value.length > length) {
        value = value.slice(0, length);
        e.currentTarget.value = value;
      }
    }
  }
  /**
   * 限制输入的值在某个区间
   * @param e
   * @param item
   */
  limitValue(e: any, item: any) {
    const min_value = item.min_value;
    const max_value = item.max_value;
    if (!min_value && !max_value) {
      return;
    }
    const value = parseInt(e.currentTarget.value, 10);
    if (min_value && max_value && min_value > max_value) {
      console.error('配置的最大最小值错误, min_value: ' + min_value + '  max_value: ' + max_value);
      return;
    }
    if (min_value && value < min_value) {
      e.currentTarget.value = min_value;
    }
    if (max_value && value > max_value) {
      e.currentTarget.value = max_value;
    }
  }
}
