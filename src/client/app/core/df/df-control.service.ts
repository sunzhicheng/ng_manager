import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import * as _ from 'lodash';

@Injectable()
export class DFControlService {
  FI_TYPE: any = [
    'fi_text',                    //input=’text‘ 输入框
    'fi_select',                  // 下拉框 select
    'fi_time',                    //时间选择器
    'fi_button_search',           //列表页面搜索按钮
    'fi_button_search_customer',  //列表页面自定义按钮
    'fi_keeditor',                //富文本
    'fi_checkbox',                //多选checkbox
    'fi_takepoint_map',           //地图取点
    'fi_select_tree',             //树选择器
    'fi_select_table',            //列表选择器
    'fi_img',                     //上传图片
    'fi_img_cut',                 //上传裁剪图片
    'fi_select_search',           //带搜索的下拉框
    'fi_provincecityarea',        //省市区选择
    'fi_textarea',                //多行文本
    'fi_combodate',               //时分秒
    'fi_file',                    //文件上传
    'fi_button_cancel',           //取消按钮
    'fi_submit',                  //提交按钮
    'fi_submit_customer',         //自定义提交按钮
    'fi_button_add',               //列表新增按钮
    'fi_audio',                     //音频上传
  ];
  /**
   * 标识number类型的空值，供接口统一处理成空  eg.场景 修改表单  本来有值 重新设置成空
   */
  empty_int = -999999;
  /**
   * 标识Text类型的空值，供接口统一处理成空  eg.场景 修改表单  本来有值 重新设置成空
   */
  empty_char = 'NULL';

  /**
   * 根据表单配置参数创建表单规则
   * @param formData
   */
  toIFormGroup(formData: any) {
    const group: any = {};
    if (formData.row_list) {
      formData.row_list.forEach((row: any) => {
        if (row.item_list) {
          row.item_list.forEach((item: any) => {
            //提交和取消或者其他按钮不需要加入ngGroup
            if (item.fi_type !== 6 && item.fi_type !== 7 && item.fi_type !== 21) {
              if (item.key) {
                const fgoup = this.addValidators(item);
                group[item.key] = fgoup;
              }
            }
          });
        }
      });
    }
    const fg = new FormGroup(group);
    return fg;
  }

  //添加规则
  addValidators(item: any) {
    let fg = new FormControl(item.d_value || '');
    if (item.rules && !item.hidden) {
      const gz: any = [];
      this.addRules(gz, item.rules);
      if (gz.lenght === 0) {
        fg = new FormControl(item.d_value || '');
      } else {
        fg = new FormControl(item.d_value || '', gz);
      }
    }
    return fg;
  }
  addRules(gz: any, rules: any) {
    if (rules && rules.length > 0) {
      rules.forEach((rule: any) => {
        if (rule.name === 'required') {
          gz.push(Validators.required);
        }
        if (rule.name === 'min') {
          gz.push(CustomValidators.min(rule.value));
        }
        if (rule.name === 'max') {
          gz.push(CustomValidators.max(rule.value));
        }
        if (rule.name === 'rangeLength') {
          gz.push(CustomValidators.rangeLength(rule.value));
        }
        if (rule.name === 'range') {
          gz.push(CustomValidators.range(rule.value));
        }
        if (rule.name === 'digits') {
          gz.push(CustomValidators.digits);
        }
        if (rule.name === 'number') {
          gz.push(CustomValidators.number);
        }
        if (rule.name === 'url') {
          gz.push(CustomValidators.url);
        }
        if (rule.name === 'email') {
          gz.push(CustomValidators.email);
        }
        if (rule.name === 'date') {
          gz.push(CustomValidators.date);
        }
        if (rule.name === 'minDate') {
          gz.push(CustomValidators.minDate(rule.value));
        }
        if (rule.name === 'maxDate') {
          gz.push(CustomValidators.maxDate(rule.value));
        }
        if (rule.name === 'equal') {
          gz.push(CustomValidators.equal(rule.value));
        }
        if (rule.name === 'notEqual') {
          gz.push(CustomValidators.notEqual(rule.value));
        }
        if (rule.name === 'equalTo') {
          gz.push(CustomValidators.equalTo(rule.value));
        }
        if (rule.name === 'phone') {
          gz.push(CustomValidators.phone('CN'));
        }
        if (rule.name === 'customer') {
          gz.push((input: FormControl) => {
            const result = rule.fun.call(this, input.value);
            return result ? null : { customer: true };
          });
        }
      });
    }
  }
  checkFIType(fd: any) {
    if (fd) {
      const form_item_list = _.get(fd, 'row_list[0].item_list', null);
      const button_item_list = _.get(fd, 'row_list[1].item_list', null);
      let result = true;
      if (form_item_list) {
        form_item_list.forEach((item: any) => {
          if (item.fi_type) {
            if (this.FI_TYPE.indexOf(item.fi_type) === -1) {
              console.error('fi_type错误,不存在的类型:' + item.fi_type, item);
              result = false;
            }
          }
        });
      }
      if (button_item_list) {
        button_item_list.forEach((item: any) => {
          if (item.fi_type) {
            if (this.FI_TYPE.indexOf(item.fi_type) === -1) {
              console.error('fi_type错误,不存在的类型:' + item.fi_type, item);
              result = false;
            }
          }
        });
      }
      return result;
    }
    return false;
  }
}
