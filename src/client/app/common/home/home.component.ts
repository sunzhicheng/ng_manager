import { Component, ViewEncapsulation, AfterContentInit, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LoginService } from '../../idsys/login/login.service';
import { BaseComponent } from '../../shared/idorp/component/BaseComponent';
import { CustomReuseStrategy } from '../../shared/tool/CustomReuseStrategy';
import { IUtils } from '../../shared/idorp/providers/IUtils';
import { LocalStorageCacheService } from '../../shared/idorp/cache/localstorage.service';
declare const $: any;

@Component({
  moduleId: module.id,
  selector: 'home-cmp',
  templateUrl: 'home.component.html',
  encapsulation: ViewEncapsulation.None,
  // viewProviders: [LoginService, ToolHttpComponent,ModalsComponent],
  // directives: [ROUTER_DIRECTIVES, TopNavComponent,FootNavComponent, SidebarComponent]
})

export class HomeComponent extends BaseComponent implements OnInit, AfterContentInit {
  errorMessage: any;
  pt_account: any;
  @ViewChild(SidebarComponent)
  public sidebar: SidebarComponent;
  ngOnInit() {
    $('home-cmp').addClass('vbox');
  }

  constructor(
    private localCache: LocalStorageCacheService,
    private loginService: LoginService) {
      super();
  }
  ngAfterContentInit() {
    this.pt_account = localStorage.getItem('pt_account');
  }

  searchSidebar(keyword: any) {
    this.sidebar.hasMenu(keyword);
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
          const sysUserEntry = protoMessage.create({ query: { uuid: ptType ? ptType : 'operate'  },
          token: {ext: {pt_account: pt_account, pt_pwd: pt_pwd}}, ext: {} });
          this.log('IdSysUserType query params : ' + sysUserEntry);
          this.loginService.loginByTokenInvaild(sysUserEntry, protoMessage).subscribe(
            (protoMsg: any) => {
              if (protoMsg.token && protoMsg.token.ex) {
                let errorMsg = IUtils.getJson(protoMsg.token, 'ex.ex_short_msg');
                if (!errorMsg) {
                     errorMsg = IUtils.getJson(protoMsg.token, 'ex.ex_tips');
                }
                this.errorMessage = errorMsg;
              } else {
                this.setJson(protoMsg, 'token.ext.pt_account', this.pt_account);
                this.localCache.setSessionStory(protoMsg);
                CustomReuseStrategy.removeAll();
                (<any>$('#tokenInvaildDiv')).modal('hide');
              }
            },
            (error: any) => console.error(error)
          );
        });
    }
  }

}
