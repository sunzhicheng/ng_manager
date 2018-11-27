import { BaseComponent } from '../../shared/component/BaseComponent';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IdTool } from '../../shared/tool/IdTool';
import { TreeAlertComponent } from '../tree/tree.alert';
declare const $: any;

@Component({
    moduleId: module.id,
    selector: 'tree-modal',
    templateUrl: 'modal.tree.component.html',
})

/**
 * 系统模块 绑定菜单 组件
 */
export class ModalTreeComponent extends BaseComponent implements OnInit {
    _tree_config: any = {
        title: '选择菜单',
        rootCreate: false,
        showhead: true,
        useform: false
    };
    _tree_button_setting: any = {
        check: true
    };

    @ViewChild('modal_tree')
    public modal_tree: TreeAlertComponent;

    @Input()
    public set modal_config(values: any) {
      IdTool.mergeAFromB(this._tree_config, values, {});
    }

    @Input()
    modal_Data: any;
    @Output()
    public selectOut: EventEmitter<any> = new EventEmitter();

    name_key = IdTool.uuid();
    constructor(
        protected _router: Router,
        private route: ActivatedRoute,
        ) {
            super();
    }
    show(): void {
        (<any>$('#' + this.name_key)).modal('show');
    }
    hide(): void {
        (<any>$('#' + this.name_key)).modal('hide');
    }
    ngOnInit() {
        $('sd-idsysmenu').addClass('hbox stretch');
    }

    select() {
        const uuidArray: any = this.modal_tree.getAllSelect();
        this.selectOut.emit(uuidArray);
    }
}

