import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IdexampleGenComponent } from './idexample.gen.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'idexample', component: IdexampleGenComponent }
    ])
  ],
  exports: [RouterModule]
})
export class IdexampleGenRoutingModule { }
