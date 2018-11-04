import { TreeBaseComponent } from '../../shared/idorp/component/TreeBaseComponent';
import { Component, OnInit, ElementRef } from '@angular/core';
import { TreeService } from '../../shared/idorp/service/TreeService';
import { IdSysMenuService } from '../../idsys/idsysmenu/idsysmenu.service';
declare const $: any;


@Component({
    moduleId: module.id,
    selector: 'demo-area',
    template: `
        <ng-tree-out  *ngIf="tree_data" [config]="tree_config" [tree_setting]="tree_setting" [treeFormData]="treeFormData"
        [treeData]="tree_data"
        (formSubmited)="formSubmit($event)"
        (treeDeleted)="treeDelete($event)"
        (treeDetailed)="treeDetail($event)"
        ></ng-tree-out>
  `
})

/**
 * 系统模块 区域管理 demo
 */
export class DemoTreeOutComponent extends TreeBaseComponent implements OnInit {

    tree_config: any = {
        title: '区域列表',
        rootCreate: true,
        useform: true,
        maxLevel: 5,
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
                protected menuService: IdSysMenuService) {
                    super(menuService, treeService, null, eleRef); 
    }
    start() {
        this.treeFormData = this.menuService.initFormData();
    }
}

