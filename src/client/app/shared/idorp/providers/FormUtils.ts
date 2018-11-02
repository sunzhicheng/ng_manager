import { Injectable } from '@angular/core';
import { IUtils } from '../providers/IUtils';
import { DfFromComponent } from '../../../core/df/df.component';
import * as _ from 'lodash';
import { FormFormComponent } from '../../../core/f-table/f-form.component';

// declare let protobuf: any;

/**
 * 表单处理service
 */
@Injectable()
export class FormUtils {
    static authDfFrom(form: DfFromComponent) {
        if (!form) {
            console.error('必要参数:form为空   form: ' + form ? JSON.stringify(form) : 'null');
            return false;
        } else {
            return true;
        }
    }
    static authFromData(formData: any) {
        if (!formData) {
            console.error('必要参数:formData为空   formData: ' + formData ? JSON.stringify(formData) : 'null');
            return false;
        } else {
            return true;
        }
    }

    static getItemList(formData: any) {
        if (!this.authFromData(formData)) {
            return;
        }
        let item_list = IUtils.getVFromJson(formData, 'row_list[0].item_list', null);
        if (!item_list) {
            item_list = [];
        }
        return item_list;
    }
    static getButtonItemList(formData: any) {
        if (!this.authFromData(formData)) {
            return;
        }
        let item_list = IUtils.getVFromJson(formData, 'row_list[1].item_list', null);
        if (!item_list) {
            item_list = [];
        }
        return item_list;
    }
    /**
   * 绑定下拉列表,注：
   * 1.下拉列表的label必须与传过来的key相同
   * 2.用户类型必须放在row_list[0]中
   * @param optList
   * @param key
   */
    static bindFormDateOptList(form: DfFromComponent, formData: any, optList: any, key: any) {
        if (!this.authDfFrom(form) || !this.authFromData(formData)) {
            return;
        }
        let item_list: any[] = [];
        item_list = IUtils.getVFromJson(formData, 'row_list[0].item_list', null);
        if (item_list) {
            item_list.forEach(e => {
                if (e.key === key) {
                    e.opt_list = optList;
                }
            });
            this.refreshItem(form, formData);
        }
    }

    /**
     * 动态设置表单的值
     * @param form
     * @param formData
     * @param json
     */
    static setItemValueByJson(form: DfFromComponent, formData: any, json: any) {
        if (!this.authFromData(formData)) {
            return;
        }
        if (form) {
            setTimeout(() => {
                form.setItemValueByJson(json);
            }, 500);
        } else {
            this.getItemList(formData).forEach((item: any) => {
                if (item.hasOwnProperty('key') && _.has(json, item.key)) {
                    item.d_value = json[item.key];
                }
            });
        }
    }

    /**
     * 设置某个属性为空
     * @param key
     */
    static setNullByKey(form: DfFromComponent, key: any) {
        if (!this.authDfFrom(form)) {
            return;
        }
        form.setNull(key);
    }

    /**
     * 数组里面的key 设为 opt   如果dealOther=true 其他的(不再数组里面的)设置为  !opt 需要通过refreshItem 方法刷新
     * @param form
     * @param formData
     * @param keyArr
     * @param opt
     * @param dealOther
     */
    static addDisabledList(formData: any, keyArr: any, opt: boolean = true, dealOther: boolean = false) {
        if (!this.authFromData(formData)) {
            return;
        }
        this.getItemList(formData).forEach((item: any) => {
            if (item.hasOwnProperty('key') && _.indexOf(keyArr, item.key) !== -1) {
                item.disabled = opt;
            } else {
                if (dealOther) {
                    item.disabled = !opt;
                }
            }
        });
    }
    /**
     * 数组里面的key 设为 opt   如果dealOther=true 其他的(不再数组里面的)设置为  !opt  需要通过refreshItem 方法刷新
     * @param form
     * @param formData
     * @param keyArr
     * @param opt
     * @param dealOther
     */
    static addHiddenList(formData: any, keyArr: any, opt: boolean = true, dealOther: boolean = false) {
        if (!this.authFromData(formData)) {
            return;
        }
        this.getItemList(formData).forEach((item: any) => {
            if (item.hasOwnProperty('key') && _.indexOf(keyArr, item.key) !== -1) {
                item.hidden = opt;
            } else {
                if (dealOther) {
                    item.hidden = !opt;
                }
            }
        });
    }
    /**
     * 根据数组key  隐藏相应的按钮列表
     * @param formData
     * @param keyArr
     * @param opt
     * @param dealOther
     */
    static addHiddenButtonList(formData: any, keyArr: any, opt: boolean = true, dealOther: boolean = false) {
        if (!this.authFromData(formData)) {
            return;
        }
        this.getButtonItemList(formData).forEach((item: any) => {
            if (item.hasOwnProperty('key') && _.indexOf(keyArr, item.key) !== -1) {
                item.hidden = opt;
            } else {
                if (dealOther) {
                    item.hidden = !opt;
                }
            }
        });
    }
    /**
     * 根据数组key  diabled相应的按钮列表
     * @param formData
     * @param keyArr
     * @param opt
     * @param dealOther
     */
    static addDisabledButtonList(formData: any, keyArr: any, opt: boolean = true, dealOther: boolean = false) {
        if (!this.authFromData(formData)) {
            return;
        }
        this.getButtonItemList(formData).forEach((item: any) => {
            if (item.hasOwnProperty('key') && _.indexOf(keyArr, item.key) !== -1) {
                item.disabled = opt;
            } else {
                if (dealOther) {
                    item.disabled = !opt;
                }
            }
        });
    }

