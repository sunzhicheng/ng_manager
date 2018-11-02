import { Router } from '@angular/router';
import * as _ from 'lodash';
import { IdorpBaseComponent } from '../../shared/idorp/component/IdorpBaseComponent';
import { Input } from '@angular/core';
import { IUtils } from '../../shared/idorp/providers/IUtils';
import { Output, EventEmitter } from '@angular/core';
import { DoCheck } from '@angular/core';

export class ModalBaseComponent extends IdorpBaseComponent implements DoCheck {
    name_key = IUtils.uuid();
    protoEntry: any;
    pager: any;
    oldFilterJson: any;
    filterJsonUpdate = false;
  public _config: any = {
    cmpSelect: 1,
    title: '弹框',
    proto: '',  //协议路径
    filterJson: {},  //查询参数 格式 {keyword:value} 会被封装在q_item_list 中
    request_url: ''
  };
  @Input()
  public set config(values: any) {
    IUtils.mergeAFromB(this._config, values, {});
  }
    @Output()
    public valueOut: EventEmitter<any> = new EventEmitter();

    ngDoCheck(): void {
        if (!this.oldFilterJson || !_.isEqual(this._config.filterJson, this.oldFilterJson)) {
          this.oldFilterJson = this._config.filterJson;
          this.filterJsonUpdate = true;
        }
      }
      requestUrl(callback: any) {
        if (!this.filterJsonUpdate) {
            return ;
          } else {
              callback.call();
              this.filterJsonUpdate = false;
          }
      }
}
