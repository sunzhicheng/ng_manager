import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IdSysComponent } from './idsys.gen.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'idsys', component: IdSysComponent }
    ])
  ],
  exports: [RouterModule]
})
export class IdSysRoutingModule { }

