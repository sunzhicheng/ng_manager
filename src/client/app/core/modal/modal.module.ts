import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TreeModule } from '../tree/tree.module';
import { ModalTreeComponent } from './modal.tree.component';
import { ModalFormComponent } from './modal.form.component';
import { DFModule } from '../df/df.module';
import { ModalTableComponent } from './modal.table.component';
import { Ng2TableModule } from '../table/ng-table-module';


@NgModule({
  imports: [CommonModule, RouterModule, TreeModule, DFModule, Ng2TableModule],
  declarations: [ModalTreeComponent, ModalFormComponent, ModalTableComponent],
  exports: [ModalTreeComponent, ModalFormComponent, ModalTableComponent],
  entryComponents: [ModalTreeComponent, ModalFormComponent, ModalTableComponent],
  providers: []
})
export class ModalModule { }
