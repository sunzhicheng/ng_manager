import { Component, EventEmitter, Input, OnInit, Output, ViewChildren, QueryList } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DFControlService } from './df-control.service';
import * as _ from 'lodash';
import { IdTool } from '../../shared/tool/IdTool';
import { DFItemComponent } from './df-item.component';
import { ToolForm } from '../../shared/tool/ToolForm';
declare let $: any;


@Component({
  moduleId: module.id,
  selector: 'df-form',
  templateUrl: 'df.component.html',
  providers: []
})
export class DfFromComponent implements OnInit {
  @Input() formData: any;
  @Output()
  public formSubmit: EventEmitter<any> = new EventEmitter();
  @Output()
  public selectchangeout: EventEmitter<any> = new EventEmitter();
  @Output()
  public btnclickout: EventEmitter<any> = new EventEmitter();
  @Output()
  public customerSubmitOut: EventEmitter<any> = new EventEmitter();
  //检查formData的fi_type 是否正确
  CHECK_FITYPE = false;
  private form: FormGroup;
  @ViewChildren(DFItemComponent)
  private itemList: QueryList<DFItemComponent>;

  private defaultValue: any;

  constructor(private qcs: DFControlService) {
    // console.log('DfComponent constructor ...');
  }
  ngOnInit() {
    // console.log('DfComponent ngOnInit ...');
    if (this.formData) {
      this.form = this.qcs.toIFormGroup(this.formData);
      this.refreshValue();
      this.defaultValue = this.form.getRawValue();
    }
  }
  onSubmit() {
    const formJson = this.getSubmitData();
    this.formSubmit.emit(formJson);
  }
  keyDownOut(e: any) {
    if (e.code === 'Enter') {
      console.log('表单enter已经屏蔽', e);
      return false;
    } else {
      return true;
    }
  }

  getSubmitData() {
    //diabled 提交按钮
    this.itemList.forEach((item: any) => {
      if (item.f_type === 6 || item.f_type === 2) {
        item.lazyClick = true;
        setTimeout(() => {
          item.lazyClick = false;
        }, 2000);
      }
    });
    let formJson = this.getFormValue();
    formJson = this.dealData(formJson);
    return formJson;
  }

  reset(JsonData: any) {
    //处理  int 类型为0的情况
    JsonData = this.dealData(JsonData);
    this.form.reset(JsonData);
  }

  /**
   * 处理  int 类型为0的情况  和price 的情况
   * @param json
   * @param fromData
   */
  dealData(json: any) {
    const item_list = _.get(this.formData, 'row_list[0].item_list', null);
    if (item_list) {
      item_list.forEach((item: any) => {
        if (!json.hasOwnProperty(item.key) || IdTool.isEmptyArray(json[item.key])) {
          if (item.type === 'number' || item.type === 'int' || item.type === 'long' ||
            item.type === 'sec' || item.type === 'min' || item.type === 'hour') {
            json[item.key] = 0;
          } else if (item.type === 'price') {
            json[item.key] = 0.00;
          }
        } else {
          if (json[item.key]) {
            const v = json[item.key];
            if (item.type === 'sec') {
              json[item.key] = v / 1000;
            } else if (item.type === 'min') {
              json[item.key] = v / (1000 * 60);
            } else if (item.type === 'hour') {
              json[item.key] = v / (1000 * 60 * 60);
            } else if (item.type === 'price') {
              json[item.key] = v / 100;
            }
          }
        }
      });
    }
    return json;
  }

  setFormData(fd: any) {
    if (this.form) {
      const values = this.form.getRawValue();
      this.formData = fd;
      ToolForm.getItemList(this.formData).forEach((item: any) => {
        if (item.hidden) {
          this.form.removeControl(item.key);
        } else {
          if (!this.form.contains(item.key)) {
            this.form.addControl(item.key, this.qcs.addValidators(item));
          }
        }
      });
      this.refreshValue(values);
    } else {
      this.formData = fd;
      this.form = this.qcs.toIFormGroup(this.formData);
    }
  }
  setItemValue(key: any, value: any) {
    const values = this.form.getRawValue();
    for (const itemkey in values) {
      if (itemkey === key) {
        values[key] = value;
      }
    }
    this.refreshValue(values);
  }
  setItemValueByJson(json: any) {
    const values = this.form.getRawValue();
    for (const key in json) {
      values[key] = json[key];
    }
    this.refreshValue(values);
  }
  /**
   * 设置某个属性为空
   * @param key
   */
  setNull(key: any) {
    this.setItemValue(key, undefined);
  }

