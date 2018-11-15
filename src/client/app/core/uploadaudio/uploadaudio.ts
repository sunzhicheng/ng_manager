import { IdTool } from '../../shared/tool/IdTool';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToolAlert } from '../../shared/tool/ToolAlert';
import { IDCONF } from '../../shared/idorp/config/app.config';
import { UploadService } from '../../shared/idorp/service/UploadService';

// 不建议使用
declare  let $: any;

@Component({
  selector: 'upload-audio',
  template: `
    <div class="col-lg-9" *ngIf="item&&(!item.disabled)">
    <input type="file" class="filestyle" data-icon="false" data-classButton="btn btn-default"
    data-classInput="form-control inline input-s"
    (change)='upload($event)'>
    </div>
    <label *ngIf="img_id > 0" class="col-lg-3 control-label"></label>
    <div class="col-lg-9" *ngIf="img_id > 0">
    <audio id="audiofile1" src="{{ showImg() }}" controls="controls" preload hidden></audio>
    <button class="btn btn-default btn-sm" id="btn-1" href="#btn-1" data-toggle="class:btn-success">
      <i class="fa fa-play text"></i>
      <span class="text" (click)="playAudio()" >播放</span>
      <i class="fa fa-pause text-active"></i>
      <span class="text-active" (click)="pauseAudio()">结束</span>
    </button>
    <span class="m-t-xs">{{ duration }}</span>
    </div>
    <input type="hidden" id="{{ namekey }}"/>
  `,
  // viewProviders: []
})

export class UploadAudioComponent {

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

  public duration: any;

  public constructor(private toolUpload: UploadService,
        ) {
  }


  public upload(target: any) {
    // console.log('item.disabled : '+this.item.disabled);
    console.log('添加文件数 ： ' + target.target.files.length);
    console.log('namekey  :' + this.namekey);
    if (target.target.files.length <= 0) {
      return;
    }
    const parmFile: any = [];
    const file = target.target.files[0];
    parmFile.push(file);
    ToolAlert.showLoad();
    this.isInloading = true;
    this.toolUpload.filesAjax(parmFile).subscribe((result: any) => {
      if (result) {
        const token = result.token;
        this.isInloading = false;
        if (this.toolUpload.isNotEx(token)) {
          console.log('上传成功!');
          const uploadId = result['attList'][0]['pt_id']['l_id'];
          ToolAlert.hideLoad();
          const f: any = $('#' + this.namekey);
          f.val(uploadId);
          this.getId.emit(uploadId);
          this.getPtId.emit(result['attList'][0]['pt_id']);
        }
      }
    });
  }

  public showImg() {
    if (this.isInloading) {
      return 'assets/images/loading_400.gif';
    }
    if (this.img_id) {
      //console.log('!!!!!src:',this.toolHttp.getImgUrl(this.img_id));
      return IdTool.getImgUrl(this.img_id);
    } else {
      return 'assets/images/upload-index-bg.png';
    }
  }

  /**
   * 播放视频
   */
  playAudio() {
    const music = $('#audiofile1')[0];
    //var music : any = document.getElementById('audiofile1');
    music.play();
  }


  /**
   * 播放视频
   */
  pauseAudio() {
    const music = $('#audiofile1')[0];
    //var music: any = document.getElementById('audiofile1');
    music.pause();
  }

  getduration() {
    const music = $('#audiofile1')[0];
    this.duration = music.duration;
  }

}
