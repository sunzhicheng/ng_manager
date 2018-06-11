import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TreeComponent } from './tree';
import { DFModule } from '../df/df.module';



@NgModule({
  imports: [CommonModule, RouterModule, DFModule ],
  declarations: [TreeComponent],
  exports: [TreeComponent],
  providers: []
})
export class TreeModule { }
