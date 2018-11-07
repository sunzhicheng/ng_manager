import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DFModule } from '../df/df.module';
import { TreeAlertComponent } from './tree.alert';
import { TreeInComponent } from './tree.in';


@NgModule({
  imports: [CommonModule, RouterModule, DFModule],
  declarations: [TreeAlertComponent, TreeInComponent],
  exports: [TreeAlertComponent, TreeInComponent],
  providers: []
})
export class TreeModule { }
