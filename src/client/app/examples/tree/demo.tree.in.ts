import { TreeBaseComponent } from '../../shared/component/TreeBaseComponent';
import { Component, OnInit, ElementRef } from '@angular/core';
import { TreeService } from '../../shared/service/TreeService';
import { MenuService } from '../../sys/menu/menu.service';
declare const $: any;


@Component({
    moduleId: module.id,
    selector: 'demo-area',
    template: `
        <ng-tree-in  *ngIf="treeFormData" [config]="tree_config" [tree_button_setting]="tree_button_setting" [treeFormData]="treeFormData"
        [treeData]="tree_data"
        (formSubmited)="treeSubmit($event)"
        (treeDeleted)="treeDelete($event)"
        (treeDetailed)="treeDetail($event)"
        ></ng-tree-in>

  `
})

/**
 * 系统模块 区域管理 demo
 */
export class DemoTreeInComponent extends TreeBaseComponent implements OnInit {

    tree_config: any = {
        title: '菜单列表',
        rootCreate: true,
        useform: true,
        maxLevel: 5,
    };
    async_config: any = {
        requestUrl: '/sys/sysarea/query/byfid',   //只会传一个pId参数在query 接口通过query.q_item_list中获取
        mappingKey: {    //这里设置了空  也可以不设置  采用默认配置
            name_key: null,
            uuid_key: null,
            sub_key: null,
            parent_key: null,
        },
    };
    constructor(
        protected treeService: TreeService,
        protected eleRef: ElementRef,
        protected menuService: MenuService) {
        super(menuService, treeService, null, eleRef);
    }
    myInit() {
        this.treeFormData = this.menuService.initFormData();
    }
}

