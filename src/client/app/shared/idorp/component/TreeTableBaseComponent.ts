import { TreeService } from '../service/TreeService';
import { DyBaseService } from '../service/IdBaseService';
import { OnInit, ElementRef, ViewChild } from '@angular/core';
import { TreeBaseComponent } from './TreeBaseComponent';
import { TreeTableComponent } from '../../../core/tree-table/tree-table';
/**
 * 列表组件基类
 */
export abstract class TreeTableBaseComponent extends TreeBaseComponent implements OnInit {

    @ViewChild(TreeTableComponent)
    private tree_table: TreeTableComponent;
    constructor(protected treeServ: DyBaseService | any,
        protected treeUtil: TreeService,
        protected listServ: DyBaseService | any,
        protected eleRef: ElementRef) {
        super(treeServ, treeUtil, listServ, eleRef);
    }
    ngOnInit() {
        this.initTreeTable();
    }
    abstract myInit(): void;
    getTreeComp() {
        return this.tree_table.tree;
    }
    /**
     * 点击树节点 ,加载列表数据
     * @param nodeId
     */
    treeItemClick(nodeId: any) {
        this.log('选择的树节点ID', nodeId);
        this.listSubmit({selectedNodeId: nodeId});
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
        if (!this.listFormData) {
            console.error('initComplete错误: listFormData属性为null');
            return;
        }
        this.listFormData.complete = true;
    }
    private initTreeTable() {
        //加载树数据
        this.getTreeData(1);
        this.myInit();
        //通知组件formData已经初始化完成
        this.initComplete();
    }
}
