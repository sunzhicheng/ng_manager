import { IdorpTreeComponent } from '../shared/idorp/component/IdorpTreeComponent';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TreeService } from '../shared/idorp/service/TreeService';
import { IdSysAreaService } from '../idsys/idsysarea/idsysarea.service';
import { IdSysMenuService } from '../idsys/idsysmenu/idsysmenu.service';
import { IdorpBaseComponent } from '../shared/idorp/component/IdorpBaseComponent';
import { DemoService } from './demo.service';
import { IdorpTreeTableComponent } from '../shared/idorp/component/IdorpTreeTableComponent';
declare const $: any;


@Component({
    moduleId: module.id,
    selector: 'demo-tree-table',
    templateUrl: 'demo.tree.table.html'
})

/**
 * demo  左边树  右边table
 */
export class DemoTreeTableComponent extends IdorpTreeTableComponent {

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
                protected treeService: TreeService,
                protected demoService: DemoService,
                protected sysAreaService: IdSysAreaService,
                protected menuService: IdSysMenuService) {
                    super(demoService, treeService);
    }
    ngOnInit() {
        $('demo-area').addClass('hbox stretch');
        this.formData = this.demoService.initListData();
        this.treeFormData = this.sysAreaService.initFormData();
        this.getTreeData(1);
        this.treeFormData = this.menuService.initFormData();
        this.query();
    }

    
}

