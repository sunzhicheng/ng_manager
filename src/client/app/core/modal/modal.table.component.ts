import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../../shared/idorp/service/HttpService';
import * as _ from 'lodash';
import { GpbService } from '../../shared/idorp/service/gpb.service';
import { NgStaticTableComponent } from '../table/ng-static-table.component';
import { ModalBaseComponent } from './ModalBaseComponent';

declare let $: any;

/**
 * 表单 列表选择
 */
@Component({
  moduleId: module.id,
  selector: 'modal-table',
  template: `
    <div class="modal fade" id="{{name_key}}">
    <div class="modal-dialog" style="width: 1000px;">
      <div class="modal-content" style="min-height: 440px;">
      <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h4 class="modal-title">{{ _config.title }}</h4>
        </div>
        <div class="modal-body">
          <ng-static-table  [pager]="pager"  (allCheckedV)="valueChange($event)"
        [config]="_config" [opt_config]="{isopt: false}"
        [cmpSelect]="_config.cmpSelect"></ng-static-table>
        </div>
        <div class="modal-footer">
          <!--提交按钮-->
          <button  type="button" class="btn btn-primary" (click)="stop()" >确定</button>
          <!--取消按钮-->
          <button  type="button" class="btn btn-default" (click)="hide()">取消</button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
  `,
})

export class ModalTableComponent extends ModalBaseComponent implements OnInit {

  selectV: any ;

  @ViewChild(NgStaticTableComponent)
  public modal_table: NgStaticTableComponent;

  @Output()
  public change: EventEmitter<any> = new EventEmitter();

  public constructor(protected toolGpb: GpbService,
    protected httpService: HttpService) {
    super();
  }
  ngOnInit() {
    // console.log();
  }
  valueChange(outV: any) {
    if (!_.isEqual(this.selectV, outV)) {
      this.selectV = outV;
    }
  }
  /**
   * 列表加载
   */
  loadTable() {
    this.requestUrl(() => {
      this.queryTable();
    });
  }
  queryTable() {
    if (this._config.proto && this._config.request_url) {
      this.toolGpb.getProto(this._config.proto).subscribe(
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
          if (this._config.filterJson) {
            this.bindQueryData(this.protoEntry, this._config.filterJson);
          }
          this.protoEntry.pager.pagePerCount = 1000;
          this.httpService.httpRequest(this._config.request_url, this.protoEntry, protoMessage).subscribe(
            (protoMsg: any) => {
              this.pager = protoMsg.pager;
              this.protoEntry = protoMsg;
            },
            (error: any) => {
              console.log('httpRequest.error: ' + JSON.stringify(error));
            }
          );
        },
        (error: any) => {
          console.log('getProto.error: ' + JSON.stringify(error));
        }
      );
    }
  }
  run() {
    if (!this._config.request_url || !this._config.proto) {
        console.error('table modal 没有配置 request_url和proto,请初始化必要参数');
    } else {
      this.loadTable();
      this.show();
    }
}
stop() {
  this.valueOut.emit(this.selectV);
  this.hide();
}
  hide() {
    (<any>$('#' + this.name_key)).modal('hide');
  }
  private show() {
    (<any>$('#' + this.name_key)).modal('show');
  }
}
