import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IdRestyExamplesComponent } from './idrestyexamples.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'idrestyexamples', component: IdRestyExamplesComponent }
    ])
  ],
  exports: [RouterModule]
})
export class IdRestyExamplesRoutingModule { }
