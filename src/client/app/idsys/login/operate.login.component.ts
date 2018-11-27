import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { BaseComponent } from '../../shared/component/BaseComponent';
import { TOKEN_INIT, PLATFORM } from '../../shared/config/app.config';
import { CustomReuseStrategy } from '../../shared/tool/CustomReuseStrategy';
import { Title } from '@angular/platform-browser';
import { LocalStorageCacheService } from '../../shared/cache/localstorage.service';

declare let $: any;
/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-login-operate',
  templateUrl: 'operate.login.component.html',
  //styleUrls: ['login.component.css'],
  viewProviders: [LoginService],
})

export class OperateLoginComponent extends BaseComponent implements OnInit, AfterViewInit {
  newName: string;
  errorMessage = '';
  names: any[];
  captcha: string;
  token: any;

  constructor(
    private title: Title,
    private _router: Router,
    protected eleRef: ElementRef,
    private localCache: LocalStorageCacheService,
    private loginService: LoginService) {
      super();
  }
  getCaptcha() {
    this.captcha = this.loginService.getCaptcha();
  }

  refreshCaptcha() {
    this.getCaptcha();
  }

  ngOnInit() {
    this.initSession();
    // this.title.setTitle(this.platform_name + this.platform_operate_name);
    // document.title = '2222';
  }

  ngAfterViewInit(): void {
    this.log('ngAfterViewInit ..... ');
  }

  initSession() {
    this.loginService.getProtoEntry().subscribe(
      (protoMessage: any) => {
        const sysUserEntry = protoMessage.create(TOKEN_INIT);
        this.token = sysUserEntry.token;
        this.loginService.initSession(sysUserEntry, protoMessage).subscribe(
            (protoMsg: any) => {
              if (this.loginService.isNotEx(protoMsg.token)) {
                this.loginService.sessionId = this.getJson(protoMsg, 'token.ext.pt_session_id');
                this.getCaptcha();
              } else if (this.getJson(protoMsg, 'token.ex') !== '') {
                this.errorMessage = this.getJson(protoMsg, 'token.ex.ex_tips');
              }
            },
            (error: any) => console.error(error)
        );
      }
    );
  }
  check(): boolean {
    if (!this.token.ext.pt_account) {
      this.errorMessage = '帐号不能为空';
      return false;
    }
    if (!this.token.ext.pt_pwd) {
      this.errorMessage = '密码不能为空';
      return false;
    }
    if (!this.token.ext.pt_i_code) {
      this.errorMessage = '验证码不能为空';
      return false;
    }
    return true;
  }
  /**
   * 登陆
   */
  login() {
    if (this.check()) {
      this.loginService.getProtoEntry().subscribe((protoMessage: any) => {
          const sysUserEntry = protoMessage.create({query: {uuid: 'operate'}, token: this.token, ext: {} });
          this.loginService.addSessionId(sysUserEntry);
            this.log('IdSysUserType query params : ' + sysUserEntry);
            this.loginService.login(sysUserEntry, protoMessage).subscribe(
                (protoMsg: any) => {
                  if (this.loginService.isNotEx(protoMsg.token)) {
                    this.setJson(protoMsg, 'token.ext.pt_account', this.token.ext.pt_account);
                    this.localCache.setLoginInfo(protoMsg);
                    this.localCache.setPT(PLATFORM.OPERATOR);
                    CustomReuseStrategy.removeAll();
                    this._router.navigateByUrl('/home/index');
                  }
                },
                (error: any) => console.error(error)
            );
        });
    }
  }
}
