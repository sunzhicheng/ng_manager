import { Route } from '@angular/router';
import { IdSysAppAcountComponent } from './idsysappacount.component';
import { IdSysAccountFormComponent } from './idsysappacount.form';
import { AuthService } from '../../shared/tool/AuthService';



export const IdSysAcountRoutes: Route[] = [
  { path: 'idsysappacount', component: IdSysAppAcountComponent},
  { path: 'idsysappacount/add', component: IdSysAccountFormComponent, canActivate: [AuthService]},
  { path: 'idsysappacount/update/:uuid', component: IdSysAccountFormComponent, canActivate: [AuthService] },
];
