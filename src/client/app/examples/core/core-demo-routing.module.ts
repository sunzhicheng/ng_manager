import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreDemoComponent } from './core-demo.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'coredemo', component: CoreDemoComponent }
    ])
  ],
  exports: [RouterModule]
})
export class CoreDemoRoutingModule { }
