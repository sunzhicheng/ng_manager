import { IUtils } from '../../../shared/idorp/providers/IUtils';
import { Input } from '@angular/core';
import { UploadService } from '../../../shared/idorp/service/UploadService';
import * as _ from 'lodash';
import { UploadDynamicBaseComponent } from '../upload.dynamic.base.';

declare const $: any;

/**
 * 图片上传的基类   子类包括 图片裁剪上传
 */
export class ImgDynamicBaseComponent extends UploadDynamicBaseComponent {
  enlargeImg: any; //点击放大图片

  //支持的文件类型
  _fileType: any = ['jpg', 'png', 'jpeg'];
  @Input()
  public set fileType(values: any) {
    if (values) {
      this._fileType = values;
    }
  }

  public constructor(
    protected toolUpload: UploadService) {
    super(toolUpload);
  }

  public get accept() {
    if (this._fileType && this._fileType.length > 0) {
      const ft = _.map(this._fileType, (f: any) => {
        if (f.indexOf('image') === -1) {
          return 'image/' + f;
        } else {
          return f;
        }
      });
      return ft.join();
    } else {
      return '';
    }
  }
  /**
   * 显示放大图片
   * @param img
   */
  showEnlargeImg(img: any) {
    if (img) {
      this.enlargeImg = IUtils.getImgUrl(img);
      (<any>$('#img_enlarge_' + this.namekey)).modal('show');
    }
  }
  /**
   * 隐藏放大图片
   * @param img
   */
  hideEnlargeImg() {
    this.enlargeImg = undefined;
    (<any>$('#img_enlarge_' + this.namekey)).modal('hide');
  }
  /**
   * 图片位置前移一格
   * @param img
   */
  toPrev(img: any) {
    const index = _.findIndex(this.file_arr, (n: any) => {
      return n === img;
    });
    if (index === -1) {
      console.error('图片id错误,没有找到相应的图片id');
      return;
    }
    if (index === 0) {
      console.log('该图片已经在第一个位置');
      return;
    }
    const nodeCurrent = this.file_arr[index];
    const nodePrev = this.file_arr[index - 1];
    this.file_arr[index - 1] = nodeCurrent;
    this.file_arr[index] = nodePrev;
    if (this.propagateChange) {
      this.propagateChange(_.join(this.file_arr, ','));
    }
  }
  /**
   * 图片位置后移一格
   * @param img
   */
  toAfter(img: any) {
    const index = _.findIndex(this.file_arr, (n: any) => {
      return n === img;
    });
    if (index === -1) {
      console.error('图片id错误,没有找到相应的图片id');
      return;
    }
    if (index === this.file_arr.length - 1) {
      console.log('该图片已经在最后的位置');
      return;
    }
    const nodeCurrent = this.file_arr[index];
    const nodeAfter = this.file_arr[index + 1];
    this.file_arr[index + 1] = nodeCurrent;
    this.file_arr[index] = nodeAfter;
    if (this.propagateChange) {
      this.propagateChange(_.join(this.file_arr, ','));
    }
  }
  public showImg(imgId: any) {
    if (!imgId) {
      return 'assets/images/upload-index-bg.png';
    }
    if (imgId.indexOf('loading') !== -1) {
      return 'assets/images/loading_400.gif';
    } else {
      return IUtils.getImgUrl(imgId);
    }
  }
}
