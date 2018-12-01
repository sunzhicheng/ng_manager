import { Component, ViewEncapsulation, OnInit, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolAlert } from '../../shared/tool/ToolAlert';
import { BaseComponent } from '../../shared/component/BaseComponent';
import { LocalStorageCacheService } from '../../shared/cache/localstorage.service';
import { LoginService } from './login.service';
import { IdTool } from '../../shared/tool/IdTool';
import { CustomReuseStrategy } from '../../shared/tool/CustomReuseStrategy';

@Component({
  moduleId: module.id,
  selector: 'login-alter',
  templateUrl: 'login.alter.component.html',
  encapsulation: ViewEncapsulation.None,
  viewProviders: [LoginService]
})

export class LoginAlterComponent extends BaseComponent implements AfterContentInit {

  errorMessage: any;
  account: any;
  pwd: any;
  constructor(private loginService: LoginService,
    private localCache: LocalStorageCacheService,
    public _router: Router) {
    super();

  }

  ngAfterContentInit() {
    this.account = this.localCache.getAccount();
    if (!this.account) {
      this._router.navigateByUrl('/');
    }
  }

  check(account: any, pt_pwd: any): boolean {
    if (!account) {
      this.errorMessage = '帐号不能为空';
      return false;
    }
    if (!pt_pwd) {
      this.errorMessage = '密码不能为空';
      return false;
    }
    return true;
  }
  /**
   * 登陆
   */
  login() {
    if (this.check(this.account, this.pwd)) {
      const ptType = localStorage.getItem('ptType');
      const sysUserEntry = { user_pt: '1', account: this.account, password: this.pwd };
      this.log('IdSysUserType query params : ' + sysUserEntry);
      this.loginService.loginByTokenInvaild(sysUserEntry).subscribe(
        (protoMsg: any) => {
          if (protoMsg.token && protoMsg.token.ex) {
            let errorMsg = IdTool.getJson(protoMsg.token, 'ex.ex_short_msg');
            if (!errorMsg) {
              errorMsg = IdTool.getJson(protoMsg.token, 'ex.ex_tips');
            }
            this.errorMessage = errorMsg;
          } else {
            this.setJson(protoMsg, 'token.ext.account', this.account);
            this.localCache.setUserInfo(protoMsg);
            CustomReuseStrategy.removeAll();
            ToolAlert.login(false);
          }
        },
        (error: any) => console.error(error)
      );
    }
  }

}
