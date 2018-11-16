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
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { IdLog } from '../../tool/IdLog';
import { IDCONF } from '../config/app.config';
import { IdTool } from '../../tool/IdTool';
import { LocalStorageCacheService } from '../cache/localstorage.service';
import { ToolAlert } from '../../tool/ToolAlert';
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
    request_time: null // 上一次请求时间
  };


  constructor(private injector: Injector,
    private localStorage: LocalStorageCacheService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent
  | HttpResponse<any> | HttpUserEvent<any>> {
    // 统一加上服务端前缀
    let url = req.url;
    //禁止频繁请求
    if (!this.checkRequestTime(url)) {
      return of();
    }
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      url = IDCONF.api_base + url;
    }
    // 根据状态选择URL请求
    url = IdTool.formatUrl(url);
    IdLog.log('httpRequest url : ' + url);
    const newReq = req.clone({
      url: url,
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
  private checkRequestTime(url: any) {
    let canRequest = false;
    if (!this.request_cache.url || !this.request_cache.request_time) {
      canRequest = true;
    }
    const now = new Date().getTime();
    if (this.request_cache.url === url) {
      const ctime = now - this.request_cache.request_time;
      if (ctime < this.request_cache.refresh_time) {
        ToolAlert.warningTime('频繁请求,请您休息会');
      } else {
        canRequest = true;
      }
    } else {
      canRequest = true;
    }
    if (canRequest) {
      this.request_cache.request_time = now;
      this.request_cache.url = url;
    }
    return canRequest;
  }

  private handleData(
    event: HttpResponse<any> | HttpErrorResponse,
  ): Observable<any> {
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
      case 403:
      case 404:
      case 500:
        //返回不同错误状态的页面
        this.goTo(`/${event.status}`);
        break;
      default:
        if (event instanceof HttpErrorResponse) {
          IdLog.error('服务器错误: ', event);
        }
        break;
    }
    return of(event);
  }

}
