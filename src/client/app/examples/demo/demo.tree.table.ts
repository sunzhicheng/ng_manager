import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { TreeService } from '../../shared/idorp/service/TreeService';
import { IdSysMenuService } from '../../idsys/idsysmenu/idsysmenu.service';
import { DemoService } from './demo.service';
import { IdSysAppAcountService } from '../../idsys/idsysappacount/idsysappacount.service';
import { TreeTableBaseComponent } from '../../shared/idorp/component/TreeTableBaseComponent';
declare const $: any;


@Component({
    moduleId: module.id,
    selector: 'demo-tree-table',
    templateUrl: 'demo.tree.table.html'
})

/**
 * demo  左边树  右边table
 */
export class DemoTreeTableComponent extends TreeTableBaseComponent {

    tree_config: any = {
        title: '树列表',
        rootCreate: true,
        useform: true,
        maxLevel: 5,
        async: false
    };

    async_config: any = {
        requestUrl: '/idsys/idsysarea/query/byfid',   //只会传一个pId参数在query 接口通过query.q_item_list中获取
        mappingKey: {    //这里设置了空  也可以不设置  采用默认配置
            name_key: null,
            uuid_key: null,
            sub_key: null,
            parent_key: null,
          },
    };
    constructor(
                protected _router: Router,
                protected treeUtil: TreeService,
                protected accountService: IdSysAppAcountService,
                protected demoService: DemoService,
                protected eleRef: ElementRef,
                protected menuService: IdSysMenuService) {
                    super(menuService, treeUtil, accountService, eleRef);
    }
    start() {
        this.listFormData = this.demoService.initListData();
        this.getTreeData(1);
        this.treeFormData = this.menuService.initFormData();
        this.query();
    }

    
}

