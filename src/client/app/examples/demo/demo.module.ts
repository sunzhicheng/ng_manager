import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormTableModule } from '../core/f-table/f-table.module';
import { SharedModule } from '../shared/shared.module';
import { TreeModule } from '../core/tree/tree.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalModule } from '../core/modal/modal.module';
import { DemoFormComponent } from './demo.form';
import { DemoService } from './demo.service';
import { DemoListComponent } from './demo.list.component';
import { HighChartsModule } from '../core/hightcharts/highcharts.module';
import { DemoHightchartsComponent } from './demo.hightcharts';
import { DemoTreeComponent } from './demo.tree';
import { DemoTreeOutComponent } from './demo.tree.out';
import { TreeTableModule } from '../core/tree-table/tree-table.module';
import { DemoTreeTableComponent } from './demo.tree.table';

/**
 * 商城模块 模块
 * 管理自动生成数据列表
 * 自动生成代码，文件存在则不重新生成
 * IDORP CODE GEN
 */
@NgModule({
  imports: [
    CommonModule, SharedModule, TreeModule, RouterModule,
    FormTableModule, ModalModule, HighChartsModule, TreeTableModule
  ],
  exports: [
    DemoFormComponent, DemoListComponent, DemoHightchartsComponent, DemoTreeComponent,
    DemoTreeOutComponent, DemoTreeTableComponent
  ],
  declarations: [
    DemoFormComponent, DemoListComponent, DemoHightchartsComponent, DemoTreeComponent,
    DemoTreeOutComponent, DemoTreeTableComponent
  ],
  entryComponents: [
    DemoFormComponent, DemoListComponent, DemoHightchartsComponent, DemoTreeComponent,
    DemoTreeOutComponent, DemoTreeTableComponent
  ],
  providers: [
    DemoService
  ]
})
export class DemoModule { }
