import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { IdorpListComponent } from '../../shared/idorp/component/IdorpListComponent';
import { PAGER_INIT } from '../../shared/idorp/config/app.config';
import { IdSysMenuService } from './idsysmenu.service';
import { IdorpTreeComponent } from '../../shared/idorp/component/IdorpTreeComponent';
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
export class IdSysMenuComponent extends IdorpTreeComponent implements OnInit {
    tree_config: any = {
        title: '菜单列表',
        rootCreate: true,
        useform: true,
        maxLevel: 5
    };
    constructor(
                protected _router: Router,
                protected treeService: TreeService,
                protected sysMenuService: IdSysMenuService) {
                 super(sysMenuService, _router, treeService);
    }
    ngOnInit() {
        $('sd-idsysmenu').addClass('hbox stretch');
        this.getTreeData(1);
        this.treeFormData = this.sysMenuService.initFormData();
    }
}

