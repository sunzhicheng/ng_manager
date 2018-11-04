import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AuthService } from '../shared/tool/AuthService';
import { DemoFormComponent } from './demo.form';
import { DemoListComponent } from './demo.list.component';
import { DemoHightchartsComponent } from './demo.hightcharts';
import { DemoTreeComponent } from './demo.tree';
import { DemoTreeOutComponent } from './demo.tree.out';
import { DemoTreeTableComponent } from './demo.tree.table';



export const DemoRoutes: Route[] = [
  { path: 'demo', component: DemoListComponent },
  { path: 'demo/hightcharts', component: DemoHightchartsComponent },
  { path: 'demo/form', component: DemoFormComponent },
  { path: 'demo/update/:uuid', component: DemoFormComponent },
  { path: 'demo/tree', component: DemoTreeComponent },
  { path: 'demo/tree/out', component: DemoTreeOutComponent },
  { path: 'demo/tree/table', component: DemoTreeTableComponent }
];
