import { AfterContentChecked } from '@angular/core';
import * as _ from 'lodash';
import { DyBaseService } from '../service/IdBaseService';
import { IdorpBaseComponent } from './IdorpBaseComponent';
import { PromptUtil } from '../providers/PromptUtil';
/**
 * 列表组件基类
 */
export class IdorpListComponent extends IdorpBaseComponent implements AfterContentChecked {
    //重新命名该属性的时候   必须保证相应的子service 有相应的方法
    queryMethod: any = 'query';
    delMethod: any = 'del';
    enableMethod: any = 'enable';
    /**
     * 列表表单数据
     */
    formData: any;
    opt_config: any = { isopt: true, view: false, update: true, del: true, enable: false };

    constructor(public service: DyBaseService | any) {
        super();
    }
    beforeQuery() {
        this.log('父类空方法 用于封装查询条件 供子类实现 ');
    }
    query() {
        if (!this.formData) {
            return;
        }
        if (!this.hasMethod(this.service, this.queryMethod)) {
            return;
        }

        this.service.getProtoEntry().subscribe(
            (protoMessage: any) => {
                if (!this.protoEntry) {
                    this.protoEntry = protoMessage.create(this.entryInit);
                }
                //清楚原来的数据
                if (this.protoEntry.pager.ext) {
                    this.protoEntry.pager.ext.row = undefined;
                    this.protoEntry.pager.ext.heads = undefined;
                }
                this.beforeQuery();
                this.log('idAccountUser query params : ' + JSON.stringify(this.protoEntry));
                this.service[this.queryMethod](this.protoEntry, protoMessage).subscribe(
                    (protoMsg: any) => {
                        this.formData.pager = protoMsg.pager;
                        this.protoEntry = protoMsg;
                        this.log('idAccountUser query result : ' + JSON.stringify(this.protoEntry));
                    },
                    (error: any) => console.error(error)
                );
            }
        );
    }
    /**
     * 查询列表
     * @param data
     */
    formSubmit(data: any) {
        this.log('查询参数 :' + JSON.stringify(data));
        this.bindQueryData(this.protoEntry, data, true);
        this.query();
    }
    /**
     * 列表加载
     */
    loadData(pager: any) {
        this.protoEntry.pager = pager;
        if (this.service) {
            this.query();
        }
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

    del(uuid: any) {
        if (!this.hasMethod(this.service, this.delMethod)) {
            return;
        }
        PromptUtil._confirm('确认要删除吗？', () => {
            this.service.getProtoEntry().subscribe(
                (protoMessage: any) => {
                    const delProto = protoMessage.create({ query: { uuid: uuid } });
                    this.service[this.delMethod](delProto, protoMessage).subscribe(
                        (result: any) => {
                            PromptUtil._success();
                            this.loadData(this.protoEntry.pager);
                        });
                });
        });
    }

    unbind(uuid: any) {
        this.log('父类空方法 unbind uuid : ' + uuid);
    }

    bind(uuid: any) {
        this.log('父类空方法 bind uuid : ' + uuid);
    }

    enable(uuid: any) {
        this.log('父类空方法 enable uuid : ' + uuid);
        if (!this.hasMethod(this.service, this.enableMethod)) {
            return;
        }
        const q_item_list: any = [];
        q_item_list.push({
            col: 'sql_status',
            q_item_type: 1,
            s_value: '1'
        });
        const me = this;
        PromptUtil._confirm('确认要启用吗？', () => {
            me.service.getProtoEntry().subscribe(
                (protoMessage: any) => {
                    const enableProto = protoMessage.create({
                        query: {
                            uuid: uuid,
                            q_item_list: q_item_list
                        }
                    });
                    this.service[this.enableMethod](enableProto, protoMessage).subscribe(
                        (result: any) => {
                            PromptUtil._success();
                            this.loadData(this.protoEntry.pager);
                        });
                });
        });
    }

    stop(uuid: any) {
        this.log('父类空方法 stop uuid : ' + uuid);
        if (!this.hasMethod(this.service, this.enableMethod)) {
            return;
        }
        const q_item_list: any = [];
        q_item_list.push({
            col: 'sql_status',
            q_item_type: 1,
            s_value: '2'
        });
        const me = this;
        PromptUtil._confirm('确认要停用吗？', () => {
            me.service.getProtoEntry().subscribe(
                (protoMessage: any) => {
                    const enableProto = protoMessage.create({
                        query: {
                            uuid: uuid,
                            q_item_list: q_item_list
                        }
                    });
                    me.service[this.enableMethod](enableProto, protoMessage).subscribe(
                        (result: any) => {
                            PromptUtil._success();
                            this.loadData(this.protoEntry.pager);
                        });
                });
        });
    }
    plan(uuid: any) {
        this.log('父类空方法 plan uuid : ' + uuid);
    }
    /**
     * 如果返回详情页面回来则刷新数据
    */
    ngAfterContentChecked() {
        if (this.service.isReLoad) {
            this.service.isReLoad = false;
            this.query();
        }
    }
}
