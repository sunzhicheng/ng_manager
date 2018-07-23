import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2TableModule } from '../../../core/table/ng-table-module';

import { IdSysComponent } from './idsys.gen.component';
import { IdSysRoutingModule } from './idsys.gen-routing';

import { IdSysUserTypeService } from './idsysusertype/idsysusertype.service';
import { IdSysUserTypeComponent } from './idsysusertype/idsysusertype.component';
import { IdSysUserTypeRoutingModule } from './idsysusertype/idsysusertype-routing';
import { IdSysUserService } from './idsysuser/idsysuser.service';
import { IdSysUserComponent } from './idsysuser/idsysuser.component';
import { IdSysUserRoutingModule } from './idsysuser/idsysuser-routing';

/**
 * 系统模块 模块
 * 管理自动生成数据列表
 * 自动生成代码，文件存在则不重新生成
 * IDORP CODE GEN
 */
@NgModule({
  imports: [CommonModule, Ng2TableModule, IdSysRoutingModule,
    IdSysUserTypeRoutingModule,
    IdSysUserRoutingModule,
  ],
  exports: [CommonModule, IdSysComponent,
    IdSysUserTypeComponent,
    IdSysUserComponent,
  ],
  declarations: [IdSysComponent,
    IdSysUserTypeComponent,
    IdSysUserComponent,
  ],
  entryComponents: [IdSysComponent,
    IdSysUserTypeComponent,
    IdSysUserComponent,
  ],
  providers: [
    IdSysUserTypeService,
    IdSysUserService,
  ]
})
export class IdSysModule { }
