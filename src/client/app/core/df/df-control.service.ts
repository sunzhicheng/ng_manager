import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
              || item.fi_type === 18) {
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

}
