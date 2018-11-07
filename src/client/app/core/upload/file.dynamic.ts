
import { Component, forwardRef, Input } from '@angular/core';
import { HttpService } from '../../shared/idorp/service/HttpService';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';
import { PromptUtil } from '../../shared/idorp/providers/PromptUtil';
import { IUtils } from '../../shared/idorp/providers/IUtils';
import { IDCONF } from '../../shared/idorp/config/app.config';
import { UploadDynamicBaseComponent } from './upload.dynamic.base.';

/**
 * 动态表单上传文件
 */
@Component({
  moduleId: module.id,
  selector: 'file-dynamic',
  templateUrl: 'file.dynamic.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FileDynamicComponent),
    multi: true
  }]
})

export class FileDynamicComponent extends UploadDynamicBaseComponent {
  constructor(
    protected toolHttp: HttpService) {
    super(toolHttp);
  }

  public uploadFile(target: any) {
    if (target.target.files.length <= 0) {
      return;
    }
    const parmFile: any = [];
    const file = target.target.files[0];
    parmFile.push(file);
    this.upload(parmFile);
  }
  afterUpload() {
    // this.log('上传成功');
  }

}
