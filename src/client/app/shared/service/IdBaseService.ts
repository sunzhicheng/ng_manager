import { Observable } from 'rxjs';
import { HttpService } from './HttpService';
import { HTTPREQ, API_DEBUG, PAGER_INIT, APISOURCE } from '../config/app.config';
import * as _ from 'lodash';
import { IdLog } from '../tool/IdLog';

export class DyBaseService {
    _: any = _;
    entryInit: any = {
        query: { q_item_list: {} },
        pager: PAGER_INIT
    };
    //控制列表刷新
    isReLoad = false;
    /**
     * 接口定义  总共类型:   当页面同时出现两个的时候  默认api 就不能用了
     *  add: '',
        update: '',
        query: '',
        del: '',
        detail: '',
        enable: '',
        tree: '',
        proto: ''
     */
    protected api: any;
    /**
     * form表单接口定义
     */
    protected form_api: any;
    /**
     * 列表接口定义
     */
    protected list_api: any;
    /**
     * 树接口定义
     */
    protected tree_api: any;
    /**
     * 校验诸如 add query 等 api  是否存在
     * @param opt
     */
    getUrl(api: any, opt: any) {
        if (!api[opt] || api[opt] === '') {
            console.error('api.' + opt + '链接错误: ' + this.api[opt]);
            return '';
        }
        return api[opt];
    }
    constructor(
        public httpService: HttpService) {
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
    /**
     * 公共删除方法
     * @param protoEntry
     * @param protoMessage
     */
    del(entry: any, source: APISOURCE = APISOURCE.DEFAULT): Observable<any> {
        const api = this.getApi(source);
        return this.requestApi(this.getUrl(api, 'del'), api.proto, entry, source);
    }

    /**
     * 启用禁用
     * @param entry
     * @param protoMessage
     */
    enable(entry: any, source: APISOURCE = APISOURCE.DEFAULT): Observable<any> {
        const api = this.getApi(source);
        return this.requestApi(this.getUrl(api, 'enable'), api.proto, entry, source);
    }

    /**
     * 公共列表查询方法
     * @param entry 协议实例对像
     * @param protoMessage 协议对像
     */
    query(entry: any, source: APISOURCE = APISOURCE.DEFAULT): Observable<any> {
        const api = this.getApi(source);
        return this.requestApi(this.getUrl(api, 'query'), api.proto, entry, source);
    }
    /**
     * 查询数结构
     * @param entry 协议实例对像
     * @param protoMessage 协议对像
     */
    tree(entry: any, source: APISOURCE = APISOURCE.DEFAULT): Observable<any> {
        const api = this.getApi(source);
        return this.requestApi(this.getUrl(api, 'tree'), api.proto, entry, source);
    }
    /**
     * 公共保存方法
     * @param entry
     * @param protoMessage
     * @param isAdd
     */
    save(entry: any, isAdd: boolean, source: APISOURCE = APISOURCE.DEFAULT): Observable<any> {
        const api = this.getApi(source);
        return this.requestApi(isAdd ? this.getUrl(api, 'add') : this.getUrl(api, 'update'), api.proto, entry, source);
    }
    /**
     * 公共 根据uuid  查找详情方法
     * @param entry
     * @param protoMessage
     */
    detail(entry: any, source: APISOURCE = APISOURCE.DEFAULT): Observable<any> {
        const api = this.getApi(source);
        const uuid = this._.get(entry, 'query.uuid', '');
        if (uuid === '') {
            return Observable.create((observer: any) => {
                observer.error('DyBaseService.detail错误: ', uuid);
            });
        }
        return this.requestApi(this.getUrl(api, 'detail') + '/' + uuid, api.proto, entry, source, HTTPREQ.GET);
    }

    requestApi(url: string, proto: string, entry: any, source: APISOURCE, method: HTTPREQ = HTTPREQ.POST) {
        return Observable.create((observer: any) => {
            if (url === '') {
                observer.error('requestApi错误:  url没有配置');
                return;
            }
            this.log('requestApi  请求URL=' + url + '   JSON:', JSON.stringify(entry));
            this.httpService.httpRequest(url, entry, method).subscribe(
                (message: any) => observer.next(message),
                (error: any) => observer.error(error)
            );
        });
    }

    private getApi(source: APISOURCE) {
        switch (source) {
            case APISOURCE.LIST:
                return this.list_api ? this.list_api : this.api;
            case APISOURCE.TREE:
                return this.tree_api ? this.tree_api : this.api;
            case APISOURCE.FORM:
                return this.form_api ? this.form_api : this.api;
            default:
                return this.api;
        }
    }

}
