import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { IdorpListComponent } from '../shared/idorp/component/IdorpListComponent';
import { Router } from '@angular/router';
import { DemoService } from './demo.service';
import { ViewChild } from '@angular/core';
import { ModalFormComponent } from '../core/modal/modal.form.component';
import { ModalTableComponent } from '../core/modal/modal.table.component';
import { SysEvent } from '../shared/idorp/event/sys.event';
import { of, fromEvent, interval, Observable, timer, forkJoin, combineLatest } from 'rxjs';
import { mergeMap, map, debounceTime, scan, distinctUntilChanged, mapTo, concatMap, concat, pairwise, switchMap } from 'rxjs/operators';
declare let $: any;


@Component({
    moduleId: module.id,
    selector: 'sd-idsysappacount',
    template: `
    <f-table-cmp  *ngIf="formData" [formData]="formData"
    (formSubmited)="formSubmit($event)" (loadDataOut)="loadData($event)" (updateOut)="update($event)"
    (delOut)="del($event)" (bindOut)="bind($event)"  [opt_config]="opt_config"
    (btnclickout)="btnClick($event)"
    [config]="{permissoinBase:'business:idsysappacount,operate:idsysappacount',maxLengthData:20}"
    >
    </f-table-cmp>

    <input type="text" id="rxjstest_input" />
    <button type="button"  class="btn btn-primary" id="rxjstest_button" >rxjstest</button>


    <from-modal [config]="{title:'demo表单弹出框'}"  (valueOut)="modalFormSubmit($event)"></from-modal>
    <modal-table [config]="{title:'demo表单弹出框',proto: 'idsys.IdSysBankEntry',request_url: '/idsys/web/idsysbank/query'}"
      (valueOut)="modalTableSubmit($event)"></modal-table>
    `
})

/**
 * demo模块
 */
export class DemoListComponent extends IdorpListComponent implements OnInit {


    @ViewChild(ModalFormComponent)
    public modalFrom: ModalFormComponent;
    @ViewChild(ModalTableComponent)
    public modalTable: ModalTableComponent;
    opt_config: any = { del: { rowIndex: 5, value: '用户自建' } };

    constructor(public demoService: DemoService,
        private sysEvent: SysEvent,
        private _router: Router
    ) {
        super(demoService);
        sysEvent.subscribeRoute((data: any) => {
            this.log('sysEvent ::  route ' + JSON.stringify(data));
        });
    }
    ngOnInit(): void {
        // this.queryMethod = 'queryTest';  //修改了以method结尾的参数  必须保证service中存在该方法
        this.log('idAccountUserComponent ngOnInit ');
        this.formData = this.demoService.initListData();
        this.query();
        // 刷新菜单
        // this.toolHttp.sideBarUpdate('AIC_SYS_WEB_AIC_GROUP_LIST_QUERY');
    }

    beforeQuery() {
        this.log('搜索之前需要的业务需求');
    }

    getAllCheckedV(checked: string) {
        this.log('  getAllCheckedV: ' + checked);
    }

    update(id: any) {
        this.log('  update id : ' + id);
        const link = ['home/idsysappacount/update', id.toString()];
        this._router.navigate(link);
    }
    btnClick(item: any) {
        if (item.key === 'modalForm') {
            this.modalFrom.setFromData(this.demoService.initModalFormData());
            this.modalFrom.run();
        } else if (item.key === 'modalTable') {
            this.modalTable.run();
        } else if (item.key === 'modallogin') {
            (<any>$('#tokenInvaildDiv')).modal('show');
        }
    }
    modalFormSubmit(data: any) {
        alert('表单提交数据 : ' + JSON.stringify(data));
    }
    modalTableSubmit(data: any) {
        alert('列表选择数据 : ' + JSON.stringify(data));
    }
}

