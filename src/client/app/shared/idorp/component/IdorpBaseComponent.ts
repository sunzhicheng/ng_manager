import { IUtils } from './../providers/IUtils';
import * as _ from 'lodash';
import { PAGER_INIT, API_DEBUG } from '../config/app.config';
import { platform_name, platform_operate_name, platform_business_name } from '../config/app.config';
import { FormUtils } from '../providers/FormUtils';

export class IdorpBaseComponent {
    /**
     * 平台参数
     */
    platform_name = platform_name;
    platform_operate_name = platform_operate_name;
    platform_business_name = platform_business_name;
    _: any = _;
    /**
     * 初始化协议json
     */
    entryInit: any = {
        proto: { dtc: { pt_id: {} } },
        query: { q_item_list: [] },
        pager: PAGER_INIT
    };
    baseRoute: any;
    /**
     * 组件协议对像数据
     */
    protoEntry: any = this.entryInit;

    constructor() {
        // this.log(' IdorpBaseComponent ..constructor  ');
    }
    /**
     * 判断对象是否存在该名称的方法
     * @param service
     * @param methodName
     */
    hasMethod(service: any, methodName: any) {
        let result = false;
        for (const key in service) {
            if (key === methodName && typeof (service[key]) === 'function') {
                result = true;
            }
        }
        if (!result) {
            console.error('该对象不存在[' + methodName + ']该方法', service);
        }
        return result;
    }
    /**
     * 是否商户平台方式登陆
     */
    isBusiness() {
        if (localStorage.ptType === 'operate') {
            return false;
        } else if (localStorage.ptType === 'business') {
            return true;
        } else {
            return false;
        }
    }
    getItemList(formData: any) {
        return FormUtils.getItemList(formData);
    }
    /**
     * 添加查询参数
     * @param data
     */
    bindQueryData(entry: any, data: any, isConcat: boolean = false) {
        IUtils.bindQueryData(entry, data, isConcat);
    }

    /**
   * 添加查询参数
   * @param data
   * 路由传递的参数和协议关键字合并
   */
    bindAddQueryData(entry: any, data: any) {
        IUtils.bindQueryData(entry, data, true);
    }
    /**
     * 打印log
     * @param msg
     */
    log(msg: any, obj: any = '') {
        if (API_DEBUG) {
            if (obj !== '') {
                console.log(msg, obj);
            } else {
                console.log(msg);
            }
        }
    }
    pp(proto: any, name: string, defaultValue = ''): any {
        return IUtils.getVFromJson(proto, name, defaultValue);
    }

    setJson(json: any, name: string, value: any): any {
        IUtils.setJson(json, name, value);
    }
    hasPermission(permission: any) {
        let isHas = false;
        const permissions = sessionStorage.permissions;
        if (IUtils.isEmpty(permissions)) {
            isHas = false;
        } else {
            permissions.split(',').forEach((p: any) => {
                if (permission === p) {
                    isHas = true;
                }
            });
        }
        return isHas;
    }
    /**
    * 修改的时候  向动态表单中添加disabled属性
    * @param formData
    * @param key
    */
    addDisabled(formData: any, key: any, opt: boolean = true) {
        if (formData) {
            FormUtils.addDisabledList(formData, [key], opt);
        }
    }
    addDisabledList(formData: any, keyArr: any, opt: boolean = true, dealOther: boolean = false) {
        if (formData) {
            FormUtils.addDisabledList(formData, keyArr, opt, dealOther);
        }
    }

    /**
     * 数组里面的key 设为 opt   其他的(不再数组里面的)设置为  !opt
     * @param formData
     * @param keyArr
     * @param opt
     */
    addNotDisabledPointList(formData: any, keyArr: any, opt: boolean = true) {
        this.addDisabledList(formData, keyArr, opt, true);
    }
    /**
     * 修改的时候  向动态表单中添加disabled属性
     * @param formData
     * @param key
     */
    addHidden(formData: any, key: any, opt: boolean = true) {
        if (formData) {
            FormUtils.addHiddenList(formData, [key], opt);
        }
    }

    /**
     * 动态设置校验规则
     * @param formData
     * @param key
     * @param isAdd
     */
    addRequiredRules(formData: any, key: any, isAdd: boolean = true) {
        if (formData) {
            FormUtils.updateRules(formData, [key], {
                name: 'required',
                errorMsg: '必填'
            }, isAdd);
        }
    }

    addHiddenList(formData: any, keyArr: any, opt: boolean = true) {
        if (formData) {
            FormUtils.addHiddenList(formData, keyArr, opt);
        }
    }

    updateFilterJson(formData: any, key: any, filterJson: any) {
        if (formData) {
            FormUtils.updateFilterJson(formData, key, filterJson);
        }
    }
}
