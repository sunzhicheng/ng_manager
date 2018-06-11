import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolHttpService, ToolGpbService } from '../../shared/tool';
// import { isDebug } from '../config/env.config';

// Injectable 不能从 index 导入
import { SidebarService } from './sidebar.service';

import { TOKEN_INIT } from '../../shared/config/env_qz.config';

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    viewProviders: [SidebarService]
})

export class SidebarComponent implements OnInit {

    // IRoleBase: any;
    // QzAic: any;
    // QzUserEntry: any;

    errorMessage = '';
    isActive = false;
    showMenu = '';

    roleMenu: any;
    selectFunGroup = 0;
    selectFun = 0;

    AIC: any;

    eventCalled() {
        this.isActive = !this.isActive;
    }
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    constructor(private toolHttp: ToolHttpService,
        private sidebarService: SidebarService,
        private toolGpbService: ToolGpbService,
        private _router: Router ) {
        // if (isDebug) {
            // console.log('SidebarComponent constructor init...');
        // }
        this.toolHttp.sideBarRefresh$.subscribe(
            (funGroup: any) => {
                // console.log('SidebarComponent sideBarRefresh : ' , funGroup);
                if (funGroup) {
                    const fg = funGroup.split('-');
                    if (fg.length === 2) {
                        this.menu_select(fg[0], fg[1], '', '');
                    }
                }
            }
        );

    }

    /**
      * OnInit
      */
    ngOnInit() {
      console.log('初始化菜单');
      this.toolGpbService.getSysAic((protoMessage: any) => {
        this.AIC = protoMessage;
        this.toolGpbService.getSysUserEntry((protoMessage: any) => {
          const sysUserEntry = protoMessage.create(TOKEN_INIT);
          // 查询菜单
          this.sidebarService.querySidebar(sysUserEntry, protoMessage).subscribe(
            (sysUserResult: any) => this.menu_callback(sysUserResult),
            (error: any) => this.errorMessage = <any>error
          );
        });
      });
    }

    /**
     * 菜单返回
     * @param sysUserEntry 协议实例
     */
    public menu_callback(sysUserEntry: any) {
        if (sysUserEntry.token.ex) {
            this.errorMessage = sysUserEntry.token.ex.ex_tips;
            this.toolHttp._waring(sysUserEntry.token.ex.ex_tips);
        } else {
            if (sysUserEntry.user_role && sysUserEntry.user_role.role[0]) {
                this.roleMenu = sysUserEntry.user_role.role[0];
            }
        }
    }

    // 菜单图标
    public menu_icon(aic: any) {

      let aicNum = 0 ;
      if (aic === '系统管理') {
        aicNum = 1 ;
      } else if (aic === '平台管理') {
        aicNum = 3 ;
      } else if (aic === '视频系统') {
        aicNum = 4 ;
      }

      switch (aicNum) {
        case 1 :
          return 'fa fa-columns icon';
        case 2 :
          return 'fa fa-columns icon';
        case 3 :
          return 'fa fa-columns icon';
        case 4 :
          return 'fa fa-columns icon';
        case 5 :
          return 'fa fa-columns icon';
        case 6 :
          return 'fa fa-columns icon';
        case 7 :
          return 'iconfont icon-baobiaozhongxin';
        case 8 :
          return 'iconfont icon-fuwu';
        case 9 :
          return 'iconfont icon-dingdanguanli';
        case 10 :
          return 'iconfont icon-weixin';
        default:
          break;
      }
        // let SysAic = this.toolGpbService.getSysAic();
        // let aicNum: number = SysAic[aic];

        // switch (aicNum) {
        //     case SysAic.AIC_SYS_WEB_AIC_GROUP_LIST_QUERY:
        //         return 'iconfont icon-iconshezhi01';
        //     case SysAic.AIC_SYS_WEB_ADMIN_QUERY:
        //         return 'iconfont icon-iconshezhi01';
        //     case SysAic.AIC_SYS_WEB_COMPANY_DEP:
        //         return 'iconfont icon-iconshezhi01';
        //     case SysAic.AIC_SYS_WEB_ROLE_QUERY:
        //       return 'iconfont icon-iconshezhi01';
        //     case SysAic.AIC_WEB_SYS_AD_MANAGE:
        //       return 'iconfont icon-iconshezhi01';
        //     case SysAic.AIC_SYS_LOG:
        //       return 'iconfont icon-iconshezhi01';
        //     default:
        //         break;
        // }
      return 'iconfont icon-iconshezhi01';
    }

    // 功能组选择
    public menu_select(funGroup: string, fun: string, menuName: string, groupName: string) {
        console.log('SidebarComponent menu_select group and fun : ', fun);
       sessionStorage.setItem('menu_name', menuName);
      sessionStorage.setItem('group_name', groupName);
        // let SysAic = this.toolGpbService.getSysAic();
        // this.selectFunGroup = SysAic[funGroup];
        // this.selectFun = SysAic[fun];

        // let routerLink = this.toolGpbService.getQzMapRouter(fun);
        const sysRouterLink = this.getRoutLink(fun);
        if (sysRouterLink[0] === '') {
          alert('功能正在开发' + fun);
          return ;
        }
        // if (isDebug) {
            console.log('menu_select routerLink : ' , sysRouterLink);
        // }
        // this._router.navigate([sysRouterLink]);
      this._router.navigate(sysRouterLink);
        // if (isDebug) {
        //     console.log('menu_select routerLink jump! ');
        // }

    }

    public getRoutLink(key: string) {
      const obj: any = this.toolGpbService.RoutLink;
      let retn = '';
      for (const o in obj) {
        if (o === key) {
          retn =  obj[o];
        }
      }
      if (retn === '') {
        return [retn];
      } else {
        return [retn];
      }

    }

    // 功能组样式
    public menu_group_class(aic: string) {
        // console.log('SidebarComponent menu_group_class aic : ', aic);
        // let QzAic = this.toolGpbService.getSysAic();
        const fg: number = this.AIC[aic];
        return fg === this.selectFunGroup ? 'active' : '';
    }

    // 功能组子菜单样式
    public menu_sub_class(aic: string) {
        // console.log('SidebarComponent menu_sub_class aic : ', aic);
        // let QzAic = this.toolGpbService.getSysAic();
        const f: number = this.AIC[aic];
        return f === this.selectFun ? 'active' : '';
    }

}
