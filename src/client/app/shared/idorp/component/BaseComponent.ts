import { IUtils } from '../providers/IUtils';
import * as _ from 'lodash';
import { PAGER_INIT, API_DEBUG } from '../config/app.config';

export class BaseComponent {
    _: any = _;
    /**
     * 初始化协议json
     */
    entryInit: any = {
        proto: { dtc: { pt_id: {} } },
        query: { q_item_list: [] },
        pager: PAGER_INIT
    };
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
    getJson(proto: any, name: string, defaultValue = ''): any {
        return IUtils.getJson(proto, name, defaultValue);
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
}
