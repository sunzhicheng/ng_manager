import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUtils } from '../providers/IUtils';
import { API_DEBUG, HTTPREQ } from '../config/app.config';
import { GpbService } from './gpb.service';
import { BASE_URL_DEBUG, BASE_URL } from '../config/env.config';

/**
 * HTTP 请求交互类
 */
@Injectable()
export class HttpService {

    public newApiHead = new HttpHeaders();
    public oldApiHead = new HttpHeaders();

    constructor(private http: HttpClient,
        private toolGpbService: GpbService,
        private _router: Router) {
            this.oldApiHead = this.oldApiHead.append('Content-Type', 'application/json; charset=utf-8');
            this.oldApiHead = this.oldApiHead.append('idorp-agent', 'idorp-agent-web');

            this.newApiHead = this.newApiHead.append('Content-Type', 'application/json; charset=utf-8');
            this.newApiHead = this.newApiHead.append('id-proto', 'base64');
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
        httpMethod: HTTPREQ = HTTPREQ.POST, options: any = { headers : this.newApiHead}): Observable<any> {
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
                options.headers = options.headers.append('id-token', 'CgbCPgMxMjM=');
            }
            // else {
            //     options.headers = options.headers.append('Content-Type', 'application/json; charset=utf-8');
            //     options.headers = options.headers.append('idorp-agent', 'idorp-agent-web');
            // }

        } else {
            // 以普通方式提交
            options.headers = options.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
        }

        console.log('httpRequest : ', options);

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
                console.log('httpRequest res : ', res);
                const resText = res || '';
                if (proto) {
                    // IDORP 协议请求方式
                    const message = this.toolGpbService.bas64ToProto(resText, proto);
                    observer.next(message);
                } else {
                    observer.next(resText);
                }
            }, (err: any) => {
                observer.error(err);
            });
        });
    }
}
