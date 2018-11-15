import { ToolAlert } from '../../tool/ToolAlert';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IdTool } from '../../tool/IdTool';
import { API_DEBUG, HTTPREQ } from '../config/app.config';
import { GpbService } from './gpb.service';
import { BASE_URL_DEBUG, BASE_URL } from '../config/env.config';
import { LocalStorageCacheService } from '../cache/localstorage.service';
declare let $: any;
/**
 * HTTP 请求交互类
 */
@Injectable({
    providedIn: 'root',
 })
export class HttpService {
    public apiHead = new HttpHeaders();

    constructor(protected http: HttpClient,
        protected localCache: LocalStorageCacheService,
        protected toolGpbService: GpbService) {
        this.apiHead = this.apiHead.append('Content-Type', 'application/json; charset=utf-8');
        this.apiHead = this.apiHead.append('id-proto', 'base64');
    }


    /**
     * HTTP 请求
     * @param url 请求地址，如果不以http开头则自动加上api base路径
     *            可以使用短路径发起请求
     * @param body body 请求参数
     * @param proto 协议对像，如果为空，则会以默认方式请求
     * @param httpMethod http 请求方式
     * @param options http 请求参数
     */
    public httpRequest(url: string, body: any = null, proto: any = null,
        httpMethod: HTTPREQ = HTTPREQ.POST, options: any = { headers: this.apiHead }): Observable<any> {
        if (API_DEBUG) {
            console.log('httpRequest url : ' + url);
        }
        // 根据状态选择URL请求
        const apiBase = API_DEBUG ? BASE_URL_DEBUG : BASE_URL;
        url = IdTool.formatUrl(url.startsWith('http') ? url : apiBase + url);
        if (API_DEBUG) {
            console.log('httpRequest url : ' + url);
        }

        options.headers = options.headers || new HttpHeaders();
        options.responseType = 'text';
        if (proto) {
            // IDORP 协议请求方式
            if (options.headers.has('id-proto')) {
                // TODO: 这边正式开发替换为登陆Token
                options.headers = options.headers.append('id-token', this.getToken(url));
            }
            // else {
            //     options.headers = options.headers.append('Content-Type', 'application/json; charset=utf-8');
            //     options.headers = options.headers.append('idorp-agent', 'idorp-agent-web');
            // }

        } else {
            // 以普通方式提交
            options.headers = options.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
        }
        if (API_DEBUG) {
            console.log('httpRequest : ', options);
        }

        return Observable.create((observer: any) => {
            let reqBody = {};
            if (proto) {
                // IDORP 协议请求方式
                // 转 base64 新方法, 参数不在URL中不再需要EncodeURL
                if (body) {
                    if (options.headers.has('id-proto')) {
                        reqBody = { 'proto': this.toolGpbService.protoToBase64(body, proto) };
                    } else {
                        reqBody = { 'base64': this.toolGpbService.protoToBase64(body, proto) };
                    }
                }
            }
            let req;
            if (httpMethod === HTTPREQ.GET) {
                console.log('httpRequest get request');
                req = this.http.get(url, options);
            } else if (httpMethod === HTTPREQ.POST) {
                console.log('httpRequest post request');
                req = this.http.post(url, reqBody, options);
            } else {
                observer.error('Not Support method');
                return;
            }
            req.subscribe((res: any) => {
                // console.log('httpRequest res : ', res);
                const resText = res || '';
                if (proto) {
                    // IDORP 协议请求方式
                    const message = this.toolGpbService.bas64ToProto(resText, proto);
                    if (this.isNotEx(message.token)) {
                        observer.next(message);
                    }
                } else {
                    observer.next(resText);
                }
            }, (err: any) => {
                if (err.status === 401) {
                    (<any>$('#tokenInvaildDiv')).modal('show');
                }
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
                // const ptType = localStorage.getItem('ptType');
                // if (ptType) {
                //     this._router.navigateByUrl(ptType + '/login');
                // } else {
                //     this._router.navigateByUrl('/');
                // }
                (<any>$('#tokenInvaildDiv')).modal('show');
            } else {
                ToolAlert.error(errorMsg);
            }
            return false;
        }
        return true;
    }
    /**
     * 获取token
     * @param obj
     */
    getToken(url: any) {
        if (url.indexOf('manager/login') === -1) {
            const access_token = this.localCache.getToken();
            if (!access_token) {
                return '';
            } else {
                return access_token;
            }
        } else {
            return '';
        }
    }

}
