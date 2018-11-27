import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit, Input, ViewChild, forwardRef, DoCheck } from '@angular/core';
import { HttpService } from '../../shared/service/HttpService';
import { IdTool } from '../../shared/tool/IdTool';
import * as _ from 'lodash';
import { DynamicBase } from '../dynamic.base';
import { GpbService } from '../../shared/service/gpb.service';
import { NgStaticTableComponent } from '../table/ng-static-table.component';

declare let $: any;

/**
 * 表单 列表选择
 */
@Component({
  moduleId: module.id,
  selector: 'modal-table-dynamic',
  template: `
  <input  type="text" class="form-control" [value]="selectNames"  (click)="show()"
  readonly>
      <div class="modal fade" id="{{namekey}}">
      <div class="modal-dialog" style="width: 1000px;">
        <div class="modal-content" style="min-height: 440px;">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title">{{ _config.title }}</h4>
          </div>
          <div>
            <ng-static-table  [pager]="pager"  (allCheckedV)="valueChange($event)"
          [config]="_config" [opt_config]="{isopt: false}"
          [cmpSelect]="_config.cmpSelect"></ng-static-table>
          </div>
          <div class="modal-footer" style="margin:0;">
            <!--提交按钮-->
            <button  type="button" class="btn btn-primary" (click)="hide()" >确定</button>
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
    useExisting: forwardRef(() => ModalTableDynamicComponent),
    multi: true
  }]
})

export class ModalTableDynamicComponent extends DynamicBase implements OnInit, DoCheck {

  public _config: any = {
    cmpSelect: 1,
    title: '选择列表'
  };
  @Input()
  public set config(values: any) {
    IdTool.mergeAFromB(this._config, values, {});
  }
  selectNames: any = '';

  @ViewChild(NgStaticTableComponent)
  public modal_table: NgStaticTableComponent;

  public constructor(protected toolGpb: GpbService,
    protected httpService: HttpService) {
    super();
  }
  ngOnInit() {
    // console.log();
  }
  valueChange(outV: any) {
    const selectV = outV.value || '';
    if (!IdTool.compareArrayAndString(this.inV, selectV)) {
      this.changeOut.emit(selectV);
    }
    this.propagateChange(selectV);
    this.selectNames = outV.name || '';
  }
  ngDoCheck(): void {
    if (!_.isEqual(this.filterJson, this.oldFilterJson)) {
      this.oldFilterJson = this.filterJson;
      this.filterJsonUpdate = true;
    }
  }
  /**
   * 列表加载
   */
  loadTable(pager: any) {
    if (this.pager && !this.filterJsonUpdate) {
      return;
    } else {
      this.queryTable();
    }
  }
  queryTable() {
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
          this.protoEntry.pager.pagePerCount = 1000;
          this.httpService.httpRequest(this._request_url, this.protoEntry, protoMessage).subscribe(
            (protoMsg: any) => {
              this.pager = protoMsg.pager;
              this.protoEntry = protoMsg;
              this.filterJsonUpdate = false;
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
  show() {
    if (!this.isDisabled) {
      (<any>$('#' + this.namekey)).modal('show');
      this.loadTable(this.pager);
      this.modal_table.setCheckedV(_.join(this.inV, ','));
    }
  }
  hide() {
    (<any>$('#' + this.namekey)).modal('hide');
  }
  initSelectName() {
    if (this.pager) {
      const rowlist = this.pager.ext.row;
      const selectNamesArr: any = [];
      rowlist.forEach((row: any) => {
        this.inV.forEach((uuid: any) => {
          const page_uuid = row.data[0].s;
          const name = row.data[2].s;
          if (page_uuid === uuid) {
            selectNamesArr.push(name);
          }
        });
      });
      this.selectNames = _.join(selectNamesArr, ',');
    } else {
      setTimeout(() => {
        this.initSelectName();
      }, 1000);
    }
  }
  /**
   * 给外部formControl写入数据
   * @param {*} value
   */
  writeV(value: any) {
     if (IdTool.isNotEmpty(value)) {
      this.inV = value.split(',');
      this.loadTable(this.pager);
      this.initSelectName();
    } else {
      this.selectNames = '';
    }
  }
}
