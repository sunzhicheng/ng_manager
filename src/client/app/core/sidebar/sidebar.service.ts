import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToolHttpService, ToolGpbService } from '../../shared/tool/index';
import { ROLE_BASE_URL, ROLE_MENU } from '../../shared/config/env_qz.config';

@Injectable()
export class SidebarService {


  constructor(private _router: Router,
    private toolHttp: ToolHttpService,
    private toolGpbService: ToolGpbService) {
  }

  /**
   * 查询权限菜单
   * @param sysUserEntry 协议实例
   * @param protoMessage 协议对像
   */
  querySidebar(sysUserEntry: any, protoMessage: any): Observable<any> {
     // console.log('SidebarService querySidebar start');
    // let SysUserEnty = this.toolGpbService.getSysUserEntry();
    // var userEntry = new SysUserEnty();
    // this.toolHttp.addAccToken(userEntry);
    // return this.toolHttp.postToServer_obj(userEntry, (ROLE_BASE_URL + ROLE_MENU));
    return this.toolHttp.ajaxJson2(sysUserEntry, (ROLE_BASE_URL + ROLE_MENU), protoMessage);
  }
}

