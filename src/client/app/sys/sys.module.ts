import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormTableModule } from '../core/f-table/f-table.module';
import { TreeModule } from '../core/tree/tree.module';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user/user.form';
import { UserService } from './user/user.service';
import { LoginService } from './login/login.service';
import { OperateLoginComponent } from './login/operate.login.component';
import { MenuComponent } from './menu/menu.component';
import { MenuService } from './menu/menu.service';
import { LoginAlterComponent } from './login/login.alter.component';
import { FormsModule } from '@angular/forms';

/**
 * 系统模块 模块
 * 管理自动生成数据列表
 * 自动生成代码，文件存在则不重新生成
 * IDORP CODE GEN
 */
@NgModule({
  imports: [
    CommonModule, SharedModule, TreeModule, RouterModule, FormsModule,
    FormTableModule
  ],
  exports: [
    OperateLoginComponent, LoginAlterComponent, UserFormComponent, UserComponent,
    MenuComponent,
  ],
  declarations: [
    OperateLoginComponent, LoginAlterComponent, UserFormComponent, UserComponent,
    MenuComponent,
  ],
  entryComponents: [
    OperateLoginComponent, LoginAlterComponent, UserFormComponent, UserComponent,
    MenuComponent,
  ],
  providers: [
    LoginService, MenuService,
    UserService,
  ],
})
export class IdSysModule { }
