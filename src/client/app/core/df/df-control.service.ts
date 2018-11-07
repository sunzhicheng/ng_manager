import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Injectable()
export class DFControlService {
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
  checkFIType(item: any) {

  }
}
