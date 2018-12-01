import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { BaseComponent } from '../../shared/component/BaseComponent';
import { TOKEN_INIT, PLATFORM } from '../../shared/config/app.config';
import { CustomReuseStrategy } from '../../shared/tool/CustomReuseStrategy';
import { Title } from '@angular/platform-browser';
import { LocalStorageCacheService } from '../../shared/cache/localstorage.service';
import { IdLog } from '../../shared/tool/IdLog';

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
  errorMessage = '';
  account: any;
  password: any;
  constructor(
    private title: Title,
    private _router: Router,
    protected eleRef: ElementRef,
    private localCache: LocalStorageCacheService,
    private loginService: LoginService) {
    super();
  }
  ngOnInit() {
    this.log('login component ...');
  }

  ngAfterViewInit(): void {
    this.log('ngAfterViewInit ..... ');
  }

  check(): boolean {
    if (!this.account) {
      this.errorMessage = '帐号不能为空';
      return false;
    }
    if (!this.password) {
      this.errorMessage = '密码不能为空';
      return false;
    }
    return true;
  }
  /**
   * 登陆
   */
  login() {
    if (this.check()) {
      const sysUserEntry = { user_pt: '1', account: this.account, password: this.password };
      this.log('login :', sysUserEntry);
      this.loginService.login(sysUserEntry).subscribe(
        (protoMsg: any) => {
          this.localCache.setUserInfo(protoMsg);
          this.localCache.setPT(PLATFORM.OPERATOR);
          CustomReuseStrategy.removeAll();
          this._router.navigateByUrl('/home/index');
        },
        (error: any) => console.error(error)
      );
    }
  }
}
