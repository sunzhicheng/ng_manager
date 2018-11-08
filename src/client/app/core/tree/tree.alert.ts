import { Component, ElementRef } from '@angular/core';
import * as _ from 'lodash';
import { LocalStorageCacheService } from '../../shared/idorp/cache/localstorage.service';
import { TreeService } from '../../shared/idorp/service/TreeService';
import { TreeComponent } from './tree.base';

declare const $: any;
/**
 * 树表单的新增和修改将以弹框的形式出现
 */
@Component({
  moduleId: module.id,
  selector: 'ng-tree-alert',
  templateUrl: 'tree.alert.html'
  // directives: [NgTableSortingDirective, NgClass, CORE_DIRECTIVES, PAGINATION_DIRECTIVES, PaginationComponent]
})
export class TreeAlertComponent extends TreeComponent {
  constructor(
    protected treeService: TreeService,
    protected eleRef: ElementRef,
    protected cacheService: LocalStorageCacheService) {
    super(treeService, eleRef, cacheService);
  }
  afterInit() {
    this.eleRef.nativeElement.className = 'vbox';
    if (this._config.defaltSelect) {
      //初始化现实第一个数据
      const nodes = this.ztree.getNodes();
      const defaltSelectNode = this.getFirstId(nodes);
      this.ztree.selectNode(defaltSelectNode);
      this.ztree.setting.callback.onClick(null, this.ztree.setting.treeId, defaltSelectNode); //调用事件
    }
  }
  public toForm(parentNode: any) {
    (<any>$('#tree_modal')).modal('show');
  }
  afterSubmit() {
    (<any>$('#tree_modal')).modal('hide');
  }
}
