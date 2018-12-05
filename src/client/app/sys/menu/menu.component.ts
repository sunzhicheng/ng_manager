import { Component, Renderer2, ElementRef } from '@angular/core';
import { MenuService } from './menu.service';
import { TreeBaseComponent } from '../../shared/component/TreeBaseComponent';
import { TreeService } from '../../shared/service/TreeService';
declare const $: any;

@Component({
    moduleId: module.id,
    selector: 'sys-menu',
    templateUrl: 'menu.component.html',
})

/**
 * 系统模块 菜单配置 组件
 */
export class MenuComponent extends TreeBaseComponent {
    tree_config: any = {
        title: '菜单列表',
        rootCreate: true,
        useform: true,
        maxLevel: 5,
        async: true
    };
    async_config: any = {
        requestUrl: '/sys/menu/tree',   //只会传一个pId参数在query 接口通过query.q_item_list中获取
    };
    constructor(
        protected treeService: TreeService,
        protected render: Renderer2,
        protected eleRef: ElementRef,
        protected sysMenuService: MenuService) {
        super(sysMenuService, treeService, null, eleRef);  //这里 第一个参数是  list列表service  在treeTable的时候会用到
    }
    myInit() {
        this.treeFormData = this.sysMenuService.initFormData();
    }
}

