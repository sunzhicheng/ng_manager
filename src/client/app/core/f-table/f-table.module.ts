import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormTableComponent } from './f-table.component';
import { FormFormComponent } from './f-form.component';
import { DFModule } from '../df/df.module';

import { Ng2TableModule } from '../table/ng-table-module';



@NgModule({
  imports: [CommonModule, RouterModule, DFModule, Ng2TableModule],
  declarations: [FormTableComponent, FormFormComponent],
  exports: [FormTableComponent, FormFormComponent],
  providers: []
})
export class FormTableModule { }
