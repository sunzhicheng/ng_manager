import { Component, ViewEncapsulation, OnInit, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolAlert } from '../../shared/tool/ToolAlert';
import { BaseComponent } from '../../shared/idorp/component/BaseComponent';
import { LocalStorageCacheService } from '../../shared/idorp/cache/localstorage.service';
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
  pt_account: any;
  constructor(private loginService: LoginService,
    private localCache: LocalStorageCacheService,
    public _router: Router) {
    super();

  }

  ngAfterContentInit() {
    this.pt_account = localStorage.getItem('pt_account');
    if (!this.pt_account) {
      this._router.navigateByUrl('/');
    }
  }

  check(pt_account: any, pt_pwd: any): boolean {
    if (!pt_account) {
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
  login(pt_account: any, pt_pwd: any) {
    if (this.check(pt_account, pt_pwd)) {
      this.loginService.getProtoEntry().subscribe(
        (protoMessage: any) => {
          const ptType = localStorage.getItem('ptType');
          const sysUserEntry = protoMessage.create({
            query: { uuid: ptType ? ptType : 'operate' },
            token: { ext: { pt_account: pt_account, pt_pwd: pt_pwd } }, ext: {}
          });
          this.log('IdSysUserType query params : ' + sysUserEntry);
          this.loginService.loginByTokenInvaild(sysUserEntry, protoMessage).subscribe(
            (protoMsg: any) => {
              if (protoMsg.token && protoMsg.token.ex) {
                let errorMsg = IdTool.getJson(protoMsg.token, 'ex.ex_short_msg');
                if (!errorMsg) {
                  errorMsg = IdTool.getJson(protoMsg.token, 'ex.ex_tips');
                }
                this.errorMessage = errorMsg;
              } else {
                this.setJson(protoMsg, 'token.ext.pt_account', pt_account);
                this.localCache.setLoginInfo(protoMsg);
                CustomReuseStrategy.removeAll();
                ToolAlert.login(false);
              }
            },
            (error: any) => console.error(error)
          );
        });
    }
  }

}
