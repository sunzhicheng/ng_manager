import {
  EventEmitter, Input, Output, OnChanges, SimpleChanges,
  ViewChild, ElementRef
} from '@angular/core';
import { DfFromComponent } from '../df/df.component';
import { IdTool } from '../../shared/tool/IdTool';
import { ToolAlert } from '../../shared/tool/ToolAlert';
import * as _ from 'lodash';
import { ToolForm } from '../../shared/tool/ToolForm';
import { LocalStorageCacheService } from '../../shared/cache/localstorage.service';
import { TreeService } from '../../shared/service/TreeService';
import { BaseComponent } from '../../shared/component/BaseComponent';
import { IDCONF } from '../../shared/config/app.config';

declare const $: any;
/**
 * 树表单的新增和修改将以弹框的形式出现
 */
export class TreeComponent extends BaseComponent implements OnChanges {

  @ViewChild('form')
  public form: DfFromComponent;

  treeId: any = IdTool.uuid();
  @Output()
  public formSubmited: EventEmitter<any> = new EventEmitter();

  @Output()
  public treeDetailed: EventEmitter<any> = new EventEmitter();

  @Output()
  public treeDeleted: EventEmitter<any> = new EventEmitter();

  @Output()
  public itemClicked: EventEmitter<any> = new EventEmitter();
  @Output()
  public treeBinded: EventEmitter<any> = new EventEmitter();
  @Output()
  public selectChangeOut: EventEmitter<any> = new EventEmitter();
  /**
   * 用于过滤表单控制如： 隐藏或显示 或disabled 某个item
   */
  @Output()
  public filterItem: EventEmitter<any> = new EventEmitter();

  /**
   * ztree 对象
   */
  public ztree: any;

  /**
   * ztree 的基础配置
   */
  public base_setting: any = {
    async: {
      enable: false,
    },
    view: {
      addHoverDom: (treeId: any, treeNode: any) => { this.addHoverDom(treeId, treeNode); },
      removeHoverDom: (treeId: any, treeNode: any) => { this.removeHoverDom(treeId, treeNode); },
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
      onClick: (event: any, treeId: any, treeNode: any) => { this.treeItemClick(event, treeId, treeNode); },
      onAsyncSuccess: (event: any, treeId: any, treeNode: any, msg: any) => { this.asyncSuccess(event, treeId, treeNode, msg); },
      // beforeExpand: (treeId: any, treeNode: any) => {this.beforeExpand(treeId, treeNode);},
      onAsyncError: (event: any, treeId: any, treeNode: any, XMLHttpRequest: any, textStatus: any, errorThrown: any) => {
        this.onAsyncError(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown);
      }
    }
  };

  public _tree_button_setting: any = {
    selectedMulti: false, //是否可多选
    check: false, //是否显示选择按钮
    addBtn: false, //增加按钮
    editBtn: false, //修改按钮
    deleteBtn: false, //删除按钮
    bindBtn: false, //绑定按钮
  };

  public _config: any = {
    title: '树结构标题',
    rootCreate: true,
    showhead: true,
    useform: false, //是否使用表单
    maxLevel: 5,
    defaltSelect: false, //默认选择第一个(在tree table 中会用到)
    async: false,  //是否启用异步加载
  };

  /**
   * 异步加载配置默认信息
   */
  public _async_config: any = {
    requestUrl: '',  //启用异步加载之后,请求的接口url
    // perCount: 10,   //启用异步加载之后 每次调用接口多少行数据
    // headers: this.getHeaders(),
    dataType: 'json',
    contentType: 'application/json',
    dataFilter: (treeId: any, parentNodeJSON: any, responseDataArray: any) => this.dataFilter(treeId, parentNodeJSON, responseDataArray),
    mappingKey: {
      name_key: null,
      uuid_key: null,
      sub_key: null,
      parent_key: null,
      is_parent_key: null,
    },
    otherParam: (treeId: any, treeNode: any) => { return this.getOtherParam(treeId, treeNode); },
  };

  public _treeData: any;

  public _treeFormData: any;

  public oringin_treeFormData: any;

  public add_parentNode: any;
  public edit_id: any;

