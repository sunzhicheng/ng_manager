import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Injectable()
export class DFControlService {
  // constructor() { }

  public cascading: any;

  // 根据表单配置参数创建表单规则
  toIFormGroup(formData: any) {
    const group: any = {};

    if (formData.row_list) {
      formData.row_list.forEach((row: any) => {
        if (row.item_list) {
          row.item_list.forEach((item: any) => {
            // console.log('toIFormGroup item : ', item);
            if (item.fi_type === 1
              || item.fi_type === 2
              || item.fi_type === 3
              || item.fi_type === 4
              || item.fi_type === 5
              || item.fi_type === 12
              || item.fi_type === 13
              || item.fi_type === 14
              || item.fi_type === 16
              || item.fi_type === 17
              || item.fi_type === 18
              || item.fi_type === 19
              || item.fi_type === 20
              || item.fi_type === 21) {
              const v = { value: item.d_value || '', disabled: item.disabled };
              let fg = new FormControl(v);
              if (item.is_require) {
                fg = new FormControl(v, Validators.required);
              }
              if (item.fi_type === 4 || item.fi_type === 14) {
                for (let index = 0, len = item.opt_list.length; index < len; index++) {
                  group[item.key + '_' + item.opt_list[index].key.l_id] = new FormControl(v);
                }
              } else {
                group[item.key] = fg;
              }

              if (item.fi_type === 2) {
                // 选中状态
                if (!item.opt_list) {
                  item.opt_list = [];
                }
                item.opt_list.forEach((opt: any) => {
                  if (opt.selected) {
                    item.select_id = opt.key;
                  }
                });
              }
              // //级联
              // if(item.fi_type === 11) {
              //
              // }
            }
          });
        }
      });
    }
    return new FormGroup(group);
  }

  // 刷新
  refreshIFormGroup(formData: any, form: FormGroup) {
    if (formData.row_list) {
      formData.row_list.forEach((row: any) => {
        if (row.item_list) {
          row.item_list.forEach((item: any) => {
            // console.log('toIFormGroup item : ', item);
            if (item.fi_type === 1
              || item.fi_type === 2
              || item.fi_type === 3
              || item.fi_type === 4
              || item.fi_type === 5) {
              const v = item.d_value || ''; //{ value: item.d_value || '', disabled: item.disabled };
              let fg = new FormControl(v);
              if (item.is_require) {
                // console.log('toIFormGroup item.is_require : ', item.label);
                fg = new FormControl(v, Validators.required);
              }
              if (item.fi_type === 4) {
                for (let index = 0, len = item.opt_list.length; index < len; index++) {
                  form.addControl(item.key + '_' + index, new FormControl(v));
                  // group[item.key+'_'+index] = new FormControl(v);
                }
              } else {
                form.addControl(item.key, fg);
                // group[item.key] = fg;
                // console.log('item.key='+item.key+" item.value" + fg.value);
                // if (item.fi_type === 1) {
                //   (<FormControl>form.controls[item.key]).updateValue(fg.value);
                // }
                // (<FormControl>form.controls[item.key]).setErrors(null);

              }

              if (item.fi_type === 2) {
                // 选中状态
                item.opt_list.forEach((opt: any) => {
                  if (opt.selected) {
                    // 没有设置选中ID才设置一次
                    // if (!item.select_id || item.select_id.l_id === 0) {
                      item.select_id = opt.key;
                    // }
                  }
                });
              }

            }
          });
        }
      });
    }
  }

   // 刷新
  refreshIFormGroupValid(formData: any, form: FormGroup) {
    if (formData.row_list) {
      formData.row_list.forEach((row: any) => {
        if (row.item_list) {
          row.item_list.forEach((item: any) => {
            // console.log('toIFormGroup item : ', item);
            if (item.fi_type === 1
              || item.fi_type === 2
              || item.fi_type === 3
              || item.fi_type === 4
              || item.fi_type === 5) {
              const v = item.d_value || ''; //{ value: item.d_value || '', disabled: item.disabled };
              let fg = new FormControl(v);
              if (item.is_require) {
                // console.log('toIFormGroup item.is_require : ', item.label);
                fg = new FormControl(v, Validators.required);
              }
              if (item.fi_type === 4) {
                for (let index = 0, len = item.opt_list.length; index < len; index++) {
                  form.addControl(item.key + '_' + index, new FormControl(v));
                  // group[item.key+'_'+index] = new FormControl(v);
                }
              } else {
                form.addControl(item.key, fg);
                // group[item.key] = fg;
                // console.log('item.key='+item.key+" item.value" + fg.value);
                if (item.fi_type === 1) {
                  (<FormControl>form.controls[item.key]).setValue(fg.value);
                }
                (<FormControl>form.controls[item.key]).setErrors(null);

              }

              if (item.fi_type === 2) {
                // 选中状态
                item.opt_list.forEach((opt: any) => {
                  if (opt.selected) {
                    // 没有设置选中ID才设置一次
                    if (!item.select_id) {
                      item.select_id = opt.key;
                    }
                  }
                });
              }

            }
          });
        }
      });
    }
  }

  //添加规则
  addValidators(item: any, v: any) {
    let fg = new FormControl(v);
    if (item.rules) {
      const gz: any = [];
      item.rules.forEach((rule: any) => {
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
        if (rule.name === 'customer') {
          gz.push(rule.fun);
        }
      });
      if (gz.lenght === 0) {
        fg = new FormControl(v);
      } else {
        fg = new FormControl(v, gz);
      }
    }
    return fg;
  }

}
