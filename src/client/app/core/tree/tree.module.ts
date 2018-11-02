import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DFModule } from '../df/df.module';
import { TreeInComponent } from './tree.in';


@NgModule({
  imports: [CommonModule, RouterModule, DFModule],
  declarations: [TreeInComponent],
  exports: [TreeInComponent],
  providers: []
})
export class TreeModule { }