  public configInit = false;
  public setInit = false;
  public dataInit = false;
  public asyncInit = false;

  public isAdd = true; //是否添加 否则为修改
  public current_edit: any;
  public current_del: any;
  public current_click_item: any; //当前点击的树

  @Input()
  public set config(values: any) {
    if (values) {
      IdTool.mergeAFromB(this._config, values, {});
      this.base_setting.async.enable = this._config.async;
      this.configInit = true;
    }
  }

  @Input()
  public set tree_button_setting(values: any) {
    IdTool.mergeAFromB(this._tree_button_setting, values, {});
    this.base_setting.check.enable = this._tree_button_setting.check ? true : false;
    this.setInit = true;
  }

  /**
   * async= true 开启异步加载才有效
   */
  @Input()
  public set async_config(values: any) {
    IdTool.mergeAFromB(this._async_config, values, {});
    if (this._config.async) {
      this._async_config.enable = true;
      this._async_config.xhrFields = { withCredentials: true };
      this._async_config.url = IDCONF().api_base + this._async_config.requestUrl;
      this.base_setting.async = this._async_config;
      this.asyncInit = true;
    }
  }

  @Input()
  public set treeData(values: any) {
    this.dataInit = true;
    this._treeData = values;
  }

  @Input()
  public set treeFormData(values: any) {
    if (values) {
      this._treeFormData = values;
      //克隆
      this.oringin_treeFormData = JSON.parse(JSON.stringify(values));
    }
  }
  /**
   * 是否树已经加载完毕
   */
  private treeInitComplate = false;
  /**
   * 监控
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if (!this.treeInitComplate) {  //保证只初始化一次
      if (this._config && this.base_setting) {
        if (this.base_setting.async.enable && this.asyncInit) {
          this.initTree();
        } else {
          if (this.setInit && this.dataInit && this._treeData) {
            this.initTree();
          }
        }
      }
    }
  }

  afterInit() {
    console.log('初始化树之后');
  }

  public initTree() {
    if (this.base_setting.async.enable) { //异步加载
      if (!this.ztree) {
        this.ztree = (<any>$).fn.zTree.init($('#' + this.treeId), this.base_setting);
        this.treeInitComplate = true;
      }
    } else {
      this.ztree = (<any>$).fn.zTree.init($('#' + this.treeId), this.base_setting, this._treeData);
      this.treeInitComplate = true;
    }
    if (this.ztree) {
      this.afterInit();
    }
  }
  getFirstId(nodes: any): any {
    const firstNode = nodes[0];
    if (!firstNode.isParent) {
      return firstNode;
    } else {
      return this.getFirstId(firstNode.children);
    }
  }
  constructor(
    protected treeService: TreeService,
    protected eleRef: ElementRef,
    protected cacheService: LocalStorageCacheService) {
    super();
  }
  /**
   * 新增或修改  处理表单形式
   * @param parentNode
   */
  public toForm(parentNode: any) {
    console.error('toForm错误: 新增或修改  表单表现形式没有处理');
  }
  afterSubmit() {
    console.warn('afterSubmit警告: 表单提交完成未处理 ');
  }

  formSubmit(formValue: any) {
    if (!this.isAdd && this.edit_id) {
      formValue.id = this.edit_id;
    }
    if (this.isAdd) {
      formValue.add_parentNode = this.add_parentNode;
    }
    this.formSubmited.emit(formValue);
    this.afterSubmit();
  }

  public beforeReName(treeId: any, treeNode: any, newName: any, isCancel: any) {
    // this.toAdd();
    return false;
  }

  //此处开始为异步加载配置方法 ------------------------------- start

