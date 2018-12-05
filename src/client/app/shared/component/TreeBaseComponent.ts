import { TreeService } from '../service/TreeService';
import { DyBaseService } from '../service/IdBaseService';
import { ViewChild, OnInit, ElementRef } from '@angular/core';
import { TreeAlertComponent } from '../../core/tree/tree.alert';
import { ToolForm } from '../tool/ToolForm';
import { ListBaseComponent } from './ListBaseComponent';
import { APISOURCE } from '../config/app.config';
import { TreeInComponent } from '../../core/tree/tree.in';
import { TreeComponent } from '../../core/tree/tree.base';
/**
 * 列表组件基类
 */
export abstract class TreeBaseComponent extends ListBaseComponent implements OnInit {
    //重新命名该属性的时候   必须保证相应的子service 有相应的方法
    method_tree_query: any = 'tree';
    method_tree_detail: any = 'detail';
    method_tree_save: any = 'save';
    method_tree_del: any = 'del';
    //用来获取子集的JSON key
    sub_key: any = 'sub_list';
    //用来获取父UUID 的 JSON key
    uuid_key: any = 'uuid';
    //用来获取名称的  JSON key
    name_key: any = 'name';
    //父id
    parent_key: any = 'parent_id';
    //树数据
    tree_data: any;
    //树节点新增修改的form  表单
    treeFormData: any;
    //树配置
    tree_config: any = {
        title: '数列表',
        rootCreate: true,
        useform: true,
        maxLevel: 5,
        async: false
    };
    //树按钮 控制
    tree_button_setting: any = {
        selectedMulti: false,
        addBtn: true,
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
    //异步加载需要配置的参数
    async_config: any;
    @ViewChild(TreeAlertComponent)
    private tree_alert: TreeAlertComponent;
    @ViewChild(TreeInComponent)
    private tree_in: TreeInComponent;
    constructor(protected treeServ: DyBaseService | any,
        protected treeUtil: TreeService,
        protected listServ: DyBaseService | any,
        protected eleRef: ElementRef) {
        super(listServ, eleRef);
    }
    ngOnInit() {
        this.initTree();
    }
    abstract myInit(): void;
    /**
    * 添加统一样式
    * @param c
    */
    addDefaultClass(c?: string) {
        if (c !== null) {
            this.eleRef.nativeElement.className = c || 'hbox stretch';
        }
    }
    /**
     * 获取树组件对象
     */
    getTreeComp(): TreeComponent {
        let treeCom: any = this.tree_alert;
        if (!treeCom) {
            treeCom = this.tree_in;
        }
        if (!treeCom) {
            throw new Error('TreeBaseComponent.getTreeComp 错误:  获取的树对象为null');
        }
        return treeCom;
    }
    /**
     * 获取数结构数据
     * @param openIndex  默认打开数到第几层
     */
    getTreeData(openIndex: any = 9999) {
        if (!this.hasMethod(this.treeServ, this.method_tree_query)) {
            return;
        }
        if (!this.treeEntry) {
            this.treeEntry = this.entryInit;
        }
        if (this.treeEntry.pager) {
            this.treeEntry.pager = undefined;
        }
        this.treeServ[this.method_tree_query](this.treeEntry, APISOURCE.TREE).subscribe((protoMsg: any) => {
            this.tree_data = [];
            if (protoMsg) {
                this.tree_data.splice(0, this.tree_data.length);
                this.treeUtil.setMappingKey(this.name_key, this.uuid_key, this.sub_key);
                this.tree_data = this.treeUtil.toTreeData(protoMsg, openIndex);
            }
        }, (error: any) => console.error(error));
    }
    treeDetail(node: any) {
        if (!this.hasMethod(this.treeServ, this.method_tree_detail)) {
            return;
        }
        const detailProto = { query: { uuid: node.id } };
        this.treeServ[this.method_tree_detail](detailProto, APISOURCE.TREE).subscribe((protoMsg: any) => {
            this.getTreeComp().toEdit(protoMsg.proto);
        });
    }
    /**
     * 更新回调方法
     * @param entryResult
     */
    updateSuccessCallback(result: any) {
        this.getTreeComp().editSuccess(result.proto[this.name_key]);
    }
    /**
     * 新增回调方法
     * @param entryResult
     */
    addSuccessCallback(result: any) {
        this.treeUtil.setMappingKey(this.name_key, this.uuid_key, this.sub_key);
        const node = this.treeUtil.proto2Node(result.proto, result.proto[this.parent_key], true);
        this.getTreeComp().addSuccess(node);
    }
    delSuccessCallback(result: any) {
        this.getTreeComp().delSuccess();
    }
    treeSubmit(fdata: any) {
        if (!this.hasMethod(this.treeServ, this.method_tree_save)) {
            return;
        }
        const saveProto = { proto: fdata, query: { uuid: fdata.id } };
        if (!fdata.id && fdata.add_parentNode) {
            saveProto.proto[this.parent_key] = fdata.add_parentNode.id;
        }
        this.log('tree formSubmit brefore : ', saveProto);
        this.treeServ[this.method_tree_save](saveProto, fdata.id ? false : true, APISOURCE.TREE).subscribe((protoMsg: any) => {
            this.log('tree formSubmit result : ', protoMsg);
            if (fdata.id) {
                this.updateSuccessCallback(protoMsg);
            } else {
                this.addSuccessCallback(protoMsg);
            }
        }, (error: any) => console.error(error));
    }
    treeDelete(node: any) {
        if (!this.hasMethod(this.treeServ, this.method_tree_del)) {
            return;
        }
        const delProto = { query: { uuid: node.id } };
        this.log('treeDelete brefore : ', delProto);
        this.treeServ[this.method_tree_del](delProto, APISOURCE.TREE).subscribe((protoMsg: any) => {
            this.log('treeDelete result : ', protoMsg);
            this.delSuccessCallback(protoMsg);
        }, (error: any) => console.error(error));
    }
    /** ****************************************需要手动刷新的方法 start************************************/
    /**
   * 绑定下拉列表,必须调用刷新方法注：
   * 1.下拉列表的label必须与传过来的key相同
   * 2.用户类型必须放在row_list[0]中
   * @param optList
   * @param key
   */
    bindFormDateOptList(optList: any, key: any) {
        if (this.getTreeComp().form) {
            ToolForm.bindFormDateOptList(this.getTreeComp().form, this.treeFormData, optList, key);
        }
    }
    setItemValueByJson(json: any) {
        if (this.getTreeComp().form) {
            ToolForm.setItemValueByJson(this.getTreeComp().form, this.treeFormData, json);
        }
    }
    /**
     * 向表单对象动态添加tiem
     * @param items  item的数组对象
     * @param afterKey 在哪个item key后面开始添加
     * @param isRefresh 是否自动刷新表单  默认不刷新
     */
    addItemList(items: any, afterKey: String) {
        ToolForm.addItemList(this.treeFormData, items, afterKey);
    }
    /**
     * 向表单对象动态删除tiem
     * @param keyArr 需要删除的item key  集合
     * @param isRefresh 是否自动刷新表单 默认不刷新
     */
    delItemList(keyArr: any) {
        ToolForm.delItemList(this.treeFormData, keyArr);
    }
    updateRules(keyArr: any, rule: any, isAdd: boolean = true) {
        ToolForm.updateRules(this.treeFormData, keyArr, rule, isAdd);
    }
    clearRules(keyArr: any) {
        ToolForm.clearRules(this.treeFormData, keyArr);
    }
    /**
    * 修改的时候  向动态表单中添加disabled属性
    * @param formData
    * @param key
    */
    addDisabledList(keyArr: any, opt: boolean = true, dealOther: boolean = false) {
        ToolForm.addDisabledList(this.treeFormData, keyArr, opt, dealOther);
    }
    /**
     * 动态设置校验规则
     * @param formData
     * @param key
     * @param isAdd
     */
    addRequiredRules(formData: any, key: any, isAdd: boolean = true) {
        if (formData) {
            ToolForm.updateRules(formData, [key], {
                name: 'required',
                errorMsg: '必填'
            }, isAdd);
        }
    }
    addHiddenList(keyArr: any, opt: boolean = true) {
        ToolForm.addHiddenList(this.treeFormData, keyArr, opt);
    }
    /** ****************************************需要手动刷新的方法 end************************************/
    /** ****************************************不需要手动刷新的方法 startr************************************/
    /**
     * 设置某个属性为空
     * @param key
     */
    setNullByKey(key: any) {
        if (this.getTreeComp().form) {
            ToolForm.setNullByKey(this.getTreeComp().form, key);
        }
    }
    addHiddenButtonList(keyArr: any, opt: boolean = true, dealOther: boolean = false) {
        ToolForm.addHiddenButtonList(this.treeFormData, keyArr, opt, dealOther);
    }
    addDisabledButtonList(keyArr: any, opt: boolean = true, dealOther: boolean = false) {
        ToolForm.addDisabledButtonList(this.treeFormData, keyArr, opt, dealOther);
    }
    getButtonKeyDisabledStatus(key: any) {
        return ToolForm.getButtonKeyStatus(this.treeFormData, key);
    }
    getButtonKeyHiddenStatus(key: any) {
        return ToolForm.getButtonKeyStatus(this.treeFormData, key, 'hidden');
    }
    addButtonList(items: any, afterKey: String) {
        ToolForm.addButtonList(this.treeFormData, items, afterKey);
    }
    /******************************************不需要手动刷新的方法 end************************************/
    /**
     * item 变动  手动刷新表单
     */
    refreshItem() {
        ToolForm.refreshItem(this.getTreeComp().form, this.treeFormData);
    }
    refreshRule() {
        if (this.getTreeComp().form && this.getTreeComp().form) {
            ToolForm.refreshRule(this.getTreeComp().form, this.treeFormData);
        }
    }
    updateFilterJson(formData: any, key: any, filterJson: any) {
        if (formData) {
            ToolForm.updateFilterJson(formData, key, filterJson);
        }
    }
    /**
     * formData 初始化完成操作
     */
    protected initComplete() {
        if (this.tree_config.useform && !this.treeFormData) {
            console.error('initComplete错误: treeFormData属性为null');
            return;
        }
        if (this.tree_config.async && !this.async_config) {
            console.error('initComplete错误: 缺少异步加载必须配置参数<async_config>');
            return;
        }
        this.tree_config.complete = true;
    }
    private initTree() {
        //请求tree  数据
        this.getTreeData(1);
        //给子类加载必须属性  如 treeFormData属性
        this.myInit();
        //设置默认样式
        this.addDefaultClass();
        //通知组件formData已经初始化完成
        this.initComplete();
    }
}
