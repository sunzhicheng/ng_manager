import { Component, forwardRef } from '@angular/core';
import { UploadService } from '../../shared/idorp/service/UploadService';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';
import { ImgDynamicBaseComponent } from './img.dynamic.base';

/**
 * 动态表单上传图片
 */
@Component({
    moduleId: module.id,
  selector: 'img-dynamic',
  templateUrl: 'img.dynamic.html',
   providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ImgDynamicComponent),
    multi: true
  }]
})

export class ImgDynamicComponent extends ImgDynamicBaseComponent {
  public constructor(
    protected toolUpload: UploadService) {
    super(toolUpload);
  }

  public uploadImg(target: any) {
    if (target.target.files.length <= 0) {
      return;
    }
    const parmFile: any = [];
    const file = target.target.files[0];
    parmFile.push(file);
    this.upload(parmFile);
  }
  afterUpload(uploadId: any, file: any) {
    // this.log('上传成功');
  }
}
