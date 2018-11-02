import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgTableComponent } from './ng-table.component';
import { NgTableFilteringDirective } from './ng-table-filtering.directive';
import { NgTablePagingDirective } from './ng-table-paging.directive';
import { NgTableSortingDirective } from './ng-table-sorting.directive';
import { NgStaticTableComponent } from './ng-static-table.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NgTableComponent, NgStaticTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective],
  exports: [NgTableComponent, NgStaticTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective]
})
export class Ng2TableModule {
}
