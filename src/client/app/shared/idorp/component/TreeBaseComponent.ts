import { TreeService } from '../service/TreeService';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { DyBaseService } from '../service/IdBaseService';
import { BaseComponent } from './BaseComponent';
import { ViewChild } from '@angular/core';
import { TreeInComponent } from '../../../core/tree/tree.in';
import { FormUtils } from '../providers/FormUtils';
import { ListBaseComponent } from './ListBaseComponent';
import { APISOURCE } from '../config/app.config';
/**
 * 列表组件基类
 */
export class TreeBaseComponent extends ListBaseComponent {
     //重新命名该属性的时候   必须保证相应的子service 有相应的方法
     method_tree_query: any = 'tree';
     method_tree_detail: any = 'detail';
     method_tree_save: any = 'save';
     method_tree_del: any = 'del';


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
    //树节点新增修改的form  表单
    treeFormData: any;
    //树配置
    protected tree_config: any = {
        title: '数列表',
        rootCreate: true,
        useform: true,
        maxLevel: 5,
        async: false
    };
    //树按钮 控制
    protected tree_button_setting: any = {
        selectedMulti: false, //是否可多选
        addBtn: true, //增加按钮
        editBtn: true,
        deleteBtn: true,
        bindBtn: false,
    };
    /**
     * 组件协议对像数据
     */
    treeEntry: any = this.entryInit;

    //已经被选择的集合
    checkeds: any;

    @ViewChild(TreeInComponent)
    protected tree_in: TreeInComponent;

    constructor(protected listService: DyBaseService|any,
        protected treeService: DyBaseService|any,
        protected treeUtil: TreeService,
        ) {
        super(listService);
    }
    beforeQuery() {
        this.log('父类空方法 用于封装查询条件 供子类实现 ');
    }
    /**
     * 获取数结构数据
     * @param openIndex  默认打开数到第几层
     */
    getTreeData(openIndex: any = 9999) {
        if (!this.hasMethod(this.treeService, this.method_tree_query)) {
            return;
        }
        if (!this.treeEntry) {
            this.treeEntry = this.entryInit;
        }
        if (this.treeEntry.pager) {
            this.treeEntry.pager = undefined;
        }

        this.log('tree query brefore : ', this.treeEntry);
        this.treeService[this.method_tree_query](this.treeEntry, APISOURCE.TREE).subscribe(
            (protoMsg: any) => {
                this.log('tree query result : ', protoMsg);
                this.tree_data = [];
                if (protoMsg.proto_list) {
                    this.tree_data.splice(0, this.tree_data.length);
                    this.treeUtil.setMappingKey( this.name_key, this.uuid_key, this.sub_key);
                    this.tree_data = this.treeUtil.toTreeData(protoMsg.proto_list, openIndex);
                }
            },
            (error: any) => console.error(error)
        );
    }
    treeDetail(node: any) {
        if (!this.hasMethod(this.treeService, this.method_tree_detail)) {
            return;
        }
        const detailProto = { proto: {dtc: {pt_id: {open_id: node.id}}}};
        this.log('treeDetail query brefore : ', detailProto);
        this.treeService[this.method_tree_detail](detailProto, APISOURCE.TREE).subscribe(
            (protoMsg: any) => {
                this.log('treeDetail query result : ', protoMsg);
                this.tree_in.toEdit(protoMsg.proto);
            },
        );
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
        this.treeUtil.setMappingKey(this.name_key, this.uuid_key, this.sub_key );
        const node = this.treeUtil.proto2Node(result.proto, result.proto[this.parent_key], true);
        this.tree_in.addSuccess(node);
    }
    delSuccessCallback(result: any) {
        this.tree_in.delSuccess();
    }
    formSubmit(fdata: any) {
        if (!this.hasMethod(this.treeService, this.method_tree_save)) {
            return;
        }
        const saveProto = { proto: fdata, query: {uuid: fdata.id}};
        if (!fdata.id && fdata.add_parentNode) {
            saveProto.proto[this.parent_key] = fdata.add_parentNode.id;
        }
        this.log('tree formSubmit brefore : ', saveProto);
        this.treeService[this.method_tree_save](saveProto, fdata.id ? false : true, APISOURCE.TREE).subscribe(
            (protoMsg: any) => {
                this.log('tree formSubmit result : ' , protoMsg);
                if (fdata.id) {
                    this.updateSuccessCallback(protoMsg);
                } else {
                    this.addSuccessCallback(protoMsg);
                }
            },
            (error: any) => console.error(error)
        );
    }
    treeDelete(node: any) {
        if (!this.hasMethod(this.treeService, this.method_tree_del)) {
            return;
        }
        const delProto = { query: {uuid: node.id}};
        this.log('treeDelete brefore : ', delProto);
        this.treeService[this.method_tree_del](delProto, APISOURCE.TREE).subscribe(
            (protoMsg: any) => {
                this.log('treeDelete result : ' , protoMsg);
                this.delSuccessCallback(protoMsg);
            },
            (error: any) => console.error(error)
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
