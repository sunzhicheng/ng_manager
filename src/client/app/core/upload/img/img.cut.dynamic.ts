import { Component, forwardRef, OnInit } from '@angular/core';
import { UploadService } from '../../../shared/idorp/service/UploadService';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';
import { ImgDynamicBaseComponent } from './img.dynamic.base';
declare const $: any;

/**
 * 动态表单上传裁剪图片
 */
@Component({
  moduleId: module.id,
  selector: 'img-cut-dynamic',
  templateUrl: 'img.cut.dynamic.html',
   providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ImgCutDynamicComponent),
    multi: true
  }]
})

export class ImgCutDynamicComponent extends ImgDynamicBaseComponent implements OnInit {
   flagX = true;

   ishidden = true;
   originImg: any;

   isSelectImg = false;

   cropRusult: any;

   cutImgSize: any = '0KB';
   //旋转
   rotateBtn() {
    if (!this.isSelectImg) {
      return;
    }
    $('#tailoringImg_' + this.namekey).cropper('rotate', 45);
  }
  //复位
   resetBtn() {
    if (!this.isSelectImg) {
      return;
    }
    $('#tailoringImg_' + this.namekey).cropper('reset', 45);
    $('#tailoringImg_' + this.namekey).cropper('setData', {width: this._config.width, height: this._config.height});
  }
  //换向
   scaleXBtn() {
     if (!this.isSelectImg) {
       return;
     }
      if (this.flagX) {
        $('#tailoringImg_' + this.namekey).cropper('scaleX', -1);
          this.flagX = false;
      } else {
        $('#tailoringImg_' + this.namekey).cropper('scaleX', 1);
        this.flagX = true;
      }
  }


   showTailor() {
    this.ishidden = false;
    // $('#tailoring_container_' + this.namekey).toggle();
    this.initPreview();
    this.setCenter();
  }
   hideTailor() {
    this.ishidden = true;
    // $('#tailoring_container_' + this.namekey).toggle();
  }
  //裁剪后的处理上传和输出图片
   cutResult() {
    const tailoringImgDiv = $('#tailoringImg_' + this.namekey);
    if (tailoringImgDiv.attr('src') !== null) {
        const cas = tailoringImgDiv.cropper('getCroppedCanvas',
         {width: this._config.width, height: this._config.height}); //获取被裁剪后的canvas
         if (cas) {
          cas.toBlob((blob: any) => {
            this.log('cutResult .  blob  : ' , blob);
            const parmFile: any = [];
            parmFile.push(blob);
            this.upload(parmFile);
          }, 'image/' + this._config.outFileType, 0.95);
         }
    }
  }
  originResult() {
    const parmFile: any = [];
    parmFile.push(this.originImg);
    this.upload(parmFile);
  }

  afterUpload(uploadId: any, file: any) {
    this.hideTailor();
  }

  //选择原始图片
   selectImg(target: any) {
    if (!target.target.files || !target.target.files[0]) {
        return;
    }
    this.originImg = target.target.files[0];
    const reader = new FileReader();
    reader.onload =  (evt: any) =>  {
        const replaceSrc = evt.target.result;
        //更换cropper的图片
        $('#tailoringImg_' + this.namekey).cropper('replace', replaceSrc, false); //默认false，适应高度，不失真
        setTimeout(() => {
          $('#tailoringImg_' + this.namekey).cropper('setData', {width: this._config.width, height: this._config.height});
          this.isSelectImg = true;
        }, 500);
    };
    reader.readAsDataURL(target.target.files[0]);
  }

  public constructor(
     toolUpload: UploadService) {
    super(toolUpload);
  }
  ngOnInit() {
    　　this.log('');
    }
  getSize() {
    const tailoringImgDiv = $('#tailoringImg_' + this.namekey);
    if (tailoringImgDiv.attr('src') !== null) {
        const cas = tailoringImgDiv.cropper('getCroppedCanvas',
         {width: this._config.width, height: this._config.height}); //获取被裁剪后的canvas
         if (cas) {
          cas.toBlob((blob: any) => {
            const s = blob.size / 1024;
            this.cutImgSize = s.toFixed(2) + 'KB';
          }, 'image/' + this._config.outFileType, 0.95);
         }
    }
  }
  private setCenter() {
    const win_height = $(window).height();
    const win_width = $(window).width();
    const containerDiv: any = $('#tailoring_content_' + this.namekey);
    const divHeight = containerDiv.height();
    const divWidth = containerDiv.width();
    this.log('win_height: ' + win_height + '   win_width: ' + win_width + '   divHeight: ' + divHeight + '  divWidth: ' + divWidth);
    if (win_width <= 768) {
      containerDiv.css({
            'top': (win_height - divHeight) / 2,
            'left': 0
        });
    } else {
        containerDiv.css({
            'top': (win_height - divHeight) / 2,
            'left': (win_width - divWidth) / 2
        });
    }
  }
  //初始化 裁剪插件
  private initPreview() {
    const tailoringImgDIV: any = $('#tailoringImg_' + this.namekey);
    tailoringImgDIV.cropper({
      viewMode: this._config.viewMode,
      aspectRatio: this._config.width / this._config.height, //默认比例
      preview: '#previewImgDIV_' + this.namekey, //预览视图
      guides: false,  //裁剪框的虚线(九宫格)
      autoCropArea: 0.5,  //0-1之间的数值，定义自动剪裁区域的大小，默认0.8
      dragCrop: false,  //是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域
      movable: true,  //是否允许移动剪裁框
      cropBoxResizable: false,  //是否允许改变裁剪框的大小
      cropBoxMovable: true,  //禁止裁剪框移动
      zoomable: true,  //是否允许缩放图片大小
      mouseWheelZoom: false,  //是否允许通过鼠标滚轮来缩放图片
      touchDragZoom: true,  //是否允许通过触摸移动来缩放图片
      rotatable: true,  //是否允许旋转图片
      dragMode: this._config.dragMode,
      crop:  (e: any) => {
          // 输出结果数据裁剪图像。
          this.cropRusult = e;
      }
    });
  }
}
