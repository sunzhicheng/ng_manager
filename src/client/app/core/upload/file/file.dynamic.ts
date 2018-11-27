
import { Component, forwardRef } from '@angular/core';
import { UploadService } from '../../../shared/service/UploadService';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';
import { UploadDynamicBaseComponent } from '../upload.dynamic.base.';

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
  allFile: any = [];
  constructor(
    protected toolUpload: UploadService) {
    super(toolUpload);
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
  beforeUpload() {
    this.log('');
  }
  /**
   * 上传成功处理
   * @param uploadId
   * @param file
   */
  afterUpload(uploadId: any, file: any) {
    console.log('uploadId', uploadId);
    this.allFile.push({ id: uploadId, name: file.name });
  }

  progress() {
    return this.percentage + '%';
  }
  /**
   * 下载
   * @param file
   */
  getDownUrl(file: any) {
    const downUrl = this.getUrl(file.id);
    window.open(downUrl);
  }
  /**
   * 删除文件
   * @param uploadId
   */
  delOther(uploadId: any) {
    _.remove(this.allFile, (n: any) => {
      return n.id === uploadId;
    });
  }
  /**
   * 初始化值的处理
   * @param file_arr
   */
  initValue(file_arr: any) {
    this.toolUpload.fileDetail(file_arr).subscribe((result: any) => {
      result.attList.forEach((att: any) => {
        this.allFile.push({
          id: _.get(att, 'pt_id.open_id'),
          name: _.get(att, 'name')
        });
      });
    });
  }

}
