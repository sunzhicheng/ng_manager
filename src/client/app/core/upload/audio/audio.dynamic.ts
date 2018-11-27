import { Component, forwardRef } from '@angular/core';
import { UploadService } from '../../../shared/service/UploadService';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { UploadDynamicBaseComponent } from '../upload.dynamic.base.';

// 不建议使用
declare let $: any;

@Component({
  moduleId: module.id,
  selector: 'audio-dynamic',
  templateUrl: 'audio.dynamic.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AudioDynamicComponent),
    multi: true
  }]
})

export class AudioDynamicComponent extends UploadDynamicBaseComponent {


  public isInloading = false;

  public duration: any;

  constructor(
    protected toolUpload: UploadService) {
    super(toolUpload);
  }


  public uploadAudio(target: any) {
    if (target.target.files.length <= 0) {
      return;
    }
    const parmFile: any = [];
    const file = target.target.files[0];
    parmFile.push(file);
    this.upload(parmFile);
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
