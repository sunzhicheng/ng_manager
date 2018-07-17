import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IdorpGenComponent } from './idorp.gen.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'codegen', component: IdorpGenComponent }
    ])
  ],
  exports: [RouterModule]
})
export class IdorpGenRoutingModule { }
