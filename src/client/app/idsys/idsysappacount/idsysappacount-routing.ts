import { Route } from '@angular/router';
import { IdSysAppAcountComponent } from './idsysappacount.component';
import { IdSysAccountFormComponent } from './idsysappacount.form';
import { AuthAvtivate } from '../../shared/tool/AuthActivate';



export const IdSysAcountRoutes: Route[] = [
  { path: 'idsysappacount', component: IdSysAppAcountComponent},
  { path: 'idsysappacount/add', component: IdSysAccountFormComponent, canActivate: [AuthAvtivate]},
  { path: 'idsysappacount/update/:uuid', component: IdSysAccountFormComponent, canActivate: [AuthAvtivate] },
];
