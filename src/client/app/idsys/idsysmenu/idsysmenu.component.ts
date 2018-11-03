import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdSysMenuService } from './idsysmenu.service';
import { TreeBaseComponent } from '../../shared/idorp/component/TreeBaseComponent';
import { TreeService } from '../../shared/idorp/service/TreeService';
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
        protected sysMenuService: IdSysMenuService) {
        super(sysMenuService, treeService, null);  //这里 第一个参数是  list列表service  在treeTable的时候会用到
    }
    start() {
        $('sd-idsysmenu').addClass('hbox stretch');
        this.treeFormData = this.sysMenuService.initFormData();
    }
}

