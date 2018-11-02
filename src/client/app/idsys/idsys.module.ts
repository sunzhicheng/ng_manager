import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormTableModule } from '../core/f-table/f-table.module';
import { TreeModule } from '../core/tree/tree.module';
import { IdSysAppAcountComponent } from './idsysappacount/idsysappacount.component';
import { IdSysAccountFormComponent } from './idsysappacount/idsysappacount.form';
import { IdSysAppAcountService } from './idsysappacount/idsysappacount.service';
import { LoginService } from './login/login.service';
import { OperateLoginComponent } from './login/operate.login.component';
import { IdSysMenuComponent } from './idsysmenu/idsysmenu.component';
import { IdSysMenuFormComponent } from './idsysmenu/idsysmenu.form';
import { ModalMenuComponent } from './idsysmenu/modal.menu.component';

/**
 * 系统模块 模块
 * 管理自动生成数据列表
 * 自动生成代码，文件存在则不重新生成
 * IDORP CODE GEN
 */
@NgModule({
  imports: [
    CommonModule, SharedModule, TreeModule, RouterModule,
    FormTableModule
  ],
  exports: [
    OperateLoginComponent, IdSysAccountFormComponent, IdSysAppAcountComponent,
    IdSysMenuComponent, IdSysMenuFormComponent, ModalMenuComponent
  ],
  declarations: [
    OperateLoginComponent, IdSysAccountFormComponent, IdSysAppAcountComponent,
    IdSysMenuComponent, IdSysMenuFormComponent, ModalMenuComponent
  ],
  entryComponents: [
    OperateLoginComponent, IdSysAccountFormComponent, IdSysAppAcountComponent,
    IdSysMenuComponent, IdSysMenuFormComponent, ModalMenuComponent
  ],
  providers: [
    LoginService,
    IdSysAppAcountService,
  ],
})
export class IdSysModule { }
