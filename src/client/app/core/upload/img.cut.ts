import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { ImgCutDynamicComponent } from './img.cut.dynamic';
declare const $: any;

@Component({
    moduleId: module.id,
    selector: 'img-cut',
    templateUrl: 'img.cut.html',
})

export class ImgCutComponent extends ImgCutDynamicComponent implements OnInit {
  @Output()
  public outUploadId: EventEmitter<any> = new EventEmitter();
  afterUpload(uploadId: any, file: any) {
    this.log('图片上传成功回调处理 uploadId : ' + uploadId);
    this.hideTailor();
    this.outUploadId.emit(uploadId);
  }
}
