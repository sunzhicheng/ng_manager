import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GpbService } from './gpb.service';
import { LocalStorageCacheService } from '../cache/localstorage.service';
import { HttpService } from './HttpService';
import { IDCONF, HTTPREQ } from '../config/app.config';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
declare let $: any;
/**
 * HTTP 请求交互类
 */
@Injectable({
    providedIn: 'root',
})
export class UploadService extends HttpService {

    constructor(protected http: HttpClient,
        protected localCache: LocalStorageCacheService,
        protected toolGpbService: GpbService, ) {
        super(http, localCache, toolGpbService);
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
     *  通过uuid 集合获取文件详情
     * @param file_arr
     */
    fileDetail(file_arr: any) {
        return Observable.create((observer: any) => {
            const attArr: any = [];
            file_arr.forEach((uploadId: any) => {
                attArr.push({ pt_id: { open_id: uploadId } });
            });
            this.toolGpbService.getProto('com2.ComFileEntry').subscribe(
                (protoMessage: any) => {
                    this.httpRequest(IDCONF().api_base + '/idsys/idfileupload/detail', { attList: attArr },
                        protoMessage, HTTPREQ.POST).subscribe(
                            (result: any) => {
                                observer.next(result);
                            },
                            (error: any) => {
                                observer.error('/idsys/idfileupload/detail errro: ', error);
                            }
                        );
                },
                (error: any) => {
                    observer.error('/idsys/idfileupload/detail errro: ', error);
                }
            );
        });
    }
}
