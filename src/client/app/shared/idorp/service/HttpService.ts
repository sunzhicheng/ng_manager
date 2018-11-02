import { PromptUtil } from './../providers/PromptUtil';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUtils } from '../providers/IUtils';
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
    [x: string]: any;

    public apiHead = new HttpHeaders();

    constructor(private http: HttpClient,
        private localCache: LocalStorageCacheService,
        private toolGpbService: GpbService,
        private _router: Router) {
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
        url = IUtils.formatUrl(url.startsWith('http') ? url : apiBase + url);
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
                    // const ptType = localStorage.getItem('ptType');
                    // if (ptType) {
                    //     this._router.navigateByUrl(ptType + '/login');
                    // } else {
                    //     this._router.navigateByUrl('/');
                    // }
                }
                observer.error(err);
            });
        });
    }
    /**
   * 上传文件
   * @param files
   */
    filesAjax(files: any, url: any, callback: any, target: any, t: any) {
        const me = this;
        this.toolGpbService.getProto('com2.ComFileEntry').subscribe(
            (protoMessage: any) => {
                // FormData 对象
                const form = new FormData();
                for (const i in files) {
                    form.append('file' + i, files[i]); // 文件对象
                }
                // XMLHttpRequest 对象
                const xhr = new XMLHttpRequest();
                xhr.open('post', url, true);
                xhr.setRequestHeader('id-proto', 'base64');
                xhr.setRequestHeader('id-token', this.getToken(url));
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        if (callback) {
                            // 过滤空字符,避免解析错误
                            // const body = xhr.responseText.replace(/\s/g, '');
                            const body = xhr.responseText;
                            // console.log('ajaxJson2 response string : ', body);
                            const result = me.toolGpbService.bas64ToProto(body, protoMessage);
                            callback.call(target, result, t); //回调函数
                        }
                    }
                };
                xhr.send(form);
            },
            (error: any) => {
                console.error(' 上传文件 错误 : ' + JSON.stringify(error));
            }
        );
    }


    /**
     * 是否请求正常，正常返回 true, 异常返回 false
     * @param token 请求标识
     * @returns {boolean}
     */
    isNotEx(token: any) {
        if (token && token.ex) {
            const error_type = token.ex.ex_type;
            let errorMsg = IUtils.getVFromJson(token, 'ex.ex_short_msg');
            if (!errorMsg) {
                errorMsg = IUtils.getVFromJson(token, 'ex.ex_tips');
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
                PromptUtil.error(errorMsg);
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
