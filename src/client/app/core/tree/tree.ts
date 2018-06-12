import { Component, EventEmitter, OnInit, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ToolHttpService, ToolGpbService } from '../../shared/tool/index';
import { DfFromComponent } from '../df/df.component';

// 不建议使用
declare let $: any;
// declare function $(filter: string): void;

@Component({
  moduleId: module.id,
  selector: 'ng-tree',
  templateUrl: 'tree.html'
  // directives: [NgTableSortingDirective, NgClass, CORE_DIRECTIVES, PAGINATION_DIRECTIVES, PaginationComponent]
})
export class TreeComponent implements OnInit, OnChanges {

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

  public ztree: any;

  public style_top: any = '0px';

  public base_setting: any = {
    view: {
      addHoverDom: (treeId: any, treeNode: any) => { this.addHoverDom(treeId, treeNode); },
      removeHoverDom: this.removeHoverDom,
      selectedMulti: false
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
      onClick: this.treeItemClick
    }
  };

  public _tree_setting: any = {
    selectedMulti: false, //是否可多选
    addBtn: false, //增加按钮
    editBtn: false, //修改按钮
    deleteBtn: false//删除按钮
  };

  public _config: any = {
    title: '树结构标题',
    rootCreate: true,
    maxLevel: 5,
    showhead: true,
    useform: false//是否使用表单
  };

  public _treeData: any;

  public _treeFormData: any;
  public _treeFormData_add: any;
  public _treeFormData_edit: any;

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


  ngOnInit() {
    const index_cmp: any = $('sd-tree-table ng-tree');
    if (index_cmp.length > 0) {
      this.style_top = '55px';
    }
    index_cmp.addClass('vbox');
    (<any>window).tree_ts = this;
  }



  @Input()
  public set config(values: any) {
    this.configInit = true;
    this.toolHttp.mergeAFromB(this._config, values, {});
    this.initTree();
  }

  @Input()
  public set tree_setting(values: any) {
    this.setInit = true;
    this.toolHttp.mergeAFromB(this._tree_setting, values, {});
    this.initTree();
  }

  @Input()
  public set treeData(values: any) {
    this.dataInit = true;
    this._treeData = values;
    this.initTree();
  }

  @Input()
  public set treeFormData_add(values: any) {
    if (values) {
      this._treeFormData_add = values;
      this._treeFormData = values;
    }
  }

  @Input()
  public set treeFormData_edit(values: any) {
    if (values) {
      this._treeFormData_edit = values;
    }
  }

  @Input()
  public set treeConfig(values: any) {
    this._treeConfig = values;
  }

  constructor(private toolHttp: ToolHttpService,
              public toolGpb: ToolGpbService) {
  }

