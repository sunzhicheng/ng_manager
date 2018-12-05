import { ToolAlert } from '../tool/ToolAlert';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IdTool } from '../tool/IdTool';
import { HTTPREQ } from '../config/app.config';
import { LocalStorageCacheService } from '../cache/localstorage.service';
import { IdLog } from '../tool/IdLog';
declare let $: any;
/**
 * HTTP 请求交互类
 */
@Injectable({
    providedIn: 'root',
})
export class HttpService {

    constructor(protected http: HttpClient,
        protected localCache: LocalStorageCacheService,
    ) {
    }


    /**
     * HTTP 请求
     * @param url 请求地址，如果不以http开头则自动加上api base路径
     *            可以使用短路径发起请求
     * @param body body 请求参数
     * @param httpMethod http 请求方式
     * @param options http 请求参数
     */
    public httpRequest(url: string, body: any = null,
        httpMethod: HTTPREQ = HTTPREQ.POST): Observable<any> {
        return Observable.create((observer: any) => {
            let req;
            if (httpMethod === HTTPREQ.GET) {
                IdLog.log('httpRequest get request');
                req = this.http.get(url);
            } else if (httpMethod === HTTPREQ.POST) {
                IdLog.log('httpRequest post request');
                req = this.http.post(url, body);
            } else {
                observer.error('Not Support method');
                return;
            }
            req.subscribe((res: any) => {
                IdLog.log('url=' + url + '   返回数据结果', res);
                const resText = res || '';
                observer.next(resText);
            }, (err: any) => {
                observer.error(err);
            });
        });
    }
    /**
     * 是否请求正常，正常返回 true, 异常返回 false
     * @param token 请求标识
     * @returns {boolean}
     */
    isNotEx(token: any) {
        if (token && token.ex) {
            const error_type = token.ex.ex_type;
            let errorMsg = IdTool.getJson(token, 'ex.ex_short_msg');
            if (!errorMsg) {
                errorMsg = IdTool.getJson(token, 'ex.ex_tips');
            }
            if (error_type === 1 || error_type === 2) {
                ToolAlert.login(true);
            } else {
                ToolAlert.error(errorMsg);
            }
            return false;
        }
        return true;
    }
}
