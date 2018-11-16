import { Route } from '@angular/router';
import { DemoFormComponent } from './demo/demo.form';
import { DemoListComponent } from './demo/demo.list.component';
import { DemoHightchartsComponent } from './demo/demo.hightcharts';
import { DemoTreeAlertComponent } from './tree/demo.tree.alert';
import { DemoTreeInComponent } from './tree/demo.tree.in';
import { DemoTreeTableComponent } from './treetable/demo.tree.table';
import { MqttComponent } from './mqtt/mqtt.component';



export const DemoRoutes: Route[] = [
  { path: 'demo', component: DemoListComponent },
  { path: 'demo/mqtt', component: MqttComponent },
  { path: 'demo/hightcharts', component: DemoHightchartsComponent },
  { path: 'demo/form', component: DemoFormComponent },
  { path: 'demo/update/:uuid', component: DemoFormComponent },
  { path: 'demo/tree/alert', component: DemoTreeAlertComponent },
  { path: 'demo/tree/in', component: DemoTreeInComponent },
  { path: 'demo/tree/table', component: DemoTreeTableComponent }
];