  public initTree() {
    if (this.configInit && this.setInit && this.dataInit) {
      const me = this;
      if (this._treeData) {
        this.ztree = (<any>$).fn.zTree.init($('#treeDemo'), me.base_setting, this._treeData);
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
    // tslint:disable-next-line:radix
    if (treeNode.level < parseInt(this._config.maxLevel)) {
      if ((<any>window).tree_ts._tree_setting.addBtn) {
        const editStr: any = '<span id=diyBtn_add_' +
          treeNode.id + ' ></span>';
        aObj.append(editStr);
        const btn: any = $('#diyBtn_add_' + treeNode.id);
        btn.addClass('button');
        btn.addClass('add');
        if (btn) {
          btn.unbind('click').bind('click', function() {
            (<any>window).tree_ts.addClick(treeNode);
          });
        }
      }
    }
    //修改
    if ((<any>window).tree_ts._tree_setting.editBtn) {
      const editStr: any = '<span id=diyBtn_edit_' +
        treeNode.id + ' ></span>';
      aObj.append(editStr);
      const btn: any = $('#diyBtn_edit_' + treeNode.id);
      btn.addClass('button');
      btn.addClass('edit');
      if (btn) {
        btn.unbind('click').click(function () {
          (<any>window).tree_ts.editClick(treeNode);
        });
      }
    }
    //删除
    if ((<any>window).tree_ts._tree_setting.deleteBtn) {
      const deleteStr: any = '<span id=diyBtn_delete_' +
        treeNode.id + ' ></span>';
      aObj.append(deleteStr);
      const btn: any = $('#diyBtn_delete_' + treeNode.id);
      btn.addClass('button');
      btn.addClass('remove');
      if (btn) {
        btn.unbind('click').click(function () {
          (<any>window).tree_ts.deleteClick(treeNode);
        });
      }
    }
  }

  public removeHoverDom(treeId: any, treeNode: any) {
    // if (treeNode.parentTId && treeNode.getParentNode().id!=1) return;
    if ((<any>window).tree_ts._tree_setting.addBtn) {
      (<any>$)('#diyBtn_add_' + treeNode.id).unbind().remove();
    }
    if ((<any>window).tree_ts._tree_setting.editBtn) {
      (<any>$)('#diyBtn_edit_' + treeNode.id).unbind().remove();
    }
    if ((<any>window).tree_ts._tree_setting.editBtn) {
      (<any>$)('#diyBtn_delete_' + treeNode.id).unbind().remove();
    }

  }

  public addClick(treeNode: any) {
    this.isAdd = treeNode;
    // this._treeFormData = this._treeFormData_add;
    this.form.form.reset(this._treeFormData_add);
    this.toShowADU(treeNode);
  }

  public editClick(treeNode: any) {
    this.isAdd = false;
    this.current_edit = treeNode;
    //查询详情
    this.treeDetailed.emit(treeNode.id);
    // this._treeFormData = this._treeFormData_edit;
    // this.toShowADU(null);
  }

  public deleteClick(treeNode: any) {
    const me = this;
    this.toolHttp._confirm('确认要删除嘛？', function () {
      me.current_del = treeNode;
      me.treeDeleted.emit(treeNode.id);
    });
  }

  public toEdit(fromValue: any) {
    if (!fromValue.id) {
      alert('未传修改ID!!!');
      return ;
    }
    this.edit_id = fromValue.id;
    this.form.form.reset(fromValue);
    // this._treeFormData = this.fromValue;
    this.toShowADU(null);
  }

  public editSuccess(name: string) {
    if (this.current_edit) {
      this.current_edit.name = name;
      this.ztree.updateNode(this.current_edit);
    }
  }

  public addSuccess(newnode: any) {
    this.ztree.addNodes(this.add_parentNode, newnode);
  }

  public delSuccess() {
    if (this.current_del) {
      this.ztree.removeNode(this.current_del);
    }
  }

  public treeItemClick(event: any, treeId: any, treeNode: any) {
    (<any>window).tree_ts.current_click_item = treeNode.id;
    (<any>window).tree_ts.itemClicked.emit(treeNode.id);
  }

  public getTreeItemClick() {
    return this.current_click_item;
  }


  getAllSelect() {
    const zTree: any = (<any>$).fn.zTree.getZTreeObj('treeDemo');
    // var nodes = zTree.getChangeCheckedNodes();
    const checkNodes = zTree.getCheckedNodes(true);
    const ns: any = [];
    for (let i = 0; i < checkNodes.length; i++) {
      if (checkNodes[i].isParent === false) {
        ns.push({pt_id: {l_id: checkNodes[i].id}});
      }
    }
   return ns;
  }


  getSelectParent() {
    const zTree: any = (<any>$).fn.zTree.getZTreeObj('treeDemo');
    // var nodes = zTree.getChangeCheckedNodes();
    const checkNodes = zTree.getCheckedNodes(true);
    const ns: any = [];
    for (let i = 0; i < checkNodes.length; i++) {
      if (checkNodes[i].isParent === true) {
        ns.push({pt_id: {l_id: checkNodes[i].id}});
      }
    }
    return ns;
  }

}
