import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit, Input, forwardRef, DoCheck } from '@angular/core';
import { HttpService } from '../../shared/service/HttpService';
import { IdTool } from '../../shared/tool/IdTool';
import * as _ from 'lodash';
import { DynamicBase } from '../dynamic.base';
import { GpbService } from '../../shared/service/gpb.service';
import { TreeService } from '../../shared/service/TreeService';

declare let $: any;

/**
 * 表单选择树
 */
@Component({
  moduleId: module.id,
  selector: 'modal-tree-dynamic',
  template: `
  <input  type="text" class="form-control" [value]="selectNames"  (click)="show()"
  readonly>
    <div class="modal fade" id="{{ namekey }}">
    <div class="modal-dialog" style="width: 450px;">
      <div class="modal-content" style="min-height: 450px;">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h4 class="modal-title">{{ _config.title }}</h4>
        </div>
        <div class="modal-body" style="height:500px;overflow-y: auto;padding: 0;">
          <div class="tree-content">
            <ul id="{{ treeId }}" class="ztree"></ul>
          </div>
        </div>
        <div class="modal-footer" style="margin:0;">
          <!--提交按钮-->
          <button  type="button" class="btn btn-primary" (click)="select()" >确定</button>
          <!--取消按钮-->
          <button  type="button" class="btn btn-default" (click)="hide()">取消</button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>

  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ModalTreeDynamicComponent),
    multi: true
  }]
})

export class ModalTreeDynamicComponent extends DynamicBase implements OnInit, DoCheck {
  treeId: any = IdTool.uuid();
  public _config: any = {
    title: '树结构标题',
    name_key: 'name',
    uuid_key: 'dtc.pt_id.open_id',
    sub_key: 'sub_list',
    last_node: false   //当按钮为checkbox 的时候 且 last_node=true  只返回最终子节点
  };
  @Input()
  public set config(values: any) {
    IdTool.mergeAFromB(this._config, values, {});
  }
  @Input()
  chkboxType: any = 'relate';

  _selectType: any = 'radio';
  @Input()
  public set selectType(values: any) {
    if (values === 'checkbox') {
      this._selectType = 'checkbox';
      this.base_setting.check = {
        enable: true,
      };
      if (this.chkboxType === 'none') {
        this.base_setting.check.chkboxType = { 'Y': '', 'N': '' }; //加上这段   checkbox 只能单个单个选择
      }
    } else {
      this._selectType = 'radio';
      this.base_setting.check = {
        enable: true,
        chkStyle: 'radio',
        radioType: 'all'
      };
    }
  }

  /**
   * ztree 对象
   */
  public ztree: any;
  public base_setting: any = {
    check: {
    },
    view: {
      dblClickExpand: false
    },
    data: {
      simpleData: {
        enable: true
      }
    },
    callback: {
      onClick: (e: any, treeId: any, treeNode: any) => {
        this.ztree.checkNode(treeNode, !treeNode.checked, null, true);
      },
    }
  };
  public treeData: any;

  selectNames: any = '';

  public constructor(protected toolGpb: GpbService,
    protected treeService: TreeService,
    protected httpService: HttpService) {
    super();
  }


  ngOnInit() {
    this.log('');
  }
  ngDoCheck(): void {
    if (!_.isEqual(this.filterJson, this.oldFilterJson)) {
      this.oldFilterJson = this.filterJson;
      this.filterJsonUpdate = true;
    }
  }

  public initTree() {
    const me = this;
    if (this.treeData) {
      this.addCheckedNode();
      this.ztree = (<any>$).fn.zTree.init($('#' + this.treeId), me.base_setting, this.treeData);
    }
  }

  addCheckedNode() {
    //初始化选择项
    if (IdTool.isNotEmptyArray(this.inV)) {
      this.treeData.forEach((node: any) => {
        this.inV.forEach((uuid: any) => {
          if (node.id === uuid) {
            node.checked = true;
          }
        });
      });
    }
  }

  getAllSelect() {
    const zTree: any = (<any>$).fn.zTree.getZTreeObj(this.treeId);
    // var nodes = zTree.getChangeCheckedNodes();
    const checkNodes = zTree.getCheckedNodes(true);
    const ns: any = [];
    const names: any = [];
    for (let i = 0; i < checkNodes.length; i++) {
      ns.push(checkNodes[i].id);
      names.push(checkNodes[i].name);
    }
    if (names.length > 0) {
      this.selectNames = _.join(names, ',');
    } else {
      this.selectNames = '';
    }
    return ns;
  }

  /**
 * 获取所有最终子节点
 */
  getSelectSub() {
    const zTree: any = (<any>$).fn.zTree.getZTreeObj(this.treeId);
    // var nodes = zTree.getChangeCheckedNodes();
    const checkNodes = zTree.getCheckedNodes(true);
    const ns: any = [];
    const names: any = [];
    for (let i = 0; i < checkNodes.length; i++) {
      if (checkNodes[i].isParent === false) {
        // ns.push({dtc: { pt_id: { open_id: checkNodes[i].id } }});
        ns.push(checkNodes[i].id);
        names.push(checkNodes[i].name);
      }
    }
    if (names.length > 0) {
      this.selectNames = _.join(names, ',');
    } else {
      this.selectNames = '';
    }
    return ns;
  }

  select() {
    let nodeArr = [];
    if (this._config.last_node && this._selectType === 'checkbox') {
      nodeArr = this.getSelectSub();
    } else {
      nodeArr = this.getAllSelect();
    }
    // console.log('####################################### select     nodeArr : '
    //  + JSON.stringify(nodeArr) + '    inV:  ' + JSON.stringify(this.inV));
    if (!IdTool.compareArray(nodeArr, this.inV)) {
      this.changeOut.emit(_.join(nodeArr, ',') || '');
      this.inV = nodeArr;
      this.propagateChange(_.join(nodeArr, ',') || '');
    }
    this.hide();
  }


  show() {
    if (!this.isDisabled) {
      this.getTreeData();
      (<any>$('#' + this.namekey)).modal('show');
    }
  }
  hide() {
    (<any>$('#' + this.namekey)).modal('hide');
  }
  initSelectName() {
    if (this.treeData) {
      const selectNamesArr: any = [];
      this.treeData.forEach((node: any) => {
        this.inV.forEach((uuid: any) => {
          if (node.id === uuid) {
            selectNamesArr.push(node.name);
          }
        });
      });
      this.selectNames = _.join(selectNamesArr, ',');
      if (!this.selectNames && !IdTool.isEmptyArray(this.inV)) {
        console.error('modal tree 初始值错误,没有找到对应的树节点,初始值=' + this.inV.join());
      }
    } else {
      setTimeout(() => {
        this.initSelectName();
      }, 1000);
    }
  }

  /**
     * 获取数结构数据
     */
  getTreeData(openIndex: any = 9999) {
    if (this.treeData && !this.filterJsonUpdate) {
      return;
    }
    if (this._proto && this._request_url) {
      this.toolGpb.getProto(this._proto).subscribe(
        (protoMessage: any) => {
          if (!this.protoEntry) {
            this.protoEntry = protoMessage.create(this.entryInit);
          }
          if (this.protoEntry.query) {
            if (!this.protoEntry.query.q_item_list) {
              this.protoEntry.query.q_item_list = [];
            } else {
              this.protoEntry.query.q_item_list.splice(0, this.protoEntry.query.q_item_list.length);
            }
          }
          if (this.filterJson) {
            this.bindQueryData(this.protoEntry, this.filterJson);
          }
          if (this.protoEntry.pager) {
            this.protoEntry.pager = undefined;
          }
          this.httpService.httpRequest(this._request_url, this.protoEntry, protoMessage).subscribe(
            (protoMsg: any) => {
              this.treeData = [];
              if (protoMsg.proto_list) {
                this.treeData.splice(0, this.treeData.length);
                this.treeService.setMappingKey(this._config.name_key, this._config.uuid_key, this._config.sub_key);
                this.treeData = this.treeService.toTreeData(protoMsg.proto_list, openIndex);
                this.initTree();
              }
            },
            (error: any) => {
              console.error('httpRequest.error: ' + JSON.stringify(error));
            }
          );
        },
        (error: any) => {
          console.error('getProto.error: ' + JSON.stringify(error));
        }
      );
    }
  }
  /**
   * 给外部formControl写入数据
   * @param {*} value
   */
  writeV(value: any) {
    // console.log('####################################### writeV : ' + JSON.stringify(value));
    if (IdTool.isNotEmpty(value)) {
      this.getTreeData();
      this.inV = value.split(',');
      this.initSelectName();
    } else {
      this.selectNames = '';
    }
  }
}
