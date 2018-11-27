import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/service/HttpService';
import { GpbService } from '../../shared/service/gpb.service';
import { DyBaseService } from '../../shared/service/IdBaseService';
import { IDCONF } from '../../shared/config/app.config';

@Injectable()
export class LoginService extends DyBaseService  {
  random: any = 1;
  sessionId: any ;
  /**
     * 数据接口定义
     */
    public api: any = {
      session: '/idsys/manager/login/initSession',
      login: '/idsys/manager/login/login',
      tokenInvaild: '/idsys/manager/login/login/ignoreCode',
      captcha: '/idsys/manager/login/captcha',
      proto: 'idsys.IdSysAppAcountEntry'
    };

    /**
     * 重写构造方法
     * @param toolGpb 协议服务
     * @param httpService 接口请求服务
     */
    constructor(public httpService: HttpService,
      public toolGpb: GpbService) {
      super(toolGpb, httpService);
  }

  /**
   * 登陆接口，直接返回协议实例，不需要再反序列化
   * @param sysUserEntry 权限协议实例
   * @param protoMessage 权限协议对像
   */
  login(entry: any, protoMessage: any) {
    return Observable.create((observer: any) => {
      this.httpService.httpRequest(this.api.login, entry, protoMessage).subscribe(
          (message: any) => observer.next(message),
          (error: any) => observer.error(error)
      );
    });
  }
  loginByTokenInvaild(entry: any, protoMessage: any) {
    return Observable.create((observer: any) => {
      this.httpService.httpRequest(this.api.tokenInvaild, entry, protoMessage).subscribe(
          (message: any) => observer.next(message),
          (error: any) => observer.error(error)
      );
    });
  }

  initSession(entry: any, protoMessage: any) {
    return Observable.create((observer: any) => {
      this.httpService.httpRequest(this.api.session, entry, protoMessage).subscribe(
          (message: any) => observer.next(message),
          (error: any) => observer.error(error)
      );
    });
  }

  getCaptcha() {
    return IDCONF().api_base + this.api.captcha + '/' + this.sessionId + '?' + (this.random++);
  }
  /**
   * 添加会话ID，不允许传空对像
   * @param message 接口交互协议
   */
  addSessionId(message: any) {
    this.log('addSessionId this.session : ' + this.sessionId);
    if (this.sessionId && message) {
      message.token.ext.pt_session_id = this.sessionId;
    } else {
      console.error('addSessionId  session or message undefine!!!');
    }
  }
}

