import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../shared/idorp/service/HttpService';
import { IDCONF } from '../../shared/idorp/config/app.config';

// 不建议使用
declare function $(filter: string): void;

@Component({
  selector: 'uploadvideo-app',
  template: `
   <div *ngIf="item&&!item.disabled" class="upload-index-btn">
        <p>浏览...</p>
        <input type="file" (change)='upload($event)'>
    </div>
    <div class="upload-index-box" style="text-align: center;margin-top: 5px;">
        <a>{{ showImg() }}</a>
    </div>
    <input type='hidden'   id="{{namekey}}"  />
	 `
})

export class UploadVideoComponent {

  @Input()
  public namekey: string;

  @Input()
  public opt_config: any = {
    'class': 1
  };

  @Input()
  public item: any;

  @Input()
  public img_id: any ;


  @Output()
  public getId: EventEmitter<any> = new EventEmitter();

  @Output()
  public getPtId: EventEmitter<any> = new EventEmitter();

  public isInloading = false;

  public constructor(private toolHttp: HttpService,
                     private _router: Router
  ) {

  }

  public upload(target: any) {
    console.log('添加文件数 ： ' + target.target.files.length);
    console.log('namekey  :' + this.namekey);
    if (target.target.files.length <= 0) {
      return;
    }
    const parmFile: any = [];
    const file = target.target.files[0];
    parmFile.push(file);
    this.toolHttp.showLoad();
    this.isInloading = true;
    const fileUrl = IDCONF().api_file + '/idsys/idfileupload/upload';
    this.toolHttp.filesAjax(parmFile, fileUrl, (result: any, t: any) => {
      if (result) {
        const token = result.token;
        this.isInloading = false;
        if (this.toolHttp.isNotEx(token)) {
          // let error_type = token.ex.ex_type;
          // me.toolHttp._error(token.ex.ex_tips);
          // if (error_type === 1 || error_type === 2) {
          //   me._router.navigateByUrl('/');
          // }
          // return;
          console.log('上传成功!');
          const uploadId = result['attList'][0]['pt_id']['l_id'];
          this.toolHttp.hideLoad();
          const f: any = $('#' + this.namekey);
          f.val(uploadId);
          this.getId.emit(uploadId);
          this.getPtId.emit(result['attList'][0]['pt_id']);
        }
      }
    }, this, target);
  }

  public showImg() {
    if (this.isInloading) {
      return '上传中...';
    }
    if (this.img_id) {
      return this.toolHttp.getImgUrl(this.img_id);
    } else {
      return '未选择';
    }
  }

}
