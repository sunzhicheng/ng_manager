import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DFModule } from '../df/df.module';
import { TreeAlertComponent } from './tree.alert';
import { TreeOutComponent } from './tree.out';


@NgModule({
  imports: [CommonModule, RouterModule, DFModule],
  declarations: [TreeAlertComponent, TreeOutComponent],
  exports: [TreeAlertComponent, TreeOutComponent],
  providers: []
})
export class TreeModule { }