  /**
   * 异步加载  成功回调方法
   * @param event
   * @param treeId
   * @param treeNode
   * @param msg
   */
  asyncSuccess(event: any, treeId: any, treeNode: any, msg: any) {
    //说明已经没有子集了
    if (!msg || msg.length === 0) {
      treeNode.isParent = false;
      this.ztree.updateNode(treeNode);
    }
  }
  onAsyncError(event: any, treeId: any, treeNode: any, XMLRequest: any, textStatus: any, errorThrown: any) {
    console.error('textStatus', textStatus);
    console.error('errorThrown', errorThrown);
  }
  /**
   * 处理接口返回的数据
   * @param treeId
   * @param parentNodeJSON
   * @param responseDataArray
   */
  dataFilter(treeId: any, parentNodeJSON: any, responseDataArray: any) {
    const treedata: any = [];
    if (responseDataArray && responseDataArray.length > 0) {
      if (this._async_config.mappingKey
        && this._async_config.mappingKey.name_key
        && this._async_config.mappingKey.uuid_key
        && this._async_config.mappingKey.sub_key) {
        this.treeService.setMappingKey(
          this._async_config.mappingKey.name_key,
          this._async_config.mappingKey.uuid_key,
          this._async_config.mappingKey.sub_key);
      }
      this.treeService.setAsync(true);
      responseDataArray.forEach((proto: any) => {
        treedata.push(this.treeService.proto2NodeByAsync(proto));
      });
      if (!treeId && treedata.length > 0) {
        this.ztree.destroy();
        this.ztree = (<any>$).fn.zTree.init($('#' + this.treeId), this.base_setting, treedata);
        this.afterInit();
      }
      return treedata;
    }
  }
  /**
   * 获取json 格式的参数
   * @param treeId
   * @param treeNode
   */
  getOtherParam(treeId: any, treeNode: any) {
    const parma = {};
    if (treeNode) {
      this.bindQueryData(parma, { pId: treeNode.id });
    }
    return parma;
  }
  // getHeaders() {
  //   const header: any = {
  //     'content-type': 'application/json',
  //     'id-token': this.cacheService.getToken('json'),
  //     'id-proto': 'json'
  //   };
  //   return header;
  // }

  //此处为异步加载配置方法 ------------------------------- end

  public addHoverDom(treeId: any, treeNode: any) {
    const aObj: any = $('#' + treeNode.tId + '_a');
    if ((<any>$)('#diyBtn_add_' + treeNode.id).length > 0) return;
    if ((<any>$)('#diyBtn_edit_' + treeNode.id).length > 0) return;
    if ((<any>$)('#diyBtn_delete_' + treeNode.id).length > 0) return;
    //添加
    if (treeNode.level <= parseInt(this._config.maxLevel, 10)) {
      if (this._tree_button_setting.addBtn) {
        const editStr: any = '<span id=diyBtn_add_' +
          treeNode.id + ' title=添加></span>';
        aObj.append(editStr);
        const btn: any = $('#diyBtn_add_' + treeNode.id);
        btn.addClass('button');
        btn.addClass('add');
        if (btn) {
          btn.unbind('click').bind('click', () => {
            this.addClick(treeNode);
          });
        }
      }
    }

    //修改
    if (this._tree_button_setting.editBtn) {
      if (treeNode.level === 0 && !this._config.rootCreate) {
        // this.log('rootCreate === false 不能修改根目录');
      } else {
        const editStr: any = '<span id=diyBtn_edit_' +
          treeNode.id + ' title=修改 ></span>';
        aObj.append(editStr);
        const btn: any = $('#diyBtn_edit_' + treeNode.id);
        btn.addClass('button');
        btn.addClass('edit');
        if (btn) {
          btn.unbind('click').click(() => {
            this.editClick(treeNode);
          });
        }
      }
    }
    //删除
    if (this._tree_button_setting.deleteBtn) {
      if (treeNode.level === 0 && !this._config.rootCreate) {
        // this.log('rootCreate === false 不能删除根目录');
      } else {
        const deleteStr: any = '<span id=diyBtn_delete_' +
          treeNode.id + ' title=删除 ></span>';
        aObj.append(deleteStr);
        const btn: any = $('#diyBtn_delete_' + treeNode.id);
        btn.addClass('button');
        btn.addClass('remove');
        if (btn) {
          btn.unbind('click').click(() => {
            this.deleteClick(treeNode);
          });
        }
      }
    }
    if (this._tree_button_setting.bindBtn) {
      const bindStr: any = '<span id=diyBtn_bind_' +
        treeNode.id + ' ></span>';
      aObj.append(bindStr);
      const btn: any = $('#diyBtn_bind_' + treeNode.id);
      // btn.addClass('button');
      btn.addClass('iconfont icon-bangding');
      if (btn) {
        btn.unbind('click').click(() => {
          this.bindClick(treeNode);
        });
      }
    }
  }

