import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/service/HttpService';
import { DyBaseService } from '../../shared/service/IdBaseService';
import { IDCONF, HTTPREQ } from '../../shared/config/app.config';

@Injectable()
export class LoginService extends DyBaseService {
  random: any = 1;
  sessionId: any;
  /**
     * 数据接口定义
     */
  public api: any = {
    login: '/sys/sessions',
    tokenInvaild: '/idsys/manager/login/login/ignoreCode',
    proto: 'idsys.IdSysAppAcountEntry'
  };

  /**
   * 重写构造方法
   * @param toolGpb 协议服务
   * @param httpService 接口请求服务
   */
  constructor(public httpService: HttpService,
  ) {
    super(httpService);
  }

  /**
   * 登陆接口，直接返回协议实例，不需要再反序列化
   * @param sysUserEntry 权限协议实例
   * @param protoMessage 权限协议对像
   */
  login(entry: any) {
    return Observable.create((observer: any) => {
      this.httpService.httpRequest(this.api.login, entry).subscribe(
        (message: any) => observer.next(message),
        (error: any) => observer.error(error)
      );
    });
  }
  loginByTokenInvaild(entry: any) {
    return Observable.create((observer: any) => {
      this.httpService.httpRequest(this.api.login, entry).subscribe(
        (message: any) => observer.next(message),
        (error: any) => observer.error(error)
      );
    });
  }
}

