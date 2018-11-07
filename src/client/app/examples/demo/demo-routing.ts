import { Route } from '@angular/router';
import { DemoFormComponent } from './demo.form';
import { DemoListComponent } from './demo.list.component';
import { DemoHightchartsComponent } from './demo.hightcharts';
import { DemoTreeAlertComponent } from './demo.tree.alert';
import { DemoTreeInComponent } from './demo.tree.in';
import { DemoTreeTableComponent } from './demo.tree.table';



export const DemoRoutes: Route[] = [
  { path: 'demo', component: DemoListComponent },
  { path: 'demo/hightcharts', component: DemoHightchartsComponent },
  { path: 'demo/form', component: DemoFormComponent },
  { path: 'demo/update/:uuid', component: DemoFormComponent },
  { path: 'demo/tree/alert', component: DemoTreeAlertComponent },
  { path: 'demo/tree/in', component: DemoTreeInComponent },
  { path: 'demo/tree/table', component: DemoTreeTableComponent }
];