    /**
     * 获取某个表单key的状态  默认disabled
     * @param formData
     * @param key
     */
    static getFormKeyStatus(formData: any, key: any, attr: any = 'disabled') {
        if (!this.authFromData(formData)) {
            return null;
        }
        let retn;
        this.getItemList(formData).forEach((item: any) => {
            if (item.hasOwnProperty('key') && item.key === key) {
                retn = item[attr];
            }
        });
        return retn;
    }
    /**
     * 获取某个按钮key的状态  默认disabled
     * @param formData
     * @param key
     * @param attr
     */
    static getButtonKeyStatus(formData: any, key: any, attr: any = 'disabled') {
        if (!this.authFromData(formData)) {
            return null;
        }
        let retn;
        this.getButtonItemList(formData).forEach((item: any) => {
            if (item.hasOwnProperty('key') && item.key === key) {
                retn = item[attr];
            }
        });
        return retn;
    }


    /**
    * 向表单对象动态添加item(主要用于添加button)
    * @param items  item的数组对象
    * @param afterKey 在哪个item key后面开始添加
    * @param isRefresh 是否自动刷新表单  默认不刷新
    */
    static addButtonList(formData: any, items: any, afterKey: String) {
        if (!this.authFromData(formData)) {
            return;
        }
        const itemList = this.getButtonItemList(formData);
        if (itemList) {
            for (let i = 0; i < itemList.length; i++) {
                const item = itemList[i];
                if (item.hasOwnProperty('key') && afterKey === item.key) {
                    formData.row_list[1].item_list = IUtils.addInArray(itemList, items, i);
                }
            }
        }
    }
    /**
     * 向表单对象动态添加tiem
     * @param items  item的数组对象
     * @param afterKey 在哪个item key后面开始添加
     * @param isRefresh 是否自动刷新表单  默认不刷新
     */
    static addItemList(formData: any, items: any, afterKey: String) {
        if (!this.authFromData(formData)) {
            return;
        }
        const itemList = this.getItemList(formData);
        if (itemList) {
            for (let i = 0; i < itemList.length; i++) {
                const item = itemList[i];
                if (item.hasOwnProperty('key') && afterKey === item.key) {
                    formData.row_list[0].item_list = IUtils.addInArray(itemList, items, i);
                }
            }
        }
    }
    /**
     * 向表单对象动态删除tiem
     * @param keyArr 需要删除的item key  集合
     * @param isRefresh 是否自动刷新表单 默认不刷新
     */
    static delItemList(formData: any, keyArr: any) {
        if (!this.authFromData(formData)) {
            return;
        }
        const itemList = this.getItemList(formData);
        if (itemList) {
            _.remove(itemList, (item: any) => {
                return item.hasOwnProperty('key') && _.indexOf(keyArr, item.key) !== -1;
            });
            formData.row_list[0].item_list = itemList;
        }
    }
    /**
     * item 变动  手动刷新表单
     */
    static refreshItem(form: DfFromComponent, formData: any) {
        if (!this.authDfFrom(form) || !this.authFromData(formData)) {
            return;
        }
        if (form && formData) {
            form.setFormData(formData);
        }
    }
    /**
     * 刷新表单
     * @param fform
     * @param formData
     */
    static refreshForm(fform: FormFormComponent, formData: any) {
        if (fform) {
            this.refreshItem(fform.dy_form, formData);
        }
    }
    /**
     * 刷新验证规则
     * @param form
     * @param formData
     */
    static refreshRule(form: DfFromComponent, formData: any) {
        if (!this.authDfFrom(form) || !this.authFromData(formData)) {
            return;
        }
        if (form && formData) {
            form.refreshRules(formData);
        }
    }

    /**
     * 动态设置校验规则  需要通过refreshItem 方法刷新
     * @param formData
     * @param key
     * @param opt
     * @param isAdd  新增或者  删除
     */
    static updateRules(formData: any, keyArr: any, rule: any, isAdd: boolean = true) {
        this.getItemList(formData).forEach((item: any) => {
            if (item.hasOwnProperty('key') && _.indexOf(keyArr, item.key) !== -1) {
                if (isAdd) {
                    if (!item.rules) {
                        item.rules = [];
                    }
                    item.rules.push(rule);
                } else {
                    //删除规则
                    if (item.rules) {
                        _.remove(item.rules, (r: any) => {
                            return r.name === rule.name;
                        });
                    }
                }
            }
        });
    }
    /**
     * 清空所有验证规则
     * @param formData
     * @param keyArr
     */
    static clearRules(formData: any, keyArr: any) {
        this.getItemList(formData).forEach((item: any) => {
            if (item.hasOwnProperty('key') && _.indexOf(keyArr, item.key) !== -1) {
                //删除规则
                if (item.rules) {
                    item.rules = {};
                }
            }
        });
    }
    /**
     * 更新item中filterJson 的forData
     * @param formData
     * @param key
     * @param filterJson
     */
    static updateFilterJson(formData: any, key: any, filterJson: any) {
        this.getItemList(formData).forEach((item: any) => {
            if (item.hasOwnProperty('key') && item.key === key) {
                item.filterJson = filterJson;
            }
        });
    }
}
