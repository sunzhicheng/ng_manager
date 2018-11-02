import { Component, OnInit, ViewChild, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IdorpListComponent } from '../../shared/idorp/component/IdorpListComponent';
import { PAGER_INIT } from '../../shared/idorp/config/app.config';
import { IdSysMenuService } from './idsysmenu.service';
import { IdorpTreeComponent } from '../../shared/idorp/component/IdorpTreeComponent';
import { PromptUtil } from '../../shared/idorp/providers/PromptUtil';
import { IUtils } from '../../shared/idorp/providers/IUtils';
import { TreeInComponent } from '../../core/tree/tree.in';
import { TreeService } from '../../shared/idorp/service/TreeService';
declare const $: any;

@Component({
    moduleId: module.id,
    selector: 'sd-idsysmenu-modal',
    templateUrl: 'modal.memu.component.html',
})

/**
 * 系统模块 绑定菜单 组件
 */
export class ModalMenuComponent extends IdorpTreeComponent {
    tree_config: any = {
        title: '选择菜单',
        rootCreate: false,
        showhead: true,
        useform: false,
    };
    tree_setting: any = {
        check: true
    };
    /**
     * 用户类型绑定菜单是需要
     */
    bind_data = {
        uTypeId: ''
    };

    @ViewChild(TreeInComponent)
    public tree: TreeInComponent;

    @Input()
    public set modal_config(values: any) {
      IUtils.mergeAFromB(this.tree_config, values, {});
    }

    @Output()
    public selectOut: EventEmitter<any> = new EventEmitter();

    constructor(
        protected treeService: TreeService,
        protected _router: Router,
        private route: ActivatedRoute,
        protected sysMenuService: IdSysMenuService) {
        super(sysMenuService, _router, treeService);
    }
    show(data: any): void {
        if (!this._.has(data, 'uTypeId')) {
            PromptUtil._error('用户类型错误');
            return;
        } else {
            this.bind_data = data;
        }
        this.bindQueryData(this.protoEntry, data);
        this.getTreeData();
        (<any>$('#menu_modal')).modal('show');
    }
    hide(): void {
        (<any>$('#menu_modal')).modal('hide');
    }

    save() {
        const uuidArray: any = this.tree.getAllSelect();
        if (!this._.has(this.bind_data, 'uTypeId')) {
            this.selectOut.emit(uuidArray);
            return;
        } else {
            if (!uuidArray) {
                return;
            }
            this.sysMenuService.getProtoEntry().subscribe(
                (protoMessage: any) => {
                    //绑定操作
                    const protoList: any = [];
                    uuidArray.forEach((dtc: any) => {
                        protoList.push(dtc);
                    });
                    const bindProto = protoMessage.create({proto_list: protoList});
                    this.bindQueryData(bindProto, {uTypeId: this.bind_data.uTypeId});
                    this.log(' menu bind params : ' + JSON.stringify(bindProto));
                    this.sysMenuService.bind(bindProto, protoMessage).subscribe(
                        (protoMsg: any) => {
                            PromptUtil.success('绑定成功');
                            this.hide();
                        },
                        (error: any) => console.error(error)
                    );
                }
            );
        }
      }
    /**
     * 覆盖父类获取数据方法
     */
    getTreeData() {
        this.sysMenuService.getProtoEntry().subscribe(
            (protoMessage: any) => {
                this.log(' query params : ' + JSON.stringify(this.protoEntry));
                this.sysMenuService.modalTree(this.protoEntry, protoMessage).subscribe(
                    (protoMsg: any) => {
                        this.tree_data = [];
                        const hasSelectedMenus = protoMsg.proto.parent_ids || '';
                        this.tree_data = this.treeService.toTreeData(protoMsg.proto_list, 1, hasSelectedMenus);
                    },
                    (error: any) => console.error(error)
                );
            }
        );
    }
}

