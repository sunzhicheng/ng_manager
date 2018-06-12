import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToolGpbService } from '../../shared/tool/tool-gpb.service';
import { ToolHttpService } from '../../shared/tool/tool-http.service';

/**
 * luyu
 * 后台功能模块基类
 */
export class DyBaseService {

  public PM_FIX_OBJ: any = {pager: {pm: 1}};

  /**
   * 接口访问地址配置
   * @type {{base: string, list: string, add: string, delete: string, detail: string, update: string}}
     */
  public interface_url: any = {
    base: '',
    list: '',
    add: '',
    delete: '',
    detail: '',
    update: ''
  };

  /**
   * 主页参数配置
   * @type {{text: string, url: string}}
     */
  public index_parame: any = {
    text: '',
    url: ''
  };

  /**
   * 添加功能参数配置
   * @type {{text: string, url: string}}
     */
  public add_parame: any = {
    text: '',
    url: ''
  };

  /**
   * 更新功能参数配置
   * @type {{text: string, url: string}}
     */
  public update_parame: any = {
    text: '',
    url: ''
  };

  /**
   * 详情功能参数配置
   * @type {{text: string, url: string}}
     */
  public query_parame: any = {
    text: '',
    url: ''
  };

  /**
   * 列表查询参数配置
   * @type {{text: string, url: string}}
     */
  public list_parame: any = {
    text: '',
    url: ''
  };

  /**
   * 是否显示面包学
   * @type {boolean}
     */
  public breadcrumb = true;

  /**
   * 是否显示搜索栏
   * @type {boolean}
     */
  public searchPart = true;

  /**
   * 是否保留取消按钮
   * @type {boolean}
     */
  public iscancel = true;

  /**
   *
   *表单项配置
   */
  public common_row_list: any = [
    // {
    //   item_list: [
    //     {
    //       fi_type: 1,
    //       key: 'name',
    //       label: '商品名称',
    //       type: 'text',
    //       // class_name: 'm-wrap span10',
    //       // group_class_name: 'span6',
    //       is_require: true
    //     },
    //     {
    //       fi_type: 1,
    //       key: 'short_desc',
    //       label: '商品简介',
    //       type: 'text',
    //       is_require: true
    //     },
    //     {
    //       fi_type: 1,
    //       key: 'desc',
    //       label: '商品描述',
    //       type: 'text',
    //       is_require: true
    //     },
    //     {
    //       fi_type: 1,
    //       key: 'origin_price',
    //       label: '商品价格',
    //       type: 'text',
    //       is_require: true
    //     },
    //     {
    //       fi_type: 1,
    //       key: 'real_price',
    //       label: '商品买出价',
    //       type: 'text',
    //       is_require: true
    //     },
    //     {
    //       fi_type: 1,
    //       key: 'total_count',
    //       label: '商品库存',
    //       type: 'text',
    //       is_require: true
    //     },
    //     {
    //       fi_type: 1,
    //       key: 'min_buy_count',
    //       label: '最小单次可购买数量',
    //       type: 'text',
    //       is_require: true
    //     }
    //   ]
    // },
    // {
    //   item_list: [
    //     {
    //       fi_type: 2,
    //       key: 's_status',
    //       label: '商品状态',
    //       opt_list: [
    //         {
    //           key: {
    //             l_id: 0
    //           },
    //           value: {
    //             open_id: '全部'
    //           },
    //           selected: true
    //         },
    //         {
    //           key: {
    //             l_id: 1
    //           },
    //           value: {
    //             open_id: '上架'
    //           }
    //         }
    //       ],
    //       select_id: { l_id: 0 }
    //     }
    //   ]
    // },
  ];

  constructor(public _router: Router,
              public toolHttp: ToolHttpService,
              public toolGpb: ToolGpbService) {
  }

