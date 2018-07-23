import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IdSysUserTypeComponent } from './idsysusertype.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'idsysusertype', component: IdSysUserTypeComponent }
    ])
  ],
  exports: [RouterModule]
})
export class IdSysUserTypeRoutingModule { }
