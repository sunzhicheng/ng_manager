import { ReactiveFormsModule } from '@angular/forms';
import { IdSysModule } from './../../sys/sys.module';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { TopNavModule, SideBarModule } from '../index';
import { IndexComponent } from './index.component';
import { TreeModule } from '../../core/tree/tree.module';
import { Ng2TableModule } from '../../core/table/ng-table-module';
import { DemoModule } from '../../examples/demo.module';

@NgModule({
  imports: [HomeRoutingModule, ReactiveFormsModule,
    //公共
    CommonModule, SharedModule, SideBarModule,
    TreeModule, Ng2TableModule, TopNavModule,
    //系统
    IdSysModule,
    //以下是  演示模块  可以删除
    DemoModule,
  ],
  declarations: [HomeComponent, IndexComponent],
  exports: [HomeComponent, IndexComponent]
})
export class HomeModule { }
