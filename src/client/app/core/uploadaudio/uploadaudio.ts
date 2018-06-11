import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToolHttpService } from '../../shared/tool/tool-http.service';

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

  public constructor(private toolHttp: ToolHttpService,
                     private _router: Router
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
    this.toolHttp.showLoad();
    this.isInloading = true;
    this.toolHttp.filesAjax(parmFile, (result: any, t: any) => {
      if (result) {
        const token = result.token;
        this.isInloading = false;
        if (this.toolHttp.isEx(token)) {
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
      return 'assets/images/loading_400.gif';
    }
    if (this.img_id) {
      //console.log('!!!!!src:',this.toolHttp.getImgUrl(this.img_id));
      return this.toolHttp.getImgUrl(this.img_id);
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