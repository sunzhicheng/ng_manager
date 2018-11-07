import { AfterContentChecked, ElementRef, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { DyBaseService } from '../service/IdBaseService';
import { BaseComponent } from './BaseComponent';
import { PromptUtil } from '../providers/PromptUtil';
import { PAGER_INIT, APISOURCE } from '../config/app.config';
/**
 * 列表组件基类
 */
export abstract class ListBaseComponent extends BaseComponent implements OnInit, AfterContentChecked {
    //重新命名该属性的时候   必须保证相应的子service 有相应的方法
    method_list_query: any = 'query';
    method_list_del: any = 'del';
    method_list_enable: any = 'enable';
    method_list_save: any = 'save';
    method_list_detail: any = 'detail';
    /**
     * 列表FormData
     */
    listFormData: any;
    opt_config: any = { isopt: true, view: false, update: true, del: true, enable: false };
    /**
     * 组件协议对像数据
     */
    listEntry: any = this.entryInit;
    constructor(protected listServ: DyBaseService | any,
        protected eleRef: ElementRef,
    ) {
        super();
    }
    ngOnInit() {
        this.initList();
    }
    abstract myInit(): void;
    /**
     * 添加统一样式
     * @param c
     */
    addDefaultClass(c?: string) {
        if (c !== null) {
            this.eleRef.nativeElement.className = c || 'vbox';
        }
    }

    beforeQuery(listEntry: any) {
        return listEntry;
    }
    query() {
        if (!this.listFormData) {
            return;
        }
        if (!this.hasMethod(this.listServ, this.method_list_query)) {
            return;
        }
        if (!this.listEntry) {
            this.listEntry = this.entryInit;
        }
        if (!this.listEntry.pager) {
            this.listEntry.pager = PAGER_INIT;
        }
        //清楚原来的数据
        if (this.listEntry.pager.ext) {
            this.listEntry.pager.ext.row = undefined;
            this.listEntry.pager.ext.heads = undefined;
        }
        this.listEntry = this.beforeQuery(this.listEntry);
        if (!this.listEntry) {
            console.error('query()错误: beforeQuery 的返回值 为null ');
            return;
        }
        this.log('query brefore : ', this.listEntry);
        this.listServ[this.method_list_query](this.listEntry, APISOURCE.LIST).subscribe(
            (protoMsg: any) => {
                this.listFormData.pager = protoMsg.pager;
                this.listEntry = protoMsg;
                this.log('query result : ', this.listEntry);
            },
            (error: any) => console.error(error)
        );
    }
    /**
     * 查询列表
     * @param data
     */
    listSubmit(data: any) {
        this.log('查询参数 :' + JSON.stringify(data));
        this.bindQueryData(this.listEntry, data, true);
        this.query();
    }
    /**
     * 列表加载
     */
    loadData(pager: any) {
        this.listEntry.pager = pager;
        if (this.listServ) {
            this.query();
        }
    }
    /**
     * 删除该条数据
     * @param uuid  存在格式： { query: { uuid: uuid } };
     */
    del(uuid: any) {
        if (!this.hasMethod(this.listServ, this.method_list_del)) {
            return;
        }
        PromptUtil.confirm('确认要删除吗？', () => {
            const entry = { query: { uuid: uuid } };
            this.listServ[this.method_list_del](entry, APISOURCE.LIST).subscribe((result: any) => {
                PromptUtil._success();
                this.loadData(this.listEntry.pager);
            });
        });
    }
    /**
     * 启用该条数据
     * @param uuid  存在格式： { query: { uuid: uuid } };
     */
    enable(uuid: any) {
        if (!this.hasMethod(this.listServ, this.method_list_enable)) {
            return;
        }
        PromptUtil.confirm('确认要启用吗？', () => {
            const entry = { query: { uuid: uuid } };
            this.bindQueryData(entry, { sql_status: 1 });
            this.listServ[this.method_list_enable](entry, APISOURCE.LIST).subscribe((result: any) => {
                PromptUtil._success();
                this.loadData(this.listEntry.pager);
            });
        });
    }

    /**
     * 停用该条数据
     * @param uuid  存在格式： { query: { uuid: uuid } };
     */
    stop(uuid: any) {
        if (!this.hasMethod(this.listServ, this.method_list_enable)) {
            return;
        }
        PromptUtil.confirm('确认要禁用吗？', () => {
            const entry = { query: { uuid: uuid } };
            this.bindQueryData(entry, { sql_status: 2 });
            this.listServ[this.method_list_enable](entry, APISOURCE.LIST).subscribe((result: any) => {
                PromptUtil._success();
                this.loadData(this.listEntry.pager);
            });
        });
    }


    unbind(uuid: any) {
        this.log('父类空方法 unbind uuid : ' + uuid);
    }
    bind(uuid: any) {
        this.log('父类空方法 bind uuid : ' + uuid);
    }
    update(uuid: any) {
        this.log('父类空方法 update uuid : ' + uuid);
    }
    view(uuid: any) {
        this.log('父类空方法 view uuid : ' + uuid);
    }
    getAllCheckedV(uuids: any) {
        this.log('父类空方法 getAllCheckedV uuids : ' + uuids);
    }
    /**
     * 如果返回详情页面回来则刷新数据
    */
    ngAfterContentChecked() {
        if (this.listServ && this.listServ.isReLoad) {
            this.listServ.isReLoad = false;
            this.query();
        }
    }
    /**
     * formData 初始化完成操作
     */
    protected initComplete() {
        if (!this.listFormData) {
            console.error('initComplete错误: listFormData属性为null');
            return;
        }
        this.listFormData.complete = true;
    }
    private initList() {
        //给子类加载 formData属性
        this.myInit();
        //设置默认样式
        this.addDefaultClass();
        //加载数据
        this.query();
        //通知组件formData已经初始化完成
        this.initComplete();
    }
}
