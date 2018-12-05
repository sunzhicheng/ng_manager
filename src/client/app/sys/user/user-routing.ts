import { Route } from '@angular/router';
import { UserComponent } from './user.component';
import { UserFormComponent } from './user.form';
import { AuthAvtivate } from '../../shared/activate/AuthActivate';



export const UserRoutes: Route[] = [
  { path: 'user', component: UserComponent},
  { path: 'user/add', component: UserFormComponent, canActivate: [AuthAvtivate]},
  { path: 'user/update/:uuid', component: UserFormComponent, canActivate: [AuthAvtivate] },
];
