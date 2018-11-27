import { ToolAlert } from '../../shared/tool/ToolAlert';
import { IdTool } from '../../shared/tool/IdTool';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from './sidebar.service';
import { GpbService } from '../../shared/service/gpb.service';
import { BaseComponent } from '../../shared/component/BaseComponent';
import * as _ from 'lodash';
import { LocalStorageCacheService } from '../../shared/cache/localstorage.service';
import { SessionStorageCacheService } from '../../shared/cache/sessionStorage.service';
declare const $: any;

@Component({
  moduleId: module.id,
  selector: 'sd-sidebar',
  templateUrl: 'sidebar.component.html',
  viewProviders: [SidebarService]
})

export class SidebarComponent extends BaseComponent implements OnInit {
  projects: any = [];
  activeMenuList: any;

  selectProjectName: any = '';

  activeMenu: any;

  protoEntry: any;
  constructor(private sidebarService: SidebarService,
    private localCache: LocalStorageCacheService,
    private sessionCache: SessionStorageCacheService,
    private toolGpb: GpbService,
    private _router: Router) {
    super();
    this.log('MiddleComponent constructor ');
  }

  /**
    * OnInit
    */
  ngOnInit() {
    console.log('初始化菜单');
    $('sd-sidebar').addClass('vbox');
    this.hasMenu(null);
  }

  /**
   * 加载拥有的菜单
   */
  hasMenu(keyword: any) {
    const menus = this.localCache.getMenu();
    if (menus) {
      this.projects = JSON.parse(menus);
      this.cachePermission();
      this.defaltProject(this._router.url);
    } else {
      this.sidebarService.getProtoEntry().subscribe(
        (protoMessage: any) => {
          this.protoEntry = protoMessage.create(this.entryInit);
          if (keyword) {
            this.bindQueryData(this.protoEntry, { name: keyword });
          }
          this.log('treeDetail query params : ' + JSON.stringify(this.protoEntry));
          this.sidebarService.hasMenu(this.protoEntry, protoMessage).subscribe(
            (protoMsg: any) => {
              this.projects = protoMsg.proto_list;
              this.localCache.saveMenu(this.projects);
              this.cachePermission();
              this.defaltProject(this._router.url);
            },
          );
        }
      );
    }
  }
  /**
   * 缓存操作权限
   */
  cachePermission() {
    const permissionArr: any = [];
    this.projects.forEach((item: any) => {
      this.getPermission(permissionArr, item);
    });
    sessionStorage.permissions = permissionArr;
  }
  getPermission(permissionArr: any, menu: any) {
    if (menu.permission) {
      permissionArr.push(menu.permission);
    }
    if (menu.sub_list) {
      menu.sub_list.forEach((item: any) => {
        this.getPermission(permissionArr, item);
      });
    }
  }
  /**
   * 设置当前刷新路由的位置  并设置当前活动的菜单
   */
  setActiveMenu(menu: any, activeUrl: any) {
    if (menu.href !== '' && activeUrl.indexOf(menu.href) !== -1) {
      this.activeMenu = menu;
      return;
    } else {
      for (const key in menu.sub_list) {
        const m = menu.sub_list[key];
        if (m.href !== '' && activeUrl.indexOf(m.href) !== -1) {
          this.activeMenu = m;
          return;
        }
        this.setActiveMenu(m, activeUrl);
      }
    }
  }
  /**
   * 根据当前刷新的路由   定位模块和菜单
   * @param activeUrl 当前刷新的路由
   */
  defaltProject(activeUrl: any) {
    if (this.projects) {
      if (activeUrl.indexOf('home/index') !== -1) {
        this.selectProject(this.projects[0], false);
      } else {
        for (const key in this.projects) {
          this.setActiveMenu(this.projects[key], activeUrl);
          if (this.activeMenu) {
            this.selectProject(this.projects[key], true);
            return;
          }
        }
        if (!this.activeMenu) {
          //设置成上一次的菜单位置
          const lastMenu = this.sessionCache.getActiveMenu();
          if (lastMenu) {
            for (const key in this.projects) {
              this.setActiveMenu(this.projects[key], lastMenu);
              if (this.activeMenu) {
                this.selectProject(this.projects[key], true, true);
                return;
              }
            }
          }
        }
      }
    }
  }
  /**
   * 加载菜单和指向的页面
   * @param project
   * @param isRefresh  是否手动刷新操作
   * @param isUseCache  如果=true  说明刷新的页面路由在菜单中没有找到位置 使用缓存中保存的上一次路由加载菜单但不跳转页面
   */
  selectProject(project: any, isRefresh: boolean = false, isUseCache: boolean = false) {
    if (project) {
      this.activeMenuList = this.getActiveMenuList(project.sub_list);
      this.selectProjectName = project.name;
      if (this.activeMenuList.length > 0
        // && this._router.url.indexOf('home/index') === -1   //首页没有完成  暂时先注释
      ) {
        if (!isUseCache) {
          if (this.activeMenu && isRefresh &&
            this.activeMenu.href !== '' && this._router.url.indexOf(this.activeMenu.href) !== -1) {
            this.toPage(this.activeMenu, true);
          } else {
            this.toPage(this.activeMenuList[0]); //打开默认页面  后期默认页面通过配置
          }
        }
      }
    } else {
      ToolAlert.waring('用户没有配置菜单');
      history.back();
    }
  }
  /**
   * 获取有效的子菜单列表
   * @param list
   */
  getActiveMenuList(list: any) {
    const retn = [];
    for (let index = 0; index < list.length; index++) {
      const menu = _.cloneDeep(list[index]);
      if (menu.is_show === 1 && menu.sub_list && menu.sub_list.length > 0) {
        menu.sub_list = this.getActiveMenuList(menu.sub_list);
      }
      if (menu.is_show !== 2) {
        retn.push(menu);
      }
    }
    return retn;
  }
  /**
   * 跳转到相应的配置路由
   * @param menu
   * @param isRefresh
   */
  toPage(menu: any, isRefresh: any = false) {
    if (IdTool.isNotEmpty(menu.href)) {
      this.activeMenu = menu;
      if (!isRefresh) {
        this.sessionCache.setActiveMenu(menu.href);
        this._router.navigate([menu.href]);
      }
    } else if (menu.sub_list && menu.sub_list.length > 0) {
      this.toPage(menu.sub_list[0], isRefresh); //打开默认页面  后期默认页面通过配置
    }
  }
  /**
   * 判断这个菜单是否有子集
   * @param menu
   */
  isEmptyMenuList(menu: any) {
    if (!menu.sub_list || menu.sub_list.length === 0) {
      return true;
    } else {
      //子菜单只要有一个可以显示的就是false
      let isEmpty = true;
      menu.sub_list.forEach((item: any) => {
        if (item.is_show === 1) {
          isEmpty = false;
        }
      });
      return isEmpty;
    }
  }
  /**
   * 获取菜单名称，同时处理掉带括号的部分
   * @param menuName
   */
  getMenuName(menuName: any) {
    if (menuName.indexOf('(') !== -1) {
      const name = menuName.substring(0, menuName.indexOf('('));
      return name;
    } else {
      return menuName;
    }
  }
  getClass(menu: any) {
    if (IdTool.isNotEmpty(menu.icon)) {
      return menu.icon;
    } else {
      return 'fa fa-angle-right';
    }
  }
}
