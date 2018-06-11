import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ToolGpbService } from '../../shared/tool/tool-gpb.service';
import { ToolHttpService } from '../../shared/tool/tool-http.service';
import { FormTableComponent } from '../f-table/f-table.component';
import { TreeComponent } from '../tree/tree';

// 不建议使用
declare let $: any;

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-tree-table',
  templateUrl: 'tree-table.html'
})

export class TreeTableComponent implements OnInit {

  @ViewChild(TreeComponent)
  public tree: TreeComponent;

  @Input()
  public config: any = {
    title: '树结构标题',
    rootCreate: true
  };

  @Input()
  public tree_data: any;

  // 表单数据
  @Input()
  public formData: any;

  //表格操作功能
  @Input()
  public opt_config: any;

  @Input()
  public treeFormData_add: any;

  @Input()
  public treeFormData_edit: any;

  @Input()
  public tree_setting: any;

  @Output()
  public formSubmited: EventEmitter<any> = new EventEmitter();

  @Output()
  public formSubmit_added: EventEmitter<any> = new EventEmitter();

  @Output()
  public treeDetailed: EventEmitter<any> = new EventEmitter();

  @Output()
  public treeDeleted: EventEmitter<any> = new EventEmitter();

  @Output()
  public itemClicked: EventEmitter<any> = new EventEmitter();

  @Output()
  public loadDataOut: EventEmitter<any> = new EventEmitter();

  @Output()
  public delOut: EventEmitter<any> = new EventEmitter();

  @Output()
  public unbindOut: EventEmitter<any> = new EventEmitter();

  @ViewChild(FormTableComponent)
  public formTable: FormTableComponent;

  public breadcrumb = false;

  constructor(private toolHttp: ToolHttpService,
              private toolGpb: ToolGpbService,
              private _router: Router) {
  }

  ngOnInit() {
    const index_cmp: any = $('sd-tree-table');
    index_cmp.addClass('hbox stretch');
    const parent_cmp: any = index_cmp.parent();
    parent_cmp.addClass('hbox stretch');
  }

  formSubmit(formValue: any) {
    // console.log('FormTableComponent  formSubmit : ' + formValue);
    this.formSubmited.emit(formValue);
  }

  formSubmit_add(formValue: any) {
    this.formSubmit_added.emit(formValue);
  }

  treeDetail(formValue: any) {
    this.treeDetailed.emit(formValue);
  }

  treeDelete(formValue: any) {
    this.treeDeleted.emit(formValue);
  }

  itemClick(formValue: any) {
    this.itemClicked.emit(formValue);
  }

  loadData(pager: any) {
    this.loadDataOut.emit(pager);
  }

  del(id: any) {
    this.delOut.emit(id);
  }

  getFromValue() {
    return this.formTable.getFromValue();
  }

  toEdit(formData: any) {
    this.tree.toEdit(formData);
  }

  editSuccess(name: string) {
    this.tree.editSuccess(name);
  }

  public addSuccess(newnode: any) {
    this.tree.addSuccess(newnode);
  }

  public delSuccess() {
    this.tree.delSuccess();
  }

  public bind() {
    console.log('bind');
  }

  public unbind(id: any) {
    this.unbindOut.emit(id);
  }

  /**
   * 获取树当前选择的节点id
   * @returns {*}
     */
  public getTreeItemClick() {
    return this.tree.getTreeItemClick();
  }

}
