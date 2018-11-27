import { Component, Renderer2, ElementRef } from '@angular/core';
import { IdSysMenuService } from './idsysmenu.service';
import { TreeBaseComponent } from '../../shared/component/TreeBaseComponent';
import { TreeService } from '../../shared/service/TreeService';
declare const $: any;

@Component({
    moduleId: module.id,
    selector: 'sd-idsysmenu',
    templateUrl: 'idsysmenu.component.html',
})

/**
 * 系统模块 菜单配置 组件
 */
export class IdSysMenuComponent extends TreeBaseComponent {
    tree_config: any = {
        title: '菜单列表',
        rootCreate: true,
        useform: true,
        maxLevel: 5
    };
    constructor(
        protected treeService: TreeService,
        protected render: Renderer2,
        protected eleRef: ElementRef,
        protected sysMenuService: IdSysMenuService) {
        super(sysMenuService, treeService, null, eleRef);  //这里 第一个参数是  list列表service  在treeTable的时候会用到
    }
    myInit() {
        this.treeFormData = this.sysMenuService.initFormData();
    }
}

