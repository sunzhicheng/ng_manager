import { IUtils } from './../../shared/idorp/providers/IUtils';
import { PromptUtil } from './../../shared/idorp/providers/PromptUtil';
import { Input } from '@angular/core';
import { HttpService } from '../../shared/idorp/service/HttpService';
import { IDCONF } from '../../shared/idorp/config/app.config';
import * as _ from 'lodash';
import { DynamicBase } from '../dynamic.base';

declare const $: any;

export class ImgDynamicBaseComponent extends DynamicBase {
  img_arr: any = []; //存放图片id 的数组
  enlargeImg: any; //点击放大图片
  initFlag = false; //标识初始化是否结束

  //是否正在上传服务器
  isUploading = false;

  //支持的文件类型
  _config: any = {
    canUploadCount: 1, fileSize: 5 * 1024,  //图片的公共属性
    width: 400, height: 400,  //裁剪之后的宽和高
    outFileType: 'jpeg', //裁剪之后 输出的图片格式
    isShowOriginBtn: false, //是否现实原图上传按钮
    viewMode: 0,  //裁剪控件  模式  0：没有限制，3可以移动到2外。
    // 1 : 3只能在2内移动。 2：2图片 不全部铺满1 （即缩小时可以有一边出现空隙） 3：2图片填充整个1
    dragMode: 'move',  //‘crop’: 可以产生一个新的裁剪框3 ‘move’: 只可以移动3 ‘none’: 什么也不处理

  };
  @Input()
  public set config(values: any) {
    if (values) {
      IUtils.mergeAFromB(this._config, values, {});
    }
  }

  //支持的文件类型
  _fileType: any = ['jpg', 'png', 'jpeg'];
  @Input()
  public set fileType(values: any) {
    if (values) {
      this._fileType = values;
    }
  }
  afterUpload(uploadId: any) {
    this.log('图片上传成功回调处理');
  }
  upload(parmFile: any) {
    if (!parmFile || parmFile.length === 0) {
      PromptUtil._error('请选择图片.');
      return;
    }
    let check = true;
    parmFile.forEach((file: any) => {
      const fileSize = file.size;
      if (fileSize > this._config.fileSize * 1024) {
        check = false;
        PromptUtil._error('上传最大文件大小为' + this._config.fileSize + 'KB');
        return;
      }
    });
    if (check) {
      const fileUrl = IDCONF().api_file + '/idsys/idfileupload/upload';
      PromptUtil.showLoad();
      this.isUploading = true;
      this.toolHttp.filesAjax(parmFile, fileUrl, (result: any, t: any) => {
        if (result) {
          const token = result.token;
          this.isUploading = false;
          if (this.toolHttp.isNotEx(token)) {
            this.log('上传成功!');
            const uploadId = IUtils.getJson(result, 'attList[0].pt_id.open_id', '');
            this.img_arr.push(uploadId);
            if (this.propagateChange) {
              this.propagateChange(_.join(this.img_arr, ','));
            }
            if (this.propagateTouched) {
              this.propagateTouched();
            }
            PromptUtil.hideLoad();
            this.afterUpload(uploadId);
          }
        }
      }, this, this);
    }
  }
  canUpload() {
    const leng = this.img_arr.length;
    return this._config.canUploadCount > leng;
  }
  public constructor(
    protected toolHttp: HttpService) {
    super();
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

  delImg(imgId: any) {
    this.log('delImg  : ' + imgId);
    _.remove(this.img_arr, (n: any) => {
      return n === imgId;
    });
  }
  /**
   * 图片位置前移一格
   * @param img
   */
  toPrev(img: any) {
    const index = _.findIndex(this.img_arr, (n: any) => {
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
    const nodeCurrent = this.img_arr[index];
    const nodePrev = this.img_arr[index - 1];
    this.img_arr[index - 1] = nodeCurrent;
    this.img_arr[index] = nodePrev;
    if (this.propagateChange) {
      this.propagateChange(_.join(this.img_arr, ','));
    }
  }
  /**
   * 图片位置后移一格
   * @param img
   */
  toAfter(img: any) {
    const index = _.findIndex(this.img_arr, (n: any) => {
      return n === img;
    });
    if (index === -1) {
      console.error('图片id错误,没有找到相应的图片id');
      return;
    }
    if (index === this.img_arr.length - 1) {
      console.log('该图片已经在最后的位置');
      return;
    }
    const nodeCurrent = this.img_arr[index];
    const nodeAfter = this.img_arr[index + 1];
    this.img_arr[index + 1] = nodeCurrent;
    this.img_arr[index] = nodeAfter;
    if (this.propagateChange) {
      this.propagateChange(_.join(this.img_arr, ','));
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
  /**
   * 给外部formControl写入数据
   * @param {*} value
   */
  writeValue(value: any) {
    if (IUtils.isNotEmpty(value)) {
      this.img_arr = value.split(',');
    }
  }
}
