import { TreeService } from '../service/TreeService';
import { DyBaseService } from '../service/IdBaseService';
import { OnInit, ElementRef } from '@angular/core';
import { TreeBaseComponent } from './TreeBaseComponent';
/**
 * 列表组件基类
 */
export abstract class TreeTableBaseComponent extends TreeBaseComponent implements OnInit {

    constructor(protected treeServ: DyBaseService | any,
        protected treeUtil: TreeService,
        protected listServ: DyBaseService | any,
        protected eleRef: ElementRef) {
        super(treeServ, treeUtil, listServ, eleRef);
    }
    ngOnInit() {
        this.initTreeTable();
    }
    abstract start(): void;

    /**
     * formData 初始化完成操作
     */
    protected initComplete() {

    }
    private initTreeTable() {

        //通知组件formData已经初始化完成
        this.initComplete();
    }
}