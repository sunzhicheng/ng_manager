import { Component, OnInit } from '@angular/core';


import { IdSysUserTypeComponent } from './idsysusertype/idsysusertype.component';
import { IdSysUserComponent } from './idsysuser/idsysuser.component';



@Component({
    moduleId: module.id,
    selector: 'sd-idsys',
    templateUrl: 'idsys.gen.component.html'
})

/**
 *  系统模块 模块组件
 *  自动生成组件演示
 */
export class IdSysComponent implements OnInit {

    items = [
        {
          'title': 'IdSysUserType',
          'icon': 'angular',
          'description': 'IdSys',
          'color': '#E63135',
          comp: IdSysUserTypeComponent
        },
        {
          'title': 'IdSysUser',
          'icon': 'angular',
          'description': 'IdSys',
          'color': '#E63135',
          comp: IdSysUserComponent
        },
    ];

     // tslint:disable-next-line:no-empty
    constructor() { }

    // tslint:disable-next-line:no-empty
    ngOnInit(): void { }

    openNavDetailsPage(item: any) {
        // this.nav.push(item.comp, { item: item });
    }
}
