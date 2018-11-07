import { Injectable } from '@angular/core';
import { DyBaseService } from '../../shared/idorp/service/IdBaseService';
import { HttpService } from '../../shared/idorp/service/HttpService';
import { GpbService } from '../../shared/idorp/service/gpb.service';
import { PAGER_INIT } from '../../shared/idorp/config/app.config';

/**
 * demo
 */
@Injectable()
export class DemoService extends DyBaseService {
  count = 1;
  /**
   * 数据接口定义   当只存在一种情况的时候   可以使用api   demo 这边因为有 treetable 例子
   */
  public list_api: any = {
    query: '/idsys/idsysappacount/query',
    add: '/idsys/idsysappacount/add',
    loadByUUID: '/idsys/idsysappacount/',
    update: '/idsys/idsysappacount/update',
    del: '/idsys/idsysappacount/del',
    proto: 'idsys.IdSysAppAcountEntry',  //右边的列表查询接口需要用到的  协议
  };
  public tree_api: any = {

    tree: '/idsys/idsysmenu/tree',
    query: '/idsys/idsysmenu/query',
    add: '/idsys/idsysmenu/add',
    loadByUUID: '/idsys/idsysmenu/',
    update: '/idsys/idsysmenu/update',
    del: '/idsys/idsysmenu/del',
    proto: 'idsys.IdSysMenuEntry',     //左边的树查询接口需要用到的  协议
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
          label: '演示列表',
          is_last: true
        }
      ],
      row_list: [
        {
          item_list: [
            {
              fi_type: 'fi_button_add',
              label: '新增',
              router_link: '/home/demo/form',
            },
            {
              fi_type: 'fi_text',
              key: 'nickname',
              label: '昵称',
              type: 'text',
            },
            {
              fi_type: 'fi_button_search',
              key: 'query',
              label: '查询'
            },
            {
              fi_type: 'fi_button_search_customer',
              key: 'modalForm',
              label: '表单弹框'
            },
            {
              fi_type: 'fi_button_search_customer',
              key: 'modalTable',
              label: '列表弹框'
            },
            {
              fi_type: 'fi_button_search_customer',
              key: 'modallogin',
              label: '登陆弹框'
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
          label: '演示列表',
          router_link: '/home/demo'
        },
        {
          label: '新建',
          is_last: true
        }
      ],
      row_list: [
        {
          item_list: [
            {
              fi_type: 'fi_text',
              key: 'demo_text',
              label: '文本框',
              type: 'text',
              rules: [
                {
                  name: 'required',
                  errorMsg: '必填'
                },
                {
                  name: 'rangeLength',
                  value: [2, 10],
                  errorMsg: '必须2-10位'
                },
                {
                  name: 'customer',
                  errorMsg: '输入666666 通过验证',
                  fun: (v: any) => {
                    if (v === '666666') {
                      return true;
                    } else {
                      return false;
                    }
                  },
                },
              ],
              d_value: '666666',
              desc: '验证统一写在rules标签下面',
            },
            {
              fi_type: 'fi_text',
              key: 'demo_int',
              label: 'int类型',
              type: 'int',
              desc: '可以自定义length 属性,默认9'
            },
            {
              fi_type: 'fi_text',
              key: 'demo_long',
              label: 'long类型',
              type: 'long',
              desc: '可以自定义length 属性,默认18',
              max_value: 10000,
              min_value: 20
            },
            {
              fi_type: 'fi_text',
              key: 'demo_sec',
              label: '时间类型(秒)',
              type: 'sec',
              desc: '可以自定义length'
            },
            {
              fi_type: 'fi_text',
              key: 'demo_min',
              label: '时间类型(分钟)',
              type: 'min',
              desc: '可以自定义length'
            },
            {
              fi_type: 'fi_text',
              key: 'demo_hour',
              label: '时间类型(小时)',
              type: 'hour',
              desc: '可以自定义length'
            },
            {
              fi_type: 'fi_textarea',
              key: 'demo_textArea',
              label: '多行文本',
              type: 'text',
            },
            {
              fi_type: 'fi_text',
              key: 'demo_customer',
              label: 'customer验证',
              type: 'number',
              desc: '不能输入负数,可以为空',
              rules: [
                {
                  name: 'customer',
                  errorMsg: '不能为负数',
                  fun: (v: any) => {
                    console.log('!!!!!v:', v);
                    if (!v) {
                      return true;
                    }
                    if (parseInt(v, 10) >= 0) {
                      return true;
                    } else {
                      return false;
                    }
                  },
                },
              ]
            },
            {
              fi_type: 'fi_select',
              key: 'demo_select',
              label: '下拉框',
              type: 'text',
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
              fi_type: 'fi_keeditor',
              key: 'demo_keeditor',
              label: '副文本框',
              d_value: '你好,副文本框',
              config: {
                needCutImg: true, //是否需要裁剪图片  默认false
              },
              rules: [
                {
                  name: 'required',
                  errorMsg: '必填'
                },
              ],
            },
            {
              fi_type: 'fi_checkbox',
              key: 'demo_checkboxs',
              label: '多选按钮',
              boxType: 1,
              opt_list: [
                {
                  key: {
                    l_id: 1
                  },
                  value: {
                    open_id: '选我1'
                  },
                },
                {
                  key: {
                    l_id: 2
                  },
                  value: {
                    open_id: '选我2'
                  },
                },
              ],
              d_value: 2,
              desc: 'boxType=1显示单行,boxType=2 显示多行'
            },
            {
              fi_type: 'fi_takepoint_map',
              key: 'demo_takepoint',
              label: '地图取点',
              source: 'baidu',
              model: 'map',
              desc: 'source默认baidu可以=qq,model默认从地图选择,也可以input输入形式,经纬度逗号隔开',
            },
            {
              fi_type: 'fi_select_tree',
              key: 'demo_tree',
              label: '选择树',
              selectType: 'radio',
              chkboxType: 'none', //  默认为relate(勾选子节点自动选择父节点)
              config: {
                title: '选择',
                name_key: 'name',
                uuid_key: 'dtc.pt_id.open_id',
                sub_key: 'sub_list',
                last_node: true,
              },
              proto: 'idsys.IdSysMenuEntry',
              request_url: '/idsys/idsysmenu/tree',
              filterJson: this.getFilterJson(),
              d_value: '4444bd04-a8ee-4274-baad-7b0b79cf8a33',
              desc: 'selectType可以是{radio, checkbox} 两种形式, filterJson的过滤查询条件 格式{key:value} 接口统一从q_item_list中获取',
              // rules: [
              //   {
              //     name: 'required',
              //     errorMsg: '必填'
              //   },
              // ],
            },
            {
              fi_type: 'fi_select_table',
              key: 'demo_table',
              label: '选择列表',
              proto: 'idsys.IdSysBankEntry',
              request_url: '/idsys/web/idsysbank/query',
              d_value: '096f6b80-422a-4b6b-919c-21028cbdb0f9',
              filterJson: {},
              desc: 'filterJson的过滤查询条件 格式{key:value} 接口统一从q_item_list中获取',
            },
            {
              fi_type: 'fi_img',
              key: 'demo_upload_img',
              label: '上传图片',
              config: {
                fileSize : 5 * 1024,  //单位KB    默认5M  可以不写
                canUploadCount: 4,  //限制图片的数目  默认为1  可以不写
              },
              disabled: false,
              // fileType: ['png'], //限制图片上传类型
              desc: 'canUploadCount表示最多上传几张图片 默认是1  '
            },
            {
              fi_type: 'fi_file',
              key: 'demo_upload_file',
              label: '上传文件',
              config: {
                fileSize : 5 * 1024,  //单位KB    默认5M  可以不写
                canUploadCount: 4,  //限制图片的数目  默认为1  可以不写
              },
              desc: 'canUploadCount表示最多上传几个文件 默认是1  '
            },
            {
              fi_type: 'fi_time',
              key: 'demo_time',
              label: '选择时间',
              format: 'yyyy-mm-dd',
              desc: 'format表示时间格式 默认是yyyy-mm-dd hh:mm:ss '
            },
            {
              fi_type: 'fi_provincecityarea',
              key: 'demo_ssq',
              label: '省市区',
              desc: '需要sys接口支持'
            },
            {
              fi_type: 'fi_combodate',
              key: 'demo_ssq',
              label: '时分秒',
              // desc: ''
            },
            {
              fi_type: 'fi_select_search',
              key: 'demo_search_select',
              label: '搜索选择框',
              d_value: 2,
              select_width: 200, //select的宽度  默认为200
              // disabled: true,
              opt_list: [
                {
                  key: {
                    l_id: 1
                  },
                  value: {
                    open_id: '选项1'
                  },
                },
                {
                  key: {
                    l_id: 2
                  },
                  value: {
                    open_id: '选项2'
                  },
                },
                {
                  key: {
                    l_id: 12
                  },
                  value: {
                    open_id: '选项12'
                  },
                },
                {
                  key: {
                    l_id: 32
                  },
                  value: {
                    open_id: '选项32'
                  },
                },
              ],
            },
            {
              fi_type: 'fi_img_cut',
              key: 'imgCut',
              label: '裁剪图片',
              disabled: false,
              config: {
                fileSize : 500,  //单位KB
                width: 500,  //裁剪的宽度
                height: 500, //裁剪的高度
                canUploadCount: 2,  //限制图片的数目  默认为1  可以不写
                outFileType: 'jpeg',  //默认为jpeg  可以不写
                isShowOriginBtn: true, //是否显示原图上传按钮  默认为false
              }
            },
          ]
        },
        {
          item_list: [
            {
              fi_type: 'fi_button_search',
              label: '提交',
              // permissoin: 'operate:idsysappacount:update,operate:idsysappacount:add'
            },
            {
              fi_type: 'fi_button_cancel',
              label: '取消',
            },
            {
              fi_type: 'fi_submit_customer',
              key: 'auth',
              label: '表单数据',
              hasValid: true,  //是否需要判断表单验证
              // permissoin: 'operate:idsysappacount:update'
            },
          ]
        }
      ]
    };
    return formData;
  }

  initModalFormData() {
    const formData = {
      f_type: 2,
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
              label: '用户名',
              type: 'text',
              rules: [
                {
                  name: 'required',
                  errorMsg: '必填'
                },
              ]
            },
            {
              fi_type: 'fi_select',
              key: 'user_type',
              label: '用户类型',
              type: 'text',
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
              fi_type: 'fi_text',
              key: 'tel1',
              label: '手机号码1',
              type: 'number',
              rules: [
                {
                  name: 'min',
                  value: 0,
                  errorMsg: '大于0'
                },
              ]
            },
            {
              fi_type: 'fi_text',
              key: 'tel2',
              label: '手机号码2',
              type: 'number',
            },
            {
              fi_type: 'fi_text',
              key: 'tel3',
              label: '手机号码3',
              type: 'number',
            },
            {
              fi_type: 'fi_text',
              key: 'tel4',
              label: '手机号码4',
              type: 'number',
            },
            {
              fi_type: 'fi_text',
              key: 'tel5',
              label: '手机号码5',
              type: 'number',
            },
            {
              fi_type: 'fi_text',
              key: 'tel6',
              label: '手机号码6',
              type: 'number',
            },
            {
              fi_type: 'fi_text',
              key: 'tel7',
              label: '手机号码7',
              type: 'number',
            },
            {
              fi_type: 'fi_text',
              key: 'tel8',
              label: '手机号码8',
              type: 'number',
            },
          ]
        },
        {
          item_list: [
            {
              fi_type: 'fi_button_search',
              label: '提交',
              // permissoin: 'operate:idsysappacount:update'
            },
          ]
        }
      ]
    };
    return formData;
  }

  getFilterJson() {
     return {key: this.count++};
  }

  /**
   * 重写构造方法
   * @param toolGpb 协议服务
   * @param httpService 接口请求服务
   */
  constructor(public httpService: HttpService,
    public toolGpb: GpbService) {
    super(toolGpb, httpService);
  }

}
