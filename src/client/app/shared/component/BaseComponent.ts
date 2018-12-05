import { IdTool } from '../tool/IdTool';
import * as _ from 'lodash';
import { PAGER_INIT } from '../config/app.config';
import { IdLog } from '../tool/IdLog';

export class BaseComponent {
    _: any = _;
    /**
     * 初始化协议json
     */
    entryInit: any = {
        query: { q_item_list: {} },
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
     * 添加查询参数
     * @param data
     */
    bindQueryData(entry: any, data: any, isConcat: boolean = false) {
        IdTool.bindQueryData(entry, data, isConcat);
    }

    /**
   * 添加查询参数
   * @param data
   * 路由传递的参数和协议关键字合并
   */
    bindAddQueryData(entry: any, data: any) {
        IdTool.bindQueryData(entry, data, true);
    }
    /**
     * 打印log
     * @param message
     * @param optionalParams 对象
     */
    log(message: any, ...optionalParams: any[]) {
        IdLog.log(message, optionalParams);
    }
    debug(message?: any, ...optionalParams: any[]) {
        IdLog.debug(message, optionalParams);
    }
    warn(message?: any, ...optionalParams: any[]) {
        IdLog.warn(message, optionalParams);
    }
    error(message?: any, ...optionalParams: any[]) {
        IdLog.error(message, optionalParams);
    }
    getJson(proto: any, name: string, defaultValue = ''): any {
        return IdTool.getJson(proto, name, defaultValue);
    }

    setJson(json: any, name: string, value: any): any {
        IdTool.setJson(json, name, value);
    }
}