  // 列表页面数据源
  getListData() {
    console.log('未实现getListData');
    // let IForm = this.toolGpb.getIForm();
    // let formTable = new IForm({
    //   // class_name: 'form-horizontal',
    //   f_type: 1,
    //   nav_list: [
    //     {
    //       label: '工作区',
    //       router_link:'/home/index'
    //     },
    //     {
    //       label: '商品列表',
    //       is_last: true
    //     }
    //   ],
    //   row_list: [
    //     {
    //       item_list: [
    //         {
    //           fi_type: 8,
    //           label: '新增',
    //           router_link: this.add_parame.url
    //         },
    //         {
    //           fi_type: 1,
    //           key: 'name',
    //           label: '商品名称',
    //           type: 'text'
    //           // is_require: true
    //         },
    //         {
    //           fi_type: 2,
    //           key: 's_status',
    //           label: '商品状态',
    //           opt_list: [
    //             {
    //               key: {
    //                 l_id: 0
    //               },
    //               value: {
    //                 open_id: '全部'
    //               },
    //               selected: true
    //             },
    //             {
    //               key: {
    //                 l_id: 1
    //               },
    //               value: {
    //                 open_id: '上架'
    //               }
    //             }
    //           ],
    //           select_id: { l_id: 0 }
    //         },
    //         {
    //           fi_type: 6,
    //           label: '查询'
    //         }
    //       ]
    //     }
    //   ],
    //   fun_list: [
    //     {
    //       item_list: [
    //         {
    //           label: this.add_parame.text,
    //           router_link: this.add_parame.url
    //         }
    //       ]
    //     }
    //   ],
    //   table: {
    //     pager: {}
    //   }
    // });
    // return formTable;
  }

  //表单数据转成协议格式
  formDataTransform(formValue: any) {
    console.log('未实现formDataTransform');
    // formValue.origin_price = parseInt(formValue.origin_price);
    // formValue.real_price = parseInt(formValue.real_price);
    // formValue.total_count = parseInt(formValue.total_count);
    // formValue.min_buy_count = parseInt(formValue.min_buy_count);
  }

  // 数据插入表单中
  public bindFormDateFromProto(formGroup: FormGroup, formData: any, entry: any) {
    console.log('未实现bindFormDateFromProto');
    // let pro = entry.pro;
    // formGroup.reset({
    //   name: { value: pro.name, disabled: false },
    //   short_desc: pro.short_desc,
    //   desc: pro.desc,
    //   origin_price:pro.origin_price||0,
    //   real_price:pro.real_price||0,
    //   total_count:pro.total_count||0,
    //   min_buy_count:pro.min_buy_count||0,
    //   s_status:pro.s_status
    // });
  }

  // 对于多选情况需要手动处理一下值的转换
  // bindListQueryMuti(formData: any, companyEnty: any) {
  //   // console.log('SysComapanyService bindListQueryMuti formData : ' , formData);
  //   // 状态多选, 和getListData数据格式一致
  //   let stItem = formData.row_list[1].item_list[0];
  //   stItem.opt_list.forEach((opt: any) => {
  //     if (opt.selected) {
  //       companyEnty.q_ext.st_list.push(opt.key);
  //     }
  //   });
  // }

  /**
   * 增改查获取数据
   * @param btn_row
   * @param model  1增 2改 3查
   * @returns {any}
   */
  getCommonData(btn_row: any, model: number) {
    // var row_list = [].concat(this.common_row_list);
    const row_list = this.toolHttp.clone(this.common_row_list);
    if (model === 3) {
      for (const i in row_list) {
        for (const j in row_list[i].item_list) {
          row_list[i].item_list[j].disabled = true;
        }
      }
    }
    if (btn_row) {
      row_list.push(btn_row);
    }

    let current_text: any;
    switch (model) {
      case 1: current_text = this.add_parame.text; break;
      case 2: current_text = this.update_parame.text; break;
      case 3: current_text = this.query_parame.text; break;
    }

    // let IForm = this.toolGpb.getIForm();
    // let formTable = new IForm({
    //   // class_name: 'form-horizontal',
    //   f_type: 2,
    //   nav_list: [
    //     {
    //       label: this.index_parame.text,
    //       router_link:this.index_parame.url
    //     },
    //     {
    //       label: this.list_parame.text,
    //       router_link: this.list_parame.url
    //     },
    //     {
    //       label: current_text,
    //       is_last: true
    //     }
    //   ],
    //   row_list: row_list
    // });
    const formTable = {
      // class_name: 'form-horizontal',
      f_type: 2,
      nav_list: [
        {
          label: this.index_parame.text,
          router_link: this.index_parame.url
        },
        {
          label: this.list_parame.text,
          router_link: this.list_parame.url
        },
        {
          label: current_text,
          is_last: true
        }
      ],
      row_list: row_list
    };
    return formTable;
  }

