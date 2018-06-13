import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreDemoService } from './core-demo-service';
import { ToolGpbService, ToolHttpService } from '../../shared/tool/index';

import { TOKEN_INIT } from '../../shared/config/env_qz.config';

import { TreeTableComponent } from '../../core/tree-table/tree-table';

declare const $: any;

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
    isLogin = true;

    @ViewChild(TreeTableComponent)
    public treeTable: TreeTableComponent;

    //树配置
    public config: any = {
      title: this.toolGpb.geti18n('department', '部门'),
      rootCreate: true,
      showhead: true,
      useform: true
    };

    //树按钮
    public tree_setting: any = {
      selectedMulti: false, //是否可多选
      addBtn: true, //增加按钮
      editBtn: true,
      deleteBtn: true
    };

    //树数据
    tree_data: any;

    treeFormData_add: any;
    treeFormData_edit: any;

    spProEntry: any;
    formData: any;
    pageNo = 1;
    opt_config: any = {isopt: true, unbind: true};

    SysCompanyEntry: any;
    SysUserEntry: any;

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

        // 演示 tree table 相关组件
        //this.initTreeTableSource();
    }

    /**
     * 初始 tree table 相关组件
     */
    initTreeTableSource() {
        const index_cmp: any = $('sd-department-list');
        index_cmp.addClass('vbox');
        this.toolGpb.getIForm((protoMessage: any) => {
            this.formData = protoMessage.create({});
            console.log('initTreeTableSource this.formData : ', this.formData);
            this.toolGpb.getSysCompanyEntry((protoMessage: any) => {
                this.SysCompanyEntry = protoMessage;
                this.initData();
            });
        });
        this.treeFormData_add = this.coreDemoService.getAddData();
        this.treeFormData_edit = this.coreDemoService.getUpdateData();

        this.toolGpb.getSysUserEntry((protoMessage: any) => {
            this.SysUserEntry = protoMessage;
        });

    }

    /**
     * 初始 tree table 数据
     */
    initData() {
        this.treequery();
    }

    /**
     * 公司数据查询演示
     */
    treequery() {
        const entry: any = this.SysCompanyEntry.create();
        this.coreDemoService.list(entry, this.SysCompanyEntry)
          .subscribe((companyEntry: any) => this.treequery_callback(companyEntry));
    }

    /**
     * 公司数据查询回调处理
     * @param entry companyEntry
     */
    treequery_callback(entry: any) {
        console.log(entry);
        if (entry.token.ex) {
          this.toolHttp._error(entry.token.ex.ex_tips);
        } else {
          const dep_list: any = entry.dep_list;
          const tree_arr: any = [];
          for (const i in dep_list) {
            const item: any = dep_list[i];
            const node: any = {
              id: parseInt(item.pt_id.l_id, 10),
              // pId:item.super_category.pt_id.l_id,
              name: item.name,
              isParent: true
            };
            tree_arr.push(node);
            this.getsubItem(item, tree_arr);
          }
          this.tree_data = tree_arr;
        }
    }

    /**
     * 树形子节点数据封装
     * @param superItem 父节点
     * @param tree_arr 子节点数据
     */
    getsubItem(superItem: any, tree_arr: any) {
        if (superItem.dep_list && superItem.dep_list.length > 0) {
          for (const i in superItem.dep_list) {
            const it: any = superItem.dep_list[i];
            const node: any = {
              id: parseInt(it.pt_id.l_id, 10),
              pId: parseInt(superItem.pt_id.l_id, 10),
              name: it.name
            };
            tree_arr.push(node);
            this.getsubItem(it, tree_arr);
          }
        }
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
        console.log('sessionCallback message : ', user);
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
            this.isLogin = true;

            // 演示 tree table 相关组件
            this.initTreeTableSource();
        }
    }
}
