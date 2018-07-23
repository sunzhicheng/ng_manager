import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IdSysUserComponent } from './idsysuser.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'idsysuser', component: IdSysUserComponent }
    ])
  ],
  exports: [RouterModule]
})
export class IdSysUserRoutingModule { }
