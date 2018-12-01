import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap, catchError, ignoreElements } from 'rxjs/operators';
import { IdLog } from '../tool/IdLog';
import { IDCONF } from '../config/app.config';
import { IdTool } from '../tool/IdTool';
import { LocalStorageCacheService } from '../cache/localstorage.service';
import { ToolAlert } from '../tool/ToolAlert';
import * as _ from 'lodash';
declare const $: any;
/**
 * 默认HTTP拦截器
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  //记录上一次请求路径  控制频繁请求
  request_cache: any = {
    url: null, //上一次请求url
    refresh_time: 2000, //频繁请求间隔时间
    request_time: null, // 上一次请求时间
    ignoreUrls: [ //忽略验证的
      '/sys/sysarea/getSubList',
    ]
  };
  constructor(private injector: Injector,
    private localstorage: LocalStorageCacheService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent
  | HttpResponse<any> | HttpUserEvent<any>> {
    let url = req.url;
    //禁止频繁请求
    if (!this.checkRequestTime(url)) {
      return of();
    }
    // 统一加上服务端前缀
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      url = IDCONF().api_base + url;
    }
    // 处理url 双斜杠错误
    url = IdTool.formatUrl(url);
    IdLog.log('httpRequest url : ' + url);
    let apiHead = new HttpHeaders();
    apiHead = apiHead.append('Content-Type', 'application/json; charset=utf-8');
    // apiHead = apiHead.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    const newReq: any = req.clone({
      url: url,
      withCredentials: true,
      headers: apiHead
    });
    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        return this.handleData(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err)),
    );
  }
  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }
  /**
   * 验证请求时间  是否频繁请求
   * @param url
   */
  private checkRequestTime(url: any) {
    const now = new Date().getTime();
    let canRequest = false;
    if (_.indexOf(this.request_cache.ignoreUrls, url) !== -1) {
      canRequest = true;
    } else if (!this.request_cache.url || !this.request_cache.request_time) {
      canRequest = true;
    } else {
      if (this.request_cache.url === url) {
        const ctime = now - this.request_cache.request_time;
        if (ctime < this.request_cache.refresh_time) {
          IdLog.log('频繁请求url : ', url);
          ToolAlert.warningTime('频繁请求,请您休息会');
        } else {
          canRequest = true;
        }
      } else {
        canRequest = true;
      }
    }
    if (canRequest) {
      this.request_cache.request_time = now;
      this.request_cache.url = url;
    }
    return canRequest;
  }
  /**
   * 处理请求状态
   * @param event
   */
  private handleData(
    event: HttpResponse<any> | HttpErrorResponse,
  ): Observable<any> {
    if (event) {
      //异常统一处理
      switch (event.status) {
        case 200:
          if (event instanceof HttpResponse) {
            return of(event);
          }
          break;
        case 401: // 未登录状态码
          ToolAlert.login();
          break;
        case 201: //业务异常
          if (event instanceof HttpResponse) {
            IdLog.error('业务异常: ', event);
            if (event.body && event.body.length > 0) {
              ToolAlert.error(event.body[0].message);
            }
          }
          break;
        default:
          if (event instanceof HttpErrorResponse) {
            IdLog.error('服务器错误: ', event);
            if (event.error && event.error.length > 0) {
              ToolAlert.error(event.error[0].message, `${event.status}`);
            } else {
              ToolAlert.animation(`网络异常`, `服务器已断开`);
            }
          }
          break;
      }
    }
    return of(event);
  }

}
