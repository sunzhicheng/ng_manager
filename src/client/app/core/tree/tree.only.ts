import { IUtils } from '../../shared/idorp/providers/IUtils';
import { Component, EventEmitter, OnInit, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { DfFromComponent } from '../df/df.component';
import { PromptUtil } from '../../shared/idorp/providers/PromptUtil';

// 不建议使用
declare let $: any;
// declare function $(filter: string): void;
/**
 * 新增修改  在本主键进行
 */
@Component({
  moduleId: module.id,
  selector: 'ng-tree-only',
  templateUrl: 'tree.only.html'
  // directives: [NgTableSortingDirective, NgClass, CORE_DIRECTIVES, PAGINATION_DIRECTIVES, PaginationComponent]
})
export class TreeOnlyComponent implements OnInit, OnChanges {

  @ViewChild('form')
  public form: DfFromComponent;

  @Output()
  public formSubmited: EventEmitter<any> = new EventEmitter();

  @Output()
  public treeDetailed: EventEmitter<any> = new EventEmitter();

  @Output()
  public treeDeleted: EventEmitter<any> = new EventEmitter();

  @Output()
  public itemClicked: EventEmitter<any> = new EventEmitter();

  @Output()
  public addNode: EventEmitter<any> = new EventEmitter();

  public ztree: any;

  @Input()
  public defaltSelect = false;

  public base_setting: any = {
    view: {
      addHoverDom: (treeId: any, treeNode: any) => { this.addHoverDom(treeId, treeNode); },
      removeHoverDom: this.removeHoverDom,
      selectedMulti: false,
    },
    check: {
      enable: false
    },
    data: {
      simpleData: {
        enable: true
      }
    },
    edit: {
      enable: false
    },
    callback: {
      onClick: (event: any, treeId: any, treeNode: any) => { this.treeItemClick(event, treeId, treeNode); }
      // onClick: this.treeItemClick
    }
  };

  public _tree_button_setting: any = {
    selectedMulti: false, //是否可多选
    addBtn: false, //增加按钮
    editBtn: false, //修改按钮
    deleteBtn: false//删除按钮
  };

  public _config: any = {
    title: '树结构标题',
    rootCreate: true,
    maxLevel: 5
  };

  public _treeData: any;

  public _treeFormData: any;

  public _treeConfig: any;

  public add_parentNode: any;
  public edit_id: any;

  public configInit = false;
  public setInit = false;
  public dataInit = false;

  public isAdd = true; //是否添加 否则为修改
  public current_edit: any;
  public current_del: any;
  public current_click_item: any; //当前点击的树

  isLock = false;

  ngOnInit() {
    (<any>window).tree_ts = this;
  }

  @Input()
  public set config(values: any) {
    this.configInit = true;
    IUtils.mergeAFromB(this._config, values, {});
    this.initTree();
  }

  @Input()
  public set tree_button_setting(values: any) {
    this.setInit = true;
    IUtils.mergeAFromB(this._tree_button_setting, values, {});
    this.initTree();
  }

  @Input()
  public set treeData(values: any) {
    this.dataInit = true;
    this._treeData = values;
    this.initTree();
  }

  @Input()
  public set treeFormData(values: any) {
    if (values) {
      this._treeFormData = values;
      this._treeFormData = values;
    }
  }

  @Input()
  public set treeConfig(values: any) {
    this._treeConfig = values;
  }

  public initTree() {
    if (this.configInit && this.setInit && this.dataInit) {
      const me = this;
      if (this._treeData) {
        this.ztree = (<any>$).fn.zTree.init($('#treeDemo'), me.base_setting, this._treeData);
        if (this.defaltSelect) {
          //初始化现实第一个数据
          const defaltSelectId = this.getFirstId();
          const node = this.ztree.getNodeByParam('id', defaltSelectId);
          this.ztree.selectNode(node);
          this.ztree.setting.callback.onClick(null, this.ztree.setting.treeId, node); //调用事件
        }
      }
    }
  }
  getFirstId() {
    const firstId = 0;
    for (const i in this._treeData) {
      const item: any = this._treeData[i];
      if (!item.isParent) {
        return item.id;
      }
    }
  }
  /**
   * 监控
   */
  public ngOnChanges(changes: SimpleChanges): void {
    // if(this.config) {
    //   $.fn.zTree.init($('#treeDemo'), null, null);
    // }
  }

  public toShowADU(parentNode: any) {
    this.add_parentNode = parentNode;
    (<any>$('#tree_modal')).modal('show');
  }

  formSubmit(formValue: any) {
    if (!this.isAdd && this.edit_id) {
      formValue.id = this.edit_id;
    }
    if (this.isAdd) {
      formValue.add_parentNode = this.add_parentNode;
    }
    this.formSubmited.emit(formValue);
    (<any>$('#tree_modal')).modal('hide');
  }

  public beforeReName(treeId: any, treeNode: any, newName: any, isCancel: any) {
    // this.toAdd();
    return false;
  }

  public addHoverDom(treeId: any, treeNode: any) {
    const aObj: any = $('#' + treeNode.tId + '_a');
    if ((<any>$)('#diyBtn_add_' + treeNode.id).length > 0) return;
    if ((<any>$)('#diyBtn_edit_' + treeNode.id).length > 0) return;
    if ((<any>$)('#diyBtn_delete_' + treeNode.id).length > 0) return;
    //添加
    if (treeNode.level < parseInt(this._config.maxLevel, 10)) {
      if ((<any>window).tree_ts._tree_button_setting.addBtn) {
        const addStr: any = '<span id=diyBtn_add_' +
          treeNode.id + ' ></span>';
        aObj.append(addStr);
        const addBtn: any = $('#diyBtn_add_' + treeNode.id);
        addBtn.addClass('button');
        addBtn.addClass('add');
        if (addBtn) {
          addBtn.unbind('click').bind('click', function () {
            (<any>window).tree_ts.addClick(treeNode);
          });
        }
      }
    }
    //修改
    if ((<any>window).tree_ts._tree_button_setting.editBtn) {
      const editStr: any = '<span id=diyBtn_edit_' +
        treeNode.id + ' ></span>';
      aObj.append(editStr);
      const editBtn: any = $('#diyBtn_edit_' + treeNode.id);
      editBtn.addClass('button');
      editBtn.addClass('edit');
      if (editBtn) {
        editBtn.unbind('click').click(function () {
          (<any>window).tree_ts.editClick(treeNode);
        });
      }
    }
    //删除
    if ((<any>window).tree_ts._tree_button_setting.deleteBtn) {
      const deleteStr: any = '<span id=diyBtn_delete_' +
        treeNode.id + ' ></span>';
      aObj.append(deleteStr);
      const deleteBtn: any = $('#diyBtn_delete_' + treeNode.id);
      deleteBtn.addClass('button');
      deleteBtn.addClass('remove');
      if (deleteBtn) {
        deleteBtn.unbind('click').click(function () {
          (<any>window).tree_ts.deleteClick(treeNode);
        });
      }
    }
  }

  public removeHoverDom(treeId: any, treeNode: any) {
    // if (treeNode.parentTId && treeNode.getParentNode().id!=1) return;
    if ((<any>window).tree_ts._tree_button_setting.addBtn) {
      (<any>$)('#diyBtn_add_' + treeNode.id).unbind().remove();
    }
    if ((<any>window).tree_ts._tree_button_setting.editBtn) {
      (<any>$)('#diyBtn_edit_' + treeNode.id).unbind().remove();
    }
    if ((<any>window).tree_ts._tree_button_setting.editBtn) {
      (<any>$)('#diyBtn_delete_' + treeNode.id).unbind().remove();
    }

  }

  public addClick(treeNode: any) {
    this.isAdd = true;
    this.isLock = true;
    // this._treeFormData = this._treeFormData;
    // this.form.form.reset(this._treeFormData);
    this.add_parentNode = treeNode;
    this.addNode.emit(treeNode ? treeNode.id : 0);
    // this.toShowADU(treeNode);
  }

  public editClick(treeNode: any) {
    this.isAdd = false;
    this.current_edit = treeNode;
    // this.isLock = true;
    //查询详情
    this.treeDetailed.emit(treeNode.id);
    // this._treeFormData = this._treeFormData;
    // this.toShowADU(null);
  }

  public deleteClick(treeNode: any) {
    const me: any = this;
    PromptUtil._confirm('确认要删除嘛？', function () {
      me.current_del = treeNode;
      me.treeDeleted.emit(treeNode.id);
    });
  }

  public toEdit(fromValue: any) {
    if (!fromValue.id) {
      alert('未传修改ID!!!');
      return;
    }
    this.edit_id = fromValue.id;
    this.form.reset(fromValue);
    // this._treeFormData = this.fromValue;
    this.toShowADU(null);
  }

  public editSuccess(name: string) {
    if (this.current_edit) {
      this.current_edit.name = name;
      this.ztree.updateNode(this.current_edit);
      this.ztree.selectNode(this.current_edit);
      this.ztree.setting.callback.onClick(null, this.ztree.setting.treeId, this.current_edit); //调用事件
    }
  }

  public addSuccess(newnode: any) {
    this.isLock = false;
    this.ztree.addNodes(this.add_parentNode, newnode);
    const node = this.ztree.getNodeByParam('id', newnode.id);
    this.ztree.selectNode(node);
    this.ztree.setting.callback.onClick(null, this.ztree.setting.treeId, node); //调用事件
  }

  public delSuccess() {
    if (this.current_del) {
      this.ztree.removeNode(this.current_del);
    }
  }

  public treeItemClick(event: any, treeId: any, treeNode: any) {
    if (!this.isLock) {
      if (treeNode && treeNode.id) {
        (<any>window).tree_ts.current_click_item = treeNode.id;
      }
      (<any>window).tree_ts.itemClicked.emit(treeNode);
    }
  }

  public getTreeItemClick() {
    return this.current_click_item;
  }

}
