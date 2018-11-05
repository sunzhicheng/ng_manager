import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DFModule } from '../df/df.module';
import { TreeInComponent } from './tree.in';
import { TreeOutComponent } from './tree.out';


@NgModule({
  imports: [CommonModule, RouterModule, DFModule],
  declarations: [TreeInComponent, TreeOutComponent],
  exports: [TreeInComponent, TreeOutComponent],
  providers: []
})
export class TreeModule { }
