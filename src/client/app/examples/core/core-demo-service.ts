import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToolGpbService, ToolHttpService } from '../../shared/tool/index';

import { SERVER_URL, USER_BASE_URL, USER_LOGIN, USER_CODE } from '../../shared/config/env_qz.config';
import {
    DEPT_BASE_URL,
    DEPT_Tree,
    DEPT_ADD,
    DEPT_DELETE,
    DEPT_DETAIL,
    DEPT_UPDATE,
    DEPT_ALL_BYCID
  } from '../../shared/config/env_qz.config';
import { DyBaseService } from '../../shared/dy-service/DyBaseService';

@Injectable()
export class CoreDemoService extends DyBaseService {
    random: any = 1;

    /**
     * 数据接口定义
     */
    public interface_url: any = {
        base: DEPT_BASE_URL,
        list: DEPT_Tree,
        add: DEPT_ADD,
        delete: DEPT_DELETE,
        detail: DEPT_DETAIL,
        update: DEPT_UPDATE
      };

      public index_parame: any = {
        text: '',
        url: ''
      };

      public add_parame: any = {
        text: '',
        url: ''
      };

      public update_parame: any = {
        text: '',
        url: ''
      };

      public query_parame: any = {
        text: '',
        url: ''
      };

      public list_parame: any = {
        text: '',
        url: null
      };

      public common_row_list: any = [
        {
          item_list: [
            {
              fi_type: 1,
              key: 'name',
              label: this.toolGpb.geti18n('depart_name', '部门名称'),
              type: 'text'
            }
          ]
        }
      ];

    /**
     * 重写构造方法
     * @param _router 路由服务
     * @param toolHttp 接口请求服务
     * @param toolGpb 协议服务
     */
    constructor(public _router: Router,
        public toolHttp: ToolHttpService,
        public toolGpb: ToolGpbService) {
        super(_router, toolHttp, toolGpb);
    }

    /**
     * 生成验证码
     */
    getCaptcha() {
        return SERVER_URL + USER_BASE_URL + USER_CODE + '/' + this.toolHttp.session + '?' + (this.random++);
    }

    /**
     * 登陆 测试帐号 admin / 123456
     * @param userEntry 提交参数
     * @param protoMessage 协议类型
     */
    login(userEntry: any, protoMessage: any): Observable<any> {
        //添加 sessionId
        this.toolHttp.addSessionId(userEntry);
        return this.toolHttp.ajaxJson2(userEntry, (USER_BASE_URL + USER_LOGIN), protoMessage);
    }

    /**
     * 列表页面表单数据源
     */
    // getListData(): Observable<any> {
    //     this.toolGpb.getIForm();
    //     const formTable = new IForm({});
    //     return formTable;
    // }

    /**
     * 列表查询演示
     * @param entry 协议实例对像
     * @param protoMessage 协议对像
     */
    list(entry: any, protoMessage: any): Observable<any> {
        return this.toolHttp.ajaxJson2(entry, this.interface_url.base + this.interface_url.list, protoMessage);
    }

    /**
     * 数据保存演示
     * @param entry 协议实例对像
     * @param protoMessage 协议对像
     */
    save(entry: any, protoMessage: any): Observable<any> {
        return this.toolHttp.ajaxJson2(entry, this.interface_url.base + this.interface_url.add, protoMessage);
    }

    /**
     * 数据详情查询演示
     * @param entry 协议实例对像
     * @param protoMessage 协议对像
     */
    detail(entry: any, protoMessage: any): Observable<any> {
        return this.toolHttp.ajaxJson2(entry, this.interface_url.base + this.interface_url.detail, protoMessage);
    }

    /**
     * 数据更新演示
     * @param entry 协议实例对像
     * @param protoMessage 协议对像
     */
    update(entry: any, protoMessage: any): Observable<any> {
        return this.toolHttp.ajaxJson2(entry, this.interface_url.base + this.interface_url.update, protoMessage);
    }

    /**
     * 数据删除演示
     * @param entry 协议实例对像
     * @param protoMessage 协议对像
     */
    del(entry: any, protoMessage: any): Observable<any> {
        return this.toolHttp.ajaxJson2(entry, this.interface_url.base + this.interface_url.delete, protoMessage);
    }
}
