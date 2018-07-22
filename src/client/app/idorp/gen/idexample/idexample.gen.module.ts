
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdexampleGenComponent } from './idexample.gen.component';

import { IdRestyExamplesService } from './idrestyexamples/idrestyexamples.service';
import { IdRestyExamplesComponent } from './idrestyexamples/idrestyexamples.component';
import { IdRestyExamplesRoutingModule } from './idrestyexamples/idrestyexamples-routing';
import { IdexampleGenRoutingModule } from './idexample-gen-routing';
import { Ng2TableModule } from '../../../core/table/ng-table-module';

/**
 * 管理自动生成数据列表
 * 自动生成代码，请不要修改，以防被覆盖丢失代码
 * IDORP CODE GEN
 */
@NgModule({
  imports: [CommonModule, IdexampleGenRoutingModule, Ng2TableModule,
    IdRestyExamplesRoutingModule
  ],
  exports: [CommonModule, IdexampleGenComponent,
    IdRestyExamplesComponent,
  ],
  declarations: [IdexampleGenComponent,
    IdRestyExamplesComponent,
  ],
  entryComponents: [IdexampleGenComponent,
    IdRestyExamplesComponent,
  ],
  providers: [
    IdRestyExamplesService
  ]
})
export class IdexampleGenModule {   }
