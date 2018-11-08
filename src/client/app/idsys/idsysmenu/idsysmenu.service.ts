import { IDCONF } from './../../shared/idorp/config/app.config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DyBaseService } from '../../shared/idorp/service/IdBaseService';
import { HttpService } from '../../shared/idorp/service/HttpService';
import { GpbService } from '../../shared/idorp/service/gpb.service';

/**
 * 系统模块 菜单配置 服务类
 */
@Injectable()
export class IdSysMenuService extends DyBaseService  {

    /**
     * 数据接口定义
     */
    public api: any = {
        query: '/idsys/idsysmenu/query',
        add: '/idsys/idsysmenu/add',
        detail: '/idsys/idsysmenu/',
        update: '/idsys/idsysmenu/update',
        del: '/idsys/idsysmenu/del',
        tree: '/idsys/idsysmenu/tree',
        bind: '/idsys/idsysmenu/bindMenu',
        selectMenu: '/idsys/idsysmenu/selectMenu',
        proto: 'idsys.IdSysMenuEntry'
      };


    /**
     * 重写构造方法
     * @param toolGpb 协议服务
     * @param httpService 接口请求服务
     */
    constructor(public httpService: HttpService,
        public toolGpb: GpbService) {
        super(toolGpb, httpService);
    }

    /**
     * 查询弹框数
     * @param entry 协议实例对像
     * @param protoMessage 协议对像
     */
    modalTree(entry: any, protoMessage: any): Observable<any> {
        return Observable.create((observer: any) => {
            this.httpService.httpRequest(this.api.base + this.api.selectMenu, entry, protoMessage).subscribe(
                (message: any) => observer.next(message),
                (error: any) => observer.error(error)
            );
        });
    }
    bind(entry: any, protoMessage: any): Observable<any> {
      return Observable.create((observer: any) => {
          this.httpService.httpRequest(this.api.base + this.api.bind, entry, protoMessage).subscribe(
              (message: any) => observer.next(message),
              (error: any) => observer.error(error)
          );
      });
  }

    initFormData() {
        const formData = {
            class_name: 'form-horizontal',
            f_type: 2,
            nav_list: [
              {
                label: '首页'
              },
              {
                label: '菜单管理',
                router_link: '/home/sys/role/list'
              },
              {
                label: '新增',
                is_last: true
              }
            ],
            row_list: [
              {
                item_list: [
                  {
                    fi_type: 'fi_text',
                    key: 'name',
                    label: '菜单名称',
                    type: 'text',
                    class_name: 'm-wrap span10',
                    group_class_name: 'span6',
                    rules: [
                      {
                        name : 'required',
                        errorMsg: '必填'
                      }
                    ]
                  },
                  {
                    fi_type: 'fi_text',
                    key: 'sort',
                    label: '排序',
                    type: 'text',
                    class_name: 'm-wrap span10',
                    group_class_name: 'span6',
                    rules: [
                      {
                        name : 'required',
                        errorMsg: '必填'
                      },
                    ]
                  },
                  {
                    fi_type: 'fi_select',
                    key: 'is_show',
                    label: '是否显示',
                    d_value: 1,
                    type: 'text',
                    opt_list: [
                      {
                        key: {
                          l_id: 1
                        },
                        value: {
                          open_id: '显示'
                        }
                      },
                      {
                        key: {
                          l_id: 2
                        },
                        value: {
                          open_id: '不显示'
                        },
                      }
                    ],
                    rules: [
                        {
                          name : 'required',
                          errorMsg: '必填'
                        }
                      ],
                  },
                  {
                    fi_type: 'fi_select',
                    key: 'is_admin',
                    label: '超级管理员显示',
                    d_value: 1,
                    type: 'text',
                    opt_list: [
                      {
                        key: {
                          l_id: 1
                        },
                        value: {
                          open_id: '显示'
                        }
                      },
                      {
                        key: {
                          l_id: 2
                        },
                        value: {
                          open_id: '不显示'
                        },
                      }
                    ],
                    rules: [
                        {
                          name : 'required',
                          errorMsg: '必填'
                        }
                      ]
                  },
                  {
                    fi_type: 'fi_text',
                    key: 'icon',
                    label: '图标样式',
                    type: 'text',
                  },
                  {
                    fi_type: 'fi_text',
                    key: 'permission',
                    label: '权限标识',
                    type: 'text',
                  },
                  {
                    fi_type: 'fi_text',
                    key: 'href',
                    label: '页面链接',
                    type: 'text',
                  },
                  {
                    fi_type: 'fi_text',
                    key: 'api_url',
                    label: 'API路由',
                    type: 'text',
                  },
                ]
              },
              {
                item_list: [
                  {
                    fi_type: 'fi_submit',
                    label: '提交'
                  },
                ]
              }
            ]
          };
      return formData;
    }
}
