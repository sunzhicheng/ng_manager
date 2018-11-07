import { TreeBaseComponent } from './../../shared/idorp/component/TreeBaseComponent';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { TreeService } from '../../shared/idorp/service/TreeService';
import { IdSysMenuService } from '../../idsys/idsysmenu/idsysmenu.service';
declare const $: any;


@Component({
    moduleId: module.id,
    selector: 'demo-area',
    template: `
        <aside class="aside-md b-r bg-white" id="subNav">
        <ng-tree-alert  *ngIf="tree_data" [config]="tree_config" [tree_button_setting]="tree_button_setting" [treeFormData]="treeFormData"
        [treeData]="tree_data"
        [async_config]="async_config"
        (formSubmited)="treeSave($event)"
        (treeDeleted)="treeDelete($event)"
        (treeDetailed)="treeDetail($event)"
    ></ng-tree-alert>

    </aside>
  `
})

/**
 * 系统模块 区域管理 demo
 */
export class DemoTreeComponent extends TreeBaseComponent implements OnInit {

    tree_config: any = {
        title: '区域列表(异步加载)',
        rootCreate: true,
        useform: true,
        maxLevel: 5,
        async: true
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
        protected treeService: TreeService,
        protected eleRef: ElementRef,
        protected sysMenuService: IdSysMenuService) {
        super(sysMenuService, treeService, null, eleRef);
    }
    myInit() {
        this.treeFormData = this.sysMenuService.initFormData();
    }
}

