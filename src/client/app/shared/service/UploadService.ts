import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageCacheService } from '../cache/localstorage.service';
import { HttpService } from './HttpService';
import { HTTPREQ } from '../config/app.config';
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
    ) {
        super(http, localCache);
    }
    /**
   * 上传文件
   * @param files
   */
    filesAjax(files: any, progress?: any): Observable<any> {
        return Observable.create((observer: any) => {
            const fileUrl = '/idsys/idfileupload/uploadweb';
            // FormData 对象
            const form = new FormData();
            for (const i in files) {
                form.append('file' + i, files[i]); // 文件对象
            }
            // XMLHttpRequest 对象
            const xhr = new XMLHttpRequest();
            xhr.open('post', fileUrl, true);
            xhr.withCredentials = true;
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    const body = xhr.responseText;
                    observer.next(body);
                }
            };
            if (progress) {
                xhr.upload.onprogress = progress; //【上传进度调用方法实现】
            }
            xhr.send(form);
        },
        );
    }
    /**
     *  通过uuid 集合获取文件详情
     * @param file_arr
     */
    fileDetail(file_arr: any): Observable<any> {
        return Observable.create((observer: any) => {
            const attArr: any = [];
            file_arr.forEach((uploadId: any) => {
                attArr.push({ pt_id: { open_id: uploadId } });
            });
            this.httpRequest('/idsys/idfileupload/detail', { attList: attArr },
                HTTPREQ.POST).subscribe(
                    (result: any) => {
                        observer.next(result);
                    },
                    (error: any) => {
                        observer.error('/idsys/idfileupload/detail errro: ', error);
                    }
                );
        });
    }
}
