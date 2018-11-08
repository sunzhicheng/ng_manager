import { Component, ElementRef } from '@angular/core';
import { PromptUtil } from '../../shared/idorp/providers/PromptUtil';
import { TreeService } from '../../shared/idorp/service/TreeService';
import { LocalStorageCacheService } from '../../shared/idorp/cache/localstorage.service';
import { TreeComponent } from './tree.base';
/**
 * 新增修改  将在一个页面树右侧显示
 */
@Component({
  moduleId: module.id,
  selector: 'ng-tree-in',
  templateUrl: 'tree.in.html'
})
export class TreeInComponent extends TreeComponent {
  constructor(
    protected treeService: TreeService,
    protected eleRef: ElementRef,
    protected cacheService: LocalStorageCacheService) {
      super(treeService, eleRef, cacheService);
  }
  afterInit() {
    this.eleRef.nativeElement.className = 'hbox stretch';
    this.eleRef.nativeElement.parentElement.className = 'hbox stretch';
    if (this._config.defaltSelect) {
      //初始化现实第一个数据
      const nodes = this.ztree.getNodes();
      const defaltSelectNode = this.getFirstId(nodes);
      this.ztree.selectNode(defaltSelectNode);
      this.editClick(defaltSelectNode);
    } else {
      console.warn('TreeInComponent组件中defaltSelect 默认应该为true 配置信息不需要覆盖它');
    }
  }
  afterSubmit() {
    PromptUtil._success();
  }
  public toForm(parentNode: any) {
    this.log('');
  }
}
