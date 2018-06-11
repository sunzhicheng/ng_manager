import { Component, OnInit } from '@angular/core';
import { CoreDemoService } from './core-demo-service';
import { ToolGpbService, ToolHttpService } from '../../shared/tool/index';

import { TOKEN_INIT } from '../../shared/config/env_qz.config';

@Component({
    moduleId: module.id,
    selector: 'sd-core-demo',
    templateUrl: 'core-demo.component.html',
  })

/**
 * IDORP Angular core component demo
 */
export class CoreDemoComponent implements OnInit {

    // 错误提示信息
    errorMessage: any;
    // 动态验证码
    captcha: string;
    // 登陆用户信息
    sysUser: any;

    constructor(private coreDemoService: CoreDemoService,
        private toolHttp: ToolHttpService,
        private toolGpb: ToolGpbService) {
        console.log('CoreDemoComponent constructor');
    }

    ngOnInit(): void {
        console.log('CoreDemoComponent ngOnInit');

        // 演示 Google Protobuf 登陆使用
        this.toolGpb.getSysUserEntry((protoMessage: any) => {
            // console.log('LoginComponent message : ', protoMessage);
            this.sysUser = protoMessage.create(TOKEN_INIT);
            this.toolHttp.initSession2(this.sysUser, protoMessage)
              .subscribe(
              message => this.sessionCallback(message),
              error => this.errorMessage = <any>error
              );
          });
    }

    /**
     * 加载验证码
     */
    getCaptcha() {
        this.captcha = this.coreDemoService.getCaptcha();
    }

    /**
     * 刷新验证码
     */
    refreshCaptcha() {
        this.getCaptcha();
    }

    sessionCallback(user: any) {
        // console.log('sessionCallback message : ', user);
        if (this.toolHttp.isEx(user.token)) {
          console.log('sessionCallback session : ', user.token.ext.pt_session_id);
          this.toolHttp.session = user.token.ext.pt_session_id;
          this.getCaptcha();
        } else if (user && user.token && user.token.ex) {
          this.errorMessage = user.token.ex.ex_tips;
        }
    }

    /**
     * 提交数据校验
     */
    check(): boolean {
        if (!this.sysUser.token.ext.pt_account) {
          this.errorMessage = '帐号不能为空';
          return false;
        }
        if (!this.sysUser.token.ext.pt_pwd) {
          this.errorMessage = '密码不能为空';
          return false;
        }
        if (!this.sysUser.token.ext.pt_i_code) {
          this.errorMessage = '验证码不能为空';
          return false;
        }
        return true;
    }

    /**
     * 登陆请求
     */
    login() {
        if (!this.check()) {
          return false;
        }
        // console.log('login parm  name:' , this.qzUser);
        this.toolGpb.getSysUserEntry((protoMessage: any) => {
          this.coreDemoService.login(this.sysUser, protoMessage)
            .subscribe(
            (message: any) => this.login_callback(message)
            );
        });
        return false;
    }

    /**
     * 登陆请求回调方法
     * @param user 用户信息
     */
    public login_callback(user: any) {
        // console.log('login success to obj  : ', user);
        if (user.token.ex) {
            this.errorMessage = user.token.ex.ex_tips;
        } else {
            this.toolHttp.setSessionStory(user);
            // this._router.navigateByUrl('/home');
            this.errorMessage = '登陆成功';
        }
    }
}
