import { IdTool } from '../../shared/tool/IdTool';
import { ToolAlert } from '../../shared/tool/ToolAlert';
import { Input } from '@angular/core';
import * as _ from 'lodash';
import { DynamicBase } from '../dynamic.base';
import { UploadService } from '../../shared/service/UploadService';

/**
 * 所有上传的基类  如图片 文件  等
 */
export class UploadDynamicBaseComponent extends DynamicBase {
  file_arr: any = []; //存放id 的数组
  initFlag = false; //标识初始化是否结束
  percentage: any = 0; //上传文件进度
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
      IdTool.mergeAFromB(this._config, values, {});
    }
  }
  beforeUpload() {
    this.log('上传接口之前处理');
  }

  afterUpload(uploadId: any, file: any) {
    this.log('上传成功回调处理');
  }
  /**
   * 检测文件大小
   * @param parmFile
   * @param fSize
   */
  checkSize(parmFile: any, fSize: any) {
    let check = true;
    if (parmFile) {
      parmFile.forEach((file: any) => {
        const fileSize = file.size;
        if (fileSize > fSize * 1024) {
          check = false;
          ToolAlert.error('上传最大文件大小为' + fSize + 'KB');
        }
      });
    } else {
      check = false;
    }
    return check;
  }

  upload(parmFile: any) {
    if (!parmFile || parmFile.length === 0) {
      ToolAlert.error('请选择图片.');
      return;
    }
    const checked = this.checkSize(parmFile, this._config.fileSize);
    this.beforeUpload();
    if (checked) {
      ToolAlert.showLoad();
      this.isUploading = true;
      this.toolUpload.filesAjax(parmFile, (evt: any) => {
        if (evt.lengthComputable) { //计算完成百分比
          this.percentage = Math.round(evt.loaded / evt.total * 100);
        }
      }).subscribe((result: any) => {
        if (result) {
          const token = result.token;
          this.isUploading = false;
          if (this.toolUpload.isNotEx(token)) {
            this.log('上传成功!');
            const uploadId = _.get(result, 'attList[0].pt_id.open_id', '');
            this.file_arr.push(uploadId);
            if (this.propagateChange) {
              this.propagateChange(_.join(this.file_arr, ','));
            }
            if (this.propagateTouched) {
              this.propagateTouched();
            }
            this.percentage = 0;
            this.afterUpload(uploadId, parmFile[0]);
          }
        }
      });
    }
  }
  canUpload() {
    const leng = this.file_arr.length;
    return this._config.canUploadCount > leng;
  }
  public constructor(
    protected toolUpload: UploadService) {
    super();
  }

  /**
   * 用于其他删除处理的操作
   * @param uploadId
   */
  delOther(uploadId: any) {
    console.log('delOther 采用默认不处理');
  }
  /**
   * 删除文件
   * @param uploadId
   */
  delfile(uploadId: any) {
    this.log('delfile  : ' + uploadId);
    _.remove(this.file_arr, (n: any) => {
      return n === uploadId;
    });
    if (uploadId) {
      this.delOther(uploadId);
    }
  }
  /**
   * 用于初始化文件显示  图片默认不需要  文件需要请求接口获取文件名
   * @param file_arr
   */
  initValue(file_arr: any) {
    console.log('initValue 采用默认不处理');
  }
  getUrl(uploadId: any) {
    return IdTool.getFileUrl(uploadId);
  }
  /**
   * 给外部formControl写入数据
   * @param {*} value
   */
  writeValue(value: any) {
    if (IdTool.isNotEmpty(value)) {
      this.file_arr = value.split(',');
      this.initValue(this.file_arr);
    }
  }
}