  public removeHoverDom(treeId: any, treeNode: any) {
    // if (treeNode.parentTId && treeNode.getParentNode().id!=1) return;
    if (this._tree_button_setting.addBtn) {
      (<any>$)('#diyBtn_add_' + treeNode.id).unbind().remove();
    }
    if (this._tree_button_setting.editBtn) {
      (<any>$)('#diyBtn_edit_' + treeNode.id).unbind().remove();
    }
    if (this._tree_button_setting.editBtn) {
      (<any>$)('#diyBtn_delete_' + treeNode.id).unbind().remove();
    }
    if (this._tree_button_setting.bindBtn) {
      (<any>$)('#diyBtn_bind_' + treeNode.id).unbind().remove();
    }

  }
  public addClick(treeNode: any) {
    this.isAdd = true;
    const fd = JSON.parse(JSON.stringify(this.oringin_treeFormData));
    //增加自定义item 规则
    this.filterItem.emit({ opt: 'add', node: treeNode, formData: fd });
    ToolForm.refreshItem(this.form, fd);
    //清楚之前的表单数据
    this.form.toDefault();
    this.add_parentNode = treeNode;
    this.toForm(treeNode);
  }
  public editClick(treeNode: any) {
    this.isAdd = false;
    this.current_edit = treeNode;
    const fd = JSON.parse(JSON.stringify(this.oringin_treeFormData));
    this.filterItem.emit({ opt: 'update', node: this.current_edit, formData: fd });
    ToolForm.refreshItem(this.form, fd);
    //查询详情
    this.treeDetailed.emit(treeNode);
  }

  public deleteClick(treeNode: any) {
    ToolAlert.confirm('确认要删除嘛？', () => {
      this.current_del = treeNode;
      this.treeDeleted.emit(treeNode);
    });
  }
  public bindClick(treeNode: any) {
    this.treeBinded.emit(treeNode);
  }

  public toEdit(fromValue: any) {
    if (_.get(fromValue, 'uuid', '') === '') {
      console.error('未传修改ID!!!');
      return;
    }
    this.edit_id = _.get(fromValue, 'uuid', '');
    this.form.reset(fromValue);
    this.toForm(null);
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
    this.current_click_item = treeNode.id;
    this.itemClicked.emit(treeNode.id);
  }

  public getTreeItemClick() {
    return this.current_click_item;
  }

  /**
   * 表单选择框  改变事件
   */
  selectChange(value: any) {
    this.selectChangeOut.emit(value);
  }

  getAllSelect() {
    const zTree: any = (<any>$).fn.zTree.getZTreeObj(this.treeId);
    const checkNodes = zTree.getCheckedNodes(true);
    const ns: any = [];
    for (let i = 0; i < checkNodes.length; i++) {
      ns.push({ dtc: { pt_id: { open_id: checkNodes[i].id } } });
    }
    return ns;
  }


  getSelectParent() {
    const zTree: any = (<any>$).fn.zTree.getZTreeObj(this.treeId);
    const checkNodes = zTree.getCheckedNodes(true);
    const ns: any = [];
    for (let i = 0; i < checkNodes.length; i++) {
      if (checkNodes[i].isParent === true) {
        ns.push({ pt_id: { open_id: checkNodes[i].id } });
      }
    }
    return ns;
  }
  /**
   * 获取所有最终子节点
   */
  getSelectSub() {
    const zTree: any = (<any>$).fn.zTree.getZTreeObj(this.treeId);
    const checkNodes = zTree.getCheckedNodes(true);
    const ns: any = [];
    for (let i = 0; i < checkNodes.length; i++) {
      if (checkNodes[i].isParent === false) {
        ns.push({ dtc: { pt_id: { open_id: checkNodes[i].id } } });
      }
    }
    return ns;
  }
}
