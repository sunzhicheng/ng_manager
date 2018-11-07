import { IdSysAppAcountService } from './idsysappacount.service';
import { Component, ElementRef } from '@angular/core';
import { ListBaseComponent } from '../../shared/idorp/component/ListBaseComponent';
import { Router } from '@angular/router';



@Component({
    moduleId: module.id,
    selector: 'sd-idsysappacount',
    templateUrl: 'idsysappacount.component.html',
})

/**
 * 系统模块 运营管理人员 组件
 */
export class IdSysAppAcountComponent extends ListBaseComponent {



    constructor(public idAccountUser: IdSysAppAcountService,
        protected eleRef: ElementRef,
        private _router: Router
        ) {
            super(idAccountUser, eleRef);
    }
    myInit(): void {
        this.listFormData = this.idAccountUser.initListData();
    }
    //所有列表可以重用的方法  start   关于  enable  stop del 已经默认实现  具体参数格式看父类ListBaseComponent
    beforeQuery(entry: any) {
        return entry;
    }
    unbind(uuid: any) {
        this.log('父类空方法 unbind uuid : ' + uuid);
    }
    bind(uuid: any) {
        this.log('父类空方法 bind uuid : ' + uuid);
    }
    view(uuid: any) {
        this.log('父类空方法 view uuid : ' + uuid);
    }
    getAllCheckedV(checked: string) {
      this.log('  getAllCheckedV: ' + checked);
    }

    update(id: any) {
      this.log('  update id : ' + id);
      const link = ['home/idsysappacount/update', id.toString()];
      this._router.navigate(link);
    }
    //所有列表可以重用的方法  end
}

