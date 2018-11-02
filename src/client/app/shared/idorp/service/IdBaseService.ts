import { Observable } from 'rxjs';
import { GpbService } from './gpb.service';
import { HttpService } from './HttpService';
import { HTTPREQ, API_DEBUG, PAGER_INIT } from '../config/app.config';
import * as _ from 'lodash';

export class DyBaseService {
    _: any = _;
    entryInit: any = {
        proto: { dtc: { pt_id: {} } },
        query: { q_item_list: [] },
        pager: PAGER_INIT
    };
    /**
     * 数据接口定义
     */
    public api: any = {
        base: '',
        add: '',
        update: '',
        query: '',
        del: '',
        loadByUUID: '',
        tree: '',
        enable: '',
        proto: ''
    };
    //控制列表刷新
    isReLoad = false;
    constructor(public toolGpb: GpbService,
        public httpService: HttpService) {
    }
    /**
     * 打印log
     * @param msg
     */
    log(msg: any) {
        if (API_DEBUG) {
            console.log(msg);
        }
    }
    /**
     * 校验诸如 add query 等 api  是否存在
     * @param opt
     */
    checkApi(opt: any) {
        if (!this.api.base || this.api.base === '') {
            console.error('api.base链接错误: ' + this.api.base);
            return false;
        }
        if (!this.api[opt] || this.api[opt] === '') {
            console.error('api.' + opt + '链接错误: ' + this.api[opt]);
            return false;
        }
        return true;
    }
    /**
     * 公共删除方法
     * @param protoEntry
     * @param protoMessage
     */
    del(entry: any, protoMessage: any): Observable<any> {
        return Observable.create((observer: any) => {
            this.httpService.httpRequest(this.api.base + this.api.del, entry, protoMessage).subscribe(
                (message: any) => observer.next(message),
                (error: any) => observer.error(error)
            );
        });
    }

    /**
     * 启用禁用
     * @param entry
     * @param protoMessage
     */
    enable(entry: any, protoMessage: any): Observable<any> {
        return Observable.create((observer: any) => {
            this.httpService.httpRequest(this.api.base + this.api.enable, entry, protoMessage).subscribe(
                (message: any) => observer.next(message),
                (error: any) => observer.error(error)
            );
        });
    }

    /**
     * 公共列表查询方法
     * @param entry 协议实例对像
     * @param protoMessage 协议对像
     */
    query(entry: any, protoMessage: any): Observable<any> {
        return Observable.create((observer: any) => {
            this.httpService.httpRequest(this.api.base + this.api.query, entry, protoMessage).subscribe(
                (message: any) => observer.next(message),
                (error: any) => observer.error(error)
            );
        });
    }
    /**
     * 查询数结构
     * @param entry 协议实例对像
     * @param protoMessage 协议对像
     */
    tree(entry: any, protoMessage: any): Observable<any> {
        return Observable.create((observer: any) => {
            this.httpService.httpRequest(this.api.base + this.api.tree, entry, protoMessage).subscribe(
                (message: any) => observer.next(message),
                (error: any) => observer.error(error)
            );
        });
    }
    /**
     * 公共保存方法
     * @param entry
     * @param protoMessage
     * @param isAdd
     */
    save(entry: any, protoMessage: any, isAdd: boolean): Observable<any> {
        return Observable.create((observer: any) => {
            this.httpService.httpRequest(this.api.base + (isAdd ? this.api.add : this.api.update), entry, protoMessage).subscribe(
                (message: any) => observer.next(message),
                (error: any) => observer.error(error)
            );
        });
    }
    /**
     * 公共 根据uuid  查找详情方法
     * @param entry
     * @param protoMessage
     */
    loadByUUID(entry: any, uuid: any, protoMessage: any): Observable<any> {
        return Observable.create((observer: any) => {
            this.httpService.httpRequest(this.api.base + this.api.loadByUUID + uuid, entry, protoMessage, HTTPREQ.GET).subscribe(
                (message: any) => observer.next(message),
                (error: any) => observer.error(error)
            );
        });
    }

    /**
     * 获取接口协议类
     */
    getProtoEntry(): Observable<any> {
        return Observable.create((observer: any) => {
            this.toolGpb.getProto(this.api.proto).subscribe(
                (message: any) => observer.next(message),
                (error: any) => observer.error(error)
            );
        });
    }

    /**
     * 是否请求正常，正常返回 true, 异常返回 false
     * @param token 请求标识
     * @returns {boolean}
     */
    isNotEx(token: any) {
        return this.httpService.isNotEx(token);
    }


}
