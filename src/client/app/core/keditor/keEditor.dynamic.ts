import { IdTool } from '../../shared/tool/IdTool';
import { HttpService } from './../../shared/idorp/service/HttpService';
import { Component, AfterViewInit, Input, forwardRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { GpbService } from '../../shared/idorp/service/gpb.service';
import { DynamicBase } from '../dynamic.base';
import { ImgCutComponent } from '../upload/img/img.cut';
import { UploadService } from '../../shared/idorp/service/UploadService';
declare var KindEditor: any;
declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'keeditor-dynamic',
  styleUrls: ['keeditor.dynamic.css'],
  template: `
  <textarea name="{{namekey}}"   style="width:100%; max-width: 100%;height:200px;visibility:hidden;"></textarea>
  <img-cut [config]="_config" (outUploadId)="getUploadId($event)"></img-cut>
  `,
  viewProviders: [HttpService],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => KeEditorDynamicComponent),
    multi: true
  }]
})

export class KeEditorDynamicComponent extends DynamicBase implements AfterViewInit {

  uploadUrl = '/idsys/idfileupload/kindeditor/uploadweb';
  initChange = false;
  public editor: any;
  //裁剪图片dom
  dom: any;

  //支持的文件类型
  _config: any = {
    //裁剪图片 的配置  start
    canUploadCount: 1, fileSize: 5 * 1024,  //图片的公共属性
    width: 400, height: 400,  //裁剪之后的宽和高
    outFileType: 'jpeg', //裁剪之后 输出的图片格式
    isShowOriginBtn: false, //是否现实原图上传按钮
    viewMode: 0,  //裁剪控件  模式  0：没有限制，3可以移动到2外。
    // 1 : 3只能在2内移动。 2：2图片 不全部铺满1 （即缩小时可以有一边出现空隙） 3：2图片填充整个1
    dragMode: 'move',  //‘crop’: 可以产生一个新的裁剪框3 ‘move’: 只可以移动3 ‘none’: 什么也不处理
    //裁剪图片 的配置 end

    pasteType: 1,
    designMode: true,
    needCutImg: false,
  };
  @Input()
  public set config(values: any) {
    if (values) {
      IdTool.mergeAFromB(this._config, values, {});
    }
  }

  @ViewChild(ImgCutComponent)
  public imgCut: ImgCutComponent;


  public constructor(protected toolGpb: GpbService,
    protected toolUpload: UploadService) {
    super();
  }
  getUploadId(uploadId: any) {
    if (this.dom) {
      this.dom.insertHtml(`<img  src="` + IdTool.getImgUrl(uploadId) + `" />`);
    }
  }
  ngAfterViewInit() {
    const k: any = KindEditor;
    const me = this;
    if (this._config.needCutImg) {
      k.lang({
        image: '裁剪图片'
      });
      k.plugin('image', function (K: any) {
        me.dom = this,
          me.dom.clickToolbar('image', function () {
            me.imgCut.showTailor();
          });
      });
    }
    this.editor = k.create('textarea[name=' + this.namekey + ']', {
      allowFileManager: true,
      allowImageUpload: true,
      uploadJson: this.uploadUrl,
      pasteType: this._config.pasteType,
      designMode: this._config.designMode,
      items: [
        'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste',
        'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
        'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
        'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
        'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
        'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|',
        'image',
        // 'flash', 'media','insertfile',
        'table', 'hr',
        // 'emoticons', //表情
        //'baidumap', 'pagebreak','anchor', 'link',
        'unlink', 'about'
      ],
      noDisableItems: ['source', 'fullscreen'],
      uploadImageAjax: { fun: me.uploadImageAjax, target: me },
      afterChange: () => {
        if (this.editor) {
          if (!this.initChange) {
            this.propagateChange(this.editor.html());
            this.propagateTouched();
          } else {
            this.initChange = false;
          }
        }
      },
      basePath: '/js/kindeditor/'
    });
    this.initChange = true;
    this.editor.html(this.inV[0]);
  }

  public uploadImageAjax(file: any, imageUploadAjaxAfter: any) {
    const files: any = [];
    files.push(file);
    this.toolUpload.filesAjax(files).subscribe((result: any) => {
      let data: any;
      if (this.toolUpload.isNotEx(result)) {
        const att = result.attList[0];
        data = {
          url: IdTool.getImgUrl(att.pt_id.open_id),
          error: 0,
          message: '上传成功'
        };
      } else {
        data = { error: 1, message: result.token.ex.ex_tips };
      }
      if (imageUploadAjaxAfter) {
        imageUploadAjaxAfter.fun.call(imageUploadAjaxAfter.target, data);
      }
    });
  }
  /**
   * 给外部formControl写入数据
   * @param {*} value
   */
  writeV(value: any) {
    if (IdTool.isNotEmpty(value)) {
      this.inV.push(value);
    } else {
      this.inV.push('');
    }
    if (this.editor) {
      if (this.inV[0] !== '') {
        this.editor.html(this.inV[0]);
      }
    }
  }
  setDisabled(v: any) {
    if (this.editor) {
      if (v) {
        this.editor.readonly();
      } else {
        this.editor.readonly(false);
      }
    } else {
      setTimeout(() => {
        this.setDisabled(v);
      }, 1000);
    }
  }
}
