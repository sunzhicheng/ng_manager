import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormTableModule } from '../core/f-table/f-table.module';
import { SharedModule } from '../shared/shared.module';
import { TreeModule } from '../core/tree/tree.module';
import { RouterModule } from '@angular/router';
import { ModalModule } from '../core/modal/modal.module';
import { DemoFormComponent } from './demo/demo.form';
import { DemoService } from './demo/demo.service';
import { DemoListComponent } from './demo/demo.list.component';
import { HighChartsModule } from '../core/hightcharts/highcharts.module';
import { DemoHightchartsComponent } from './demo/demo.hightcharts';
import { DemoTreeAlertComponent } from './tree/demo.tree.alert';
import { DemoTreeInComponent } from './tree/demo.tree.in';
import { TreeTableModule } from '../core/tree-table/tree-table.module';
import { DemoTreeTableComponent } from './treetable/demo.tree.table';
import { MqttComponent } from './mqtt/mqtt.component';
import { IdMqttService } from '../shared/mqtt/IdMqttService';

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
    DemoFormComponent, DemoListComponent, DemoHightchartsComponent, DemoTreeAlertComponent,
    DemoTreeInComponent, DemoTreeTableComponent, MqttComponent
  ],
  declarations: [
    DemoFormComponent, DemoListComponent, DemoHightchartsComponent, DemoTreeAlertComponent,
    DemoTreeInComponent, DemoTreeTableComponent, MqttComponent
  ],
  entryComponents: [
    DemoFormComponent, DemoListComponent, DemoHightchartsComponent, DemoTreeAlertComponent,
    DemoTreeInComponent, DemoTreeTableComponent, MqttComponent
  ],
  providers: [
    DemoService, IdMqttService
  ]
})
export class DemoModule { }
