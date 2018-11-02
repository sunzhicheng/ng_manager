import { TreeService } from './../service/TreeService';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { DyBaseService } from '../service/IdBaseService';
import { IdorpBaseComponent } from './IdorpBaseComponent';
import { ViewChild } from '@angular/core';
import { TreeInComponent } from '../../../core/tree/tree.in';
import { FormUtils } from '../providers/FormUtils';
/**
 * 列表组件基类
 */
export class IdorpTreeComponent extends IdorpBaseComponent {
     //重新命名该属性的时候   必须保证相应的子service 有相应的方法
    treeMethod: any = 'tree';
    loadByUUIDMethod: any = 'loadByUUID';
    saveMethod: any = 'save';
    delMethod: any = 'del';


    @ViewChild(TreeInComponent)
    protected tree_in: TreeInComponent;
    //用来获取子集的JSON key
    sub_key: any = 'sub_list';
    //用来获取父UUID 的 JSON key
    uuid_key: any = 'dtc.pt_id.open_id';
    //用来获取名称的  JSON key
    name_key: any = 'name';
    //父id
    parent_key: any = 'parent_id';
    //树数据
    tree_data: any = [];
    treeFormData: any;
    opt_config: any = {isopt: true, bind: true, del: true, view: true};
    //树配置
    protected tree_config: any = {
        title: '数列表',
        rootCreate: true,
        useform: true,
        maxLevel: 5
    };
    //树按钮
    protected tree_setting: any = {
        selectedMulti: false, //是否可多选
        addBtn: true, //增加按钮
        editBtn: true,
        deleteBtn: true,
        bindBtn: false,
    };

    //已经被选择的集合
    checkeds: any;

    baseRoute: any;
    constructor(protected service: DyBaseService|any,
        protected _router: Router,
        protected treeService: TreeService,
        ) {
        super();
    }
    beforeQuery() {
        this.log('父类空方法 用于封装查询条件 供子类实现 ');
    }
    /**
     * 获取数结构数据
     * @param openIndex  默认打开数到第几层
     */
    getTreeData(openIndex: any = 9999) {
        if (!this.hasMethod(this.service, this.treeMethod)) {
            return;
        }
        this.service.getProtoEntry().subscribe(
            (protoMessage: any) => {
                if (!this.protoEntry) {
                    this.protoEntry = protoMessage.create(this.entryInit);
                }
                if (this.protoEntry.pager) {
                    this.protoEntry.pager = undefined;
                }
                this.log(' query params : ' + JSON.stringify(this.protoEntry));
                this.service[this.treeMethod](this.protoEntry, protoMessage).subscribe(
                    (protoMsg: any) => {
                        this.tree_data = [];
                        if (protoMsg.proto_list) {
                            this.tree_data.splice(0, this.tree_data.length);
                            this.treeService.setMappingKey( this.name_key, this.uuid_key, this.sub_key);
                            this.tree_data = this.treeService.toTreeData(protoMsg.proto_list, openIndex);
                        }
                    },
                    (error: any) => console.error(error)
                );
            }
        );
    }
    treeDetail(node: any) {
        if (!this.hasMethod(this.service, this.loadByUUIDMethod)) {
            return;
        }
        this.service.getProtoEntry().subscribe(
            (protoMessage: any) => {
                const detailProto = protoMessage.create({ proto: {dtc: {pt_id: {open_id: node.id}}}});
                this.log('treeDetail query params : ' + JSON.stringify(this.protoEntry));
                this.service[this.loadByUUIDMethod](detailProto, node.id, protoMessage).subscribe(
                    (protoMsg: any) => {
                        this.tree_in.toEdit(this.refreshFormData(protoMsg.proto));
                    },
                );
            }
        );
    }
    /**
     * 刷新disabled属性
     * @param data
     */
    refreshFormData(data: any) {
        const disabledKey: any = [];
        if (this.treeFormData.row_list) {
            this.treeFormData.row_list.forEach((row: any) => {
                if (row.item_list) {
                    row.item_list.forEach((item: any) => {
                        if (item.disabled) {
                            disabledKey.push(item.key);
                        }
                    });
                    }
                });
                }
        if (disabledKey.length > 0) {
            for (const key in data) {
                if (_.indexOf(disabledKey, key) !== -1) {
                    data[key] = {value: data[key], disabled: true};
                }
            }
        }
        return data;
      }

    /**
     * 更新回调方法
     * @param entryResult
     */
    updateSuccessCallback(result: any) {
        this.tree_in.editSuccess(result.proto[this.name_key]);
    }
    /**
     * 新增回调方法
     * @param entryResult
     */
    addSuccessCallback(result: any) {
        this.treeService.setMappingKey(this.name_key, this.uuid_key, this.sub_key );
        const node = this.treeService.proto2Node(result.proto, result.proto[this.parent_key], true);
        this.tree_in.addSuccess(node);
    }
    delSuccessCallback(result: any) {
        this.tree_in.delSuccess();
    }
    formSubmit(fdata: any) {
        if (!this.hasMethod(this.service, this.saveMethod)) {
            return;
        }
        this.log('保存树节点');
        this.service.getProtoEntry().subscribe(
            (protoMessage: any) => {
                const saveProto = protoMessage.create({ proto: fdata, query: {uuid: fdata.id}});
                if (!fdata.id && fdata.add_parentNode) {
                    saveProto.proto[this.parent_key] = fdata.add_parentNode.id;
                }
                this.service[this.saveMethod](saveProto, protoMessage, fdata.id ? false : true).subscribe(
                    (protoMsg: any) => {
                        if (fdata.id) {
                            this.updateSuccessCallback(protoMsg);
                        } else {
                            this.addSuccessCallback(protoMsg);
                        }
                    },
                    (error: any) => console.error(error)
                );
            }
        );
    }
    treeDelete(node: any) {
        if (!this.hasMethod(this.service, this.delMethod)) {
            return;
        }
        this.service.getProtoEntry().subscribe(
            (protoMessage: any) => {
                const delProto = protoMessage.create({ query: {uuid: node.id}});
                this.log('treeDelete params : ' + JSON.stringify(this.protoEntry));
                this.service[this.delMethod](delProto, protoMessage).subscribe(
                    (protoMsg: any) => {
                        this.log('treeDelete result : ' + JSON.stringify(protoMsg));
                        this.delSuccessCallback(protoMsg);
                    },
                    (error: any) => console.error(error)
                );
            }
        );
    }
    //数节点的 修改和新增表单使用  start..
   addDisabledList(keyArr: any, opt: boolean = true, dealOther: boolean = false) {
        FormUtils.addDisabledList(this.treeFormData, keyArr, opt, dealOther);
   }

   setItemValueByJson(json: any) {
       FormUtils.setItemValueByJson(this.tree_in.form, this.treeFormData, json);
    }
    addHiddenList(keyArr: any, opt: boolean = true, dealOther: boolean = false) {
        FormUtils.addHiddenList(this.treeFormData, keyArr, opt, dealOther);
    }
    /**
     * item 变动  手动刷新表单
     */
    refreshItem() {
        FormUtils.refreshItem(this.tree_in.form, this.treeFormData);
    }

    //数节点的 修改和新增表单使用  end..
}