  // 新增表单数据
  getAddData() {
    const btn_row: any =  {
      item_list: [
        {
          fi_type: 6,
          label: '提交'
        },
        {
          fi_type: 7,
          label: '取消',
          router_link: this.list_parame.url
        }
      ]
    };
    return this.getCommonData(btn_row, 1);
  }

  getUpdateData() {
    const btn_row: any =  {
      item_list: [
        {
          fi_type: 6,
          label: '提交'
        }
      ]
    };
    if (this.iscancel) {
      btn_row.item_list.push(
        {
          fi_type: 7,
          label: '取消',
          router_link: this.list_parame.url
        }
      );
    }
    return this.getCommonData(btn_row, 2);
  }

  getQueryData() {
    const btn_row: any =  {
      item_list: [
        {
          fi_type: 7,
          label: '返回',
          router_link: this.list_parame.url
        }
      ]
    };
    return this.getCommonData(btn_row, 3);
  }

  getItemByName(key: string) {
    for (const i in this.common_row_list) {
      for ( const j in this.common_row_list[i].item_list) {
        const item: any =  this.common_row_list[i].item_list[j];
        if (item.key === key) {
          return item;
        }
      }
    }
  }

  /**
   * 设置item的内容
   * @param key
   * @param data
     */
  setItem(key: any, data: any, formdata: any) {
    let it: any ;
    for (const i in formdata.row_list) {
      for ( const j in formdata.row_list[i].item_list) {
        const item: any =  formdata.row_list[i].item_list[j];
        if (item.key === key) {
          it = item;
        }
      }
    }
    if (it) {
      for (const att in data) {
        it[att] = data[att];
      }
    }
  }

  /**
   * 协议转成表单数据格式(多选按钮)
   * @param key
   * @param proto_arr
   * @returns {any}
     */
  protoToFormTypeCheckbox(key: string, proto_arr: any): any {
    const item: any = this.getItemByName(key);
    const res: any = {};
    for (const i in item.opt_list) {
      const opt_item: any = item.opt_list[i];
      //默认为未选中
      res[key + '_' + opt_item.key.l_id] = false;
      for (const j in proto_arr) {
        if (opt_item.key.l_id === proto_arr[j]) {
          res[key + '_' + opt_item.key.l_id] = true;
        }
      }
    }
    return res;
  }

  /**
   * 多选按钮控件取值  返回数据形式(适用于枚举类型)
   * @param key
   * @param formValue
     */
  checkboxToArr(key: string, formValue: any): any {
    const res: any = [];
    for (const i in this.getItemByName(key).opt_list) {
      const item: any = this.getItemByName(key).opt_list[i];
      const opt_str: string = key + '_' + item.key.l_id;
      if (formValue[opt_str]) {
        res.push(item.key.l_id);
      }
    }
    return res;
  }

  /**
   * 列表查询
   * @param entry 协议实例
   * @param protoMessage 协议对像
   */
  list(entry: any, protoMessage: any): Observable<any> {
    return this.toolHttp.ajaxJson2(entry, this.interface_url.base + this.interface_url.list, protoMessage);
  }

  /**
   * 数据保存
   * @param entry 协议实例
   * @param protoMessage 协议对像
   */
  save(entry: any, protoMessage: any): Observable<any> {
    return this.toolHttp.ajaxJson2(entry, this.interface_url.base + this.interface_url.add, protoMessage);
  }

  /**
   * 数据详情
   * @param entry 协议实例
   * @param protoMessage 协议对像
   */
  detail(entry: any, protoMessage: any): Observable<any> {
    return this.toolHttp.ajaxJson2(entry, this.interface_url.base + this.interface_url.detail, protoMessage);
  }

  /**
   * 数据更新
   * @param entry 协议实例
   * @param protoMessage 协议对像
   */
  update(entry: any, protoMessage: any): Observable<any> {
    return this.toolHttp.ajaxJson2(entry, this.interface_url.base + this.interface_url.update, protoMessage);
  }

  /**
   * 数据删除
   * @param entry 协议实例
   * @param protoMessage 协议对像
   */
  del(entry: any, protoMessage: any): Observable<any> {
    return this.toolHttp.ajaxJson2(entry, this.interface_url.base + this.interface_url.delete, protoMessage);
  }


}

