import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { TreeModule } from '../tree/tree.module';
import { TreeTableComponent } from './tree-table';
import { FormTableModule } from '../f-table/f-table.module';


@NgModule({
  imports: [CommonModule,
    FormsModule,
    SharedModule,
    TreeModule,
    FormTableModule ],
  declarations: [TreeTableComponent],
  exports: [TreeTableComponent]
})
export class TreeTableModule { }