  refreshValue(values: any = null) {
    //每次刷新校验formData的 fi_type
    this.CHECK_FITYPE = this.qcs.checkFIType(this.formData);
    if (this.CHECK_FITYPE) {
      if (!values) {
        values = this.form.getRawValue();
      }
      if (this.formData.row_list) {
        this.formData.row_list.forEach((row: any) => {
          if (row.item_list) {
            row.item_list.forEach((item: any) => {
              values[item.key] = { value: values[item.key], disabled: item.disabled };
            });
          }
        });
      }
      this.form.reset(values);
    }
  }
  /**
   * 刷新验证规则
   */
  refreshRules(fd: any) {
    if (this.form) {
      this.formData = fd;
      ToolForm.getItemList(this.formData).forEach((item: any) => {
        if (item.rules) {
          if (this.form.get(item.key)) {
            const gz: any = [];
            this.qcs.addRules(gz, item.rules);
            this.form.get(item.key).setValidators(gz);
          } else {
            this.form.addControl(item.key, this.qcs.addValidators(item));
          }
        } else {
          if (this.form.get(item.key)) {
            this.form.get(item.key).clearValidators();
          } else {
            this.form.addControl(item.key, this.qcs.addValidators(item));
          }
        }
      });
    }
  }
  /**
   * 查看key 是否隐藏配置
   * @param key
   */
  keyIsHidden(key: any) {
    let isHidden = false;
    if (this.formData.row_list) {
      this.formData.row_list.forEach((row: any) => {
        if (row.item_list) {
          row.item_list.forEach((item: any) => {
            if (item.hidden && item.key === key) {
              isHidden = true;
            }
          });
        }
      });
    }
    return isHidden;
  }
  /**
   * 获取表单的值
   */
  getFormValue() {
    if (!this.form) {
      return null;
    }
    const formJson = {};
    for (const key in this.form.value) {
      if (!this.keyIsHidden(key) || key.indexOf('pt_id.open_id') > 0) {
        // if (item.getOldValue() === this.qcs.empty_int || item.getOldValue() === this.qcs.empty_char) {
        const dfItem = this.getItem(key);
        if (dfItem) {
          if (dfItem.getFiType() === 'fi_button_search') {
            continue;
          }
          if (dfItem.getTempValue() && this.isEmpty(dfItem.getTempValue())) {
            //处理有值到 null 的情况
            _.set(formJson, key, dfItem.getTempValue());
          } else if (dfItem.getType() === 'sec') {
            let v = this.form.value[key] || 0;
            v = v * 1000;
            _.set(formJson, key, v);
          } else if (dfItem.getType() === 'min') {
            let v = this.form.value[key] || 0;
            v = v * 60 * 1000;
            _.set(formJson, key, v);
          } else if (dfItem.getType() === 'hour') {
            let v = this.form.value[key] || 0;
            v = v * 60 * 60 * 1000;
            _.set(formJson, key, v);
          } else if (dfItem.getType() === 'price') {
            let v = this.form.value[key] || 0;
            v = v * 100;
            _.set(formJson, key, v);
          } else {
            _.set(formJson, key, this.form.value[key]);
          }
        } else {
          _.set(formJson, key, this.form.value[key]);
        }
      }
    }
    return formJson;
  }

  isEmpty(value: any) {
    return value === this.qcs.empty_int || value === this.qcs.empty_char;
  }

  getItem(key: any) {
    if (this.itemList) {
      const dfItem = this.itemList.find((element) => {
        return element.item.key === key;
      });
      return dfItem;
    }
    return undefined;
  }

  selectchange(item: any) {
    this.selectchangeout.emit(item);
  }
  /**
   *这个方法会清空之前formData定义的  默认值
   */
  clear() {
    if (this.form) {
      this.form.reset({});
    }
  }
  /**
   * 恢复初始状态，会保留之前的默认值
   */
  toDefault() {
    if (this.form) {
      this.form.reset(this.defaultValue || {});
    }
  }
  btnclick(item: any) {
    this.btnclickout.emit(item);
  }
  customerSubmit(item: any) {
    const formJson = this.getSubmitData();
    this.customerSubmitOut.emit({ item: item, v: formJson });
  }
}
