import { Route } from '@angular/router';
import { IdSysMenuComponent } from './idsysmenu.component';
import { IdSysMenuFormComponent } from './idsysmenu.form';



export const IdSysMenuRoutes: Route[] = [
  { path: 'idsysmenu', component: IdSysMenuComponent,
    children: [
      { path: 'update/:id', component: IdSysMenuFormComponent },
      // { path: 'add/:id', component: IdSysMenuFormComponent }
    ]
  }
];
