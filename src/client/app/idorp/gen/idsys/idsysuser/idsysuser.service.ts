import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DyBaseService } from './../../../../shared/idorp/service/IdBaseService';
import { BASE_URL_GEN } from './../../../../shared/idorp/config/env.config';
import { HttpService } from './../../../../shared/idorp/service/HttpService';
import { GpbService } from './../../../../shared/idorp/service/gpb.service';

/**
 * 系统模块 哪凉快用户 服务类
 */
@Injectable()
export class IdSysUserService extends DyBaseService  {

    /**
     * 数据接口定义
     */
    public api: any = {
        base: BASE_URL_GEN,
        query: '/idsys/idsysuser/query',
        proto: 'idsys.IdSysUserEntry'
      };


    /**
     * 重写构造方法
     * @param toolGpb 协议服务
     * @param httpService 接口请求服务
     */
    constructor(private httpService: HttpService,
        public toolGpb: GpbService) {
        super(toolGpb);
    }



    /**
     * 列表查询
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
}
