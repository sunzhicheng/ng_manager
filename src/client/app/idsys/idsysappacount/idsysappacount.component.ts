import { IdSysAppAcountService } from './idsysappacount.service';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { IdorpListComponent } from '../../shared/idorp/component/IdorpListComponent';
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
export class IdSysAppAcountComponent extends IdorpListComponent implements OnInit {


    opt_config: any = { del: { rowIndex: 5, value: '用户自建'} };

    constructor(public idAccountUser: IdSysAppAcountService,
        private _router: Router
        ) {
            super(idAccountUser);
    }
    ngOnInit(): void {
        this.log('idAccountUserComponent ngOnInit ');
        this.formData = this.idAccountUser.initListData();
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
}

