import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DyBaseService } from '../../shared/service/IdBaseService';
import { HttpService } from '../../shared/service/HttpService';
import { PAGER_INIT } from '../../shared/config/app.config';
import { IdTool } from '../../shared/tool/IdTool';

/**
 * 系统模块 运营管理人员 服务类
 */
@Injectable()
export class UserService extends DyBaseService {

  /**
   * 数据接口定义
   */
  public api: any = {
    query: '/sys/user/query',
    add: '/sys/user/add',
    detail: '/sys/user/',
    update: '/sys/user/update',
    del: '/sys/user/del',
    personInfo: '/sys/user/personInfo',
    listOpt: '/sys/user/listOpt',
  };
  /**
   * 初始化列表表单数据
   */
  initListData() {
    const formTable = {
      class_name: 'form-horizontal',
      f_type: 1,
      nav_list: [
        {
          label: '首页'
        },
        {
          label: '运营管理员管理',
          is_last: true
        }
      ],
      row_list: [
        {
          item_list: [
            {
              fi_type: 'fi_button_add',
              label: '新增',
              router_link: '/home/user/add',
              permissoin: 'operate:idsysappacount:add'
            },
            {
              fi_type: 'fi_text',
              key: 'nickname',
              label: '名称',
              type: 'text',
            },
            {
              fi_type: 'fi_button_search',
              key: 'query',
              label: '查询'
            },
          ]
        }
      ],
      pager: PAGER_INIT
    };
    return formTable;
  }

  /**
   * 初始化新增修改表单数据
   */
  initFormData() {
    const formData = {
      class_name: 'form-horizontal',
      f_type: 2,
      nav_list: [
        {
          label: '首页'
        },
        {
          label: '管理员列表',
          router_link: '/home/user'
        },
        {
          label: '运营管理员',
          is_last: true
        }
      ],
      row_list: [
        {
          item_list: [
            {
              fi_type: 'fi_text',
              key: 'username',
              label: '帐号',
              type: 'text',
              rules: [
                {
                  name: 'required',
                  errorMsg: '必填'
                },
                {
                  name: 'rangeLength',
                  value: [2, 10],
                  errorMsg: '帐号必须2-10位'
                }
              ]
            },
            {
              fi_type: 'fi_text',
              key: 'nickname',
              label: '名称',
              type: 'text',
              rules: [
                {
                  name: 'required',
                  errorMsg: '必填'
                },
              ]
            },
            {
              fi_type: 'fi_text',
              key: 'password',
              label: '密码',
              type: 'password',
            },
            {
              fi_type: 'fi_select',
              key: 'user_type',
              label: '用户类型',
              opt_list: [
                {
                  key: {
                    l_id: 1
                  },
                  value: {
                    open_id: '超级管理员'
                  },
                },
                {
                  key: {
                    l_id: 2
                  },
                  value: {
                    open_id: '一般管理员'
                  },
                },
              ],
              d_value: 2,
              rules: [
                {
                  name: 'required',
                  errorMsg: '必填'
                },
              ]
            },
            {
              fi_type: 'fi_select',
              key: 'sys_user_uuid',
              label: '用户角色',
            },
          ]
        },
        {
          item_list: [
            {
              fi_type: 'fi_button_search',
              label: '提交',
              permissoin: 'operate:idsysappacount:update'
            },
            {
              fi_type: 'fi_button_cancel',
              label: '取消',
              // router_link: '/home/user'
            }
          ]
        }
      ]
    };
    return formData;
  }


  /**
   * 运营平台个人信息
   * @param entry
   * @param protoMessage
   */
  personInfo(entry: any): Observable<any> {
    return Observable.create((observer: any) => {
      this.httpService.httpRequest(this.api.personInfo, entry).subscribe(
        (message: any) => observer.next(message),
        (error: any) => observer.error(error)
      );
    });
  }


  /**
   * 加载用户列表
   * @param entry
   * @param protoMessage
   */
  listOpt(entry: any): Observable<any> {
    return Observable.create((observer: any) => {
      this.httpService.httpRequest(this.api.listOpt, entry).subscribe(
        (message: any) => observer.next(message),
        (error: any) => observer.error(error)
      );
    });
  }


  /**
   * 初始化用户列表
   * @param callback
   * @param filterData
   */
  initOptList(callback: any, filterData: any) {
    //加载用户类型列表详情
    const optProto = this.entryInit;
    if (filterData) {
      IdTool.bindQueryData(optProto, filterData);
    }
    this.log(' userType initOptList query  : ' + JSON.stringify(optProto));
    this.listOpt(optProto).subscribe(
      (protoMsg: any) => {
        console.log('!!!!!protoMsg:', protoMsg);
        if (protoMsg && protoMsg.proto_list) {
          const proto_list: any[] = [];
          for (let i = 0; i < protoMsg.proto_list.length; i++) {
            proto_list.push({
              key: {
                l_id: IdTool.getJson(protoMsg.proto_list[i], 'uuid'),
              },
              value: {
                open_id: IdTool.getJson(protoMsg.proto_list[i], 'username', '')
              }
            });
          }
          callback(proto_list);
        }
      },
    );
  }

  /**
   * 重写构造方法
   * @param toolGpb 协议服务
   * @param httpService 接口请求服务
   */
  constructor(public httpService: HttpService,
  ) {
    super(httpService);
  }

}
