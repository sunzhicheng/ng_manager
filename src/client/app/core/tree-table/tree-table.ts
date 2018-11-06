import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { FormTableComponent } from '../f-table/f-table.component';
import { TreeInComponent } from '../tree/tree.in';
import { IUtils } from '../../shared/idorp/providers/IUtils';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-tree-table',
  templateUrl: 'tree-table.html'
})

export class TreeTableComponent implements OnInit {

  @ViewChild(TreeInComponent)
  public tree: TreeInComponent;

  _config: any = {
    title: '树结构标题',
    rootCreate: false,
    defaltSelect: true,
  };

  @Input()
  public set config(values: any) {
      IUtils.coverAFromB(this._config, values);
  }

  @Input()
  public async_config: any;
  @Input()
  public tree_data: any;

  // 表单数据
  @Input()
  public formData: any;

  //表格操作功能
  @Input()
  public opt_config: any;

  @Input()
  public treeFormData: any;

  @Input()
  public tree_button_setting: any;

  @Output()
  public listSubmited: EventEmitter<any> = new EventEmitter();

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

  @Output()
  public updateOut: EventEmitter<any> = new EventEmitter();
  

  @ViewChild(FormTableComponent)
  public formTable: FormTableComponent;

  public breadcrumb = false;

  constructor(
    private eleRef: ElementRef,
    private _router: Router) {
  }

  ngOnInit() {
    this.eleRef.nativeElement.className = 'hbox stretch';
    this.eleRef.nativeElement.parentElement.className = 'hbox stretch';
  }

  listSubmit(formValue: any) {
    // console.log('FormTableComponent  formSubmit : ' + formValue);
    this.listSubmited.emit(formValue);
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
  public update(id: any) {
    this.updateOut.emit(id);
  }

  /**
   * 获取树当前选择的节点id
   * @returns {*}
     */
  public getTreeItemClick() {
    return this.tree.getTreeItemClick();
  }

}
