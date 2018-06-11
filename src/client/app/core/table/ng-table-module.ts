import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgTableComponent } from './ng-table.component';
import { NgTableFilteringDirective } from './ng-table-filtering.directive';
import { NgTablePagingDirective } from './ng-table-paging.directive';
import { NgTableSortingDirective } from './ng-table-sorting.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective],
  exports: [NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective]
})
export class Ng2TableModule {
}
