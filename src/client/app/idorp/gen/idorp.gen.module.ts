import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdorpGenComponent } from './idorp.gen.component';

import { IdRestyExamplesService } from './idexample/idrestyexamples.service';
import { IdRestyExamplesComponent } from './idexample/idrestyexamples.component';
import { IdRestyExamplesRoutingModule } from './idexample/idrestyexamples-routing';
import { IdorpGenRoutingModule } from './idorpgen-routing.1';
import { Ng2TableModule } from '../../core/table/ng-table-module';

/**
 * 管理自动生成数据列表
 * 自动生成代码，请不要修改，以防被覆盖丢失代码
 * IDORP CODE GEN
 */
@NgModule({
  imports: [CommonModule, IdorpGenRoutingModule, Ng2TableModule,
    IdRestyExamplesRoutingModule
  ],
  exports: [CommonModule, IdorpGenComponent,
    IdRestyExamplesComponent,
  ],
  declarations: [IdorpGenComponent,
    IdRestyExamplesComponent,
  ],
  entryComponents: [IdorpGenComponent,
    IdRestyExamplesComponent,
  ],
  providers: [
    IdRestyExamplesService
  ]
})
export class IdorpGenModule { }
