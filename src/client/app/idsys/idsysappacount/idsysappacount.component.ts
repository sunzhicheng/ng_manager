import { IdSysAppAcountService } from './idsysappacount.service';
import { Component, OnInit, AfterContentChecked, ElementRef } from '@angular/core';
import { ListBaseComponent } from '../../shared/idorp/component/ListBaseComponent';
import { Router } from '@angular/router';
import { SysEvent } from '../../shared/idorp/event/sys.event';



@Component({
    moduleId: module.id,
    selector: 'sd-idsysappacount',
    templateUrl: 'idsysappacount.component.html',
})

/**
 * 系统模块 运营管理人员 组件
 */
export class IdSysAppAcountComponent extends ListBaseComponent {


    opt_config: any = { del: { rowIndex: 5, value: '用户自建'} };

    constructor(public idAccountUser: IdSysAppAcountService,
        protected eleRef: ElementRef,
        private _router: Router
        ) {
            super(idAccountUser, eleRef);
    }
    myInit(): void {
        this.listFormData = this.idAccountUser.initListData();
    }

    beforeQuery(entry: any) {
        return entry;
    }

    getAllCheckedV(checked: string) {
      this.log('  getAllCheckedV: ' + checked);
    }

    update(id: any) {
      this.log('  update id : ' + id);
      const link = ['home/idsysappacount/update', id.toString()];
      this._router.navigate(link);
    }
}

