import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { VgAPI } from 'videogular2/core';

export interface IMediaStream {
    source: string;
    label: string;
}

/**
 * This class represents the lazy loaded HomeComponent.
 * https://videogular.github.io/videogular2/docs/getting-started/
 */
@Component({
  moduleId: module.id,
  selector: 'sd-exam-video',
  templateUrl: 'video.component.html',
})
export class VideoComponent implements OnInit, AfterViewInit {

  @ViewChild('vgplay')
  public vgPaly: any;
  @ViewChild('media')
  public vgPalyVideo: any;

  preload: String = 'auto';
  api: VgAPI;

  currentStream: string;
  streams: IMediaStream[] = [
        { label: 'VOD', source: 'http://static.videogular.com/assets/videos/videogular.mp4' },
        { label: 'DASH: Multi rate Streaming', source: 'https://dash.edgesuite.net/dash264/TestCases/2a/qualcomm/1/MultiResMPEG2.mpd' },
        { label: 'DASH: Live Streaming', source: 'https://vm2.dashif.org/livesim/testpic_6s/Manifest.mpd' },
        // tslint:disable-next-line:max-line-length
        // { label: 'HLS: Streaming', source: 'http://43.243.128.213:5556/hls/4.m3u8?id=3&u=18912110324&p=79a54d2352578c9b7990f40e4fc6939aeae53315' }
        { label: 'HLS: Streaming', source: 'http://192.168.2.190:81/mag/hls/b29154518c8b4956894cbaf94ae2e8ec/0/live.m3u8' }
    ];

  // constructor() {}

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    console.log('VideoComponent ngOnInit . ');
    // console.log('VideoComponent ngOnInit . ' , this.vgPaly, this.vgPalyVideo);
    this.currentStream = this.streams[3].source;
  }

  ngAfterViewInit(): void {
    // 测试 HLS 流播放
    // this.currentStream = this.streams[3].source;
    // console.log('VideoComponent ngAfterViewInit . ' , this.vgPaly, this.vgPalyVideo);
    console.log('VideoComponent ngAfterViewInit . ');
  }

  onPlayerReady(api: VgAPI) {
    console.log('VideoComponent onPlayerReady ', api);
    this.api = api;

    this.api.getDefaultMedia().subscriptions.ended.subscribe(
      () => {
          // Set the video to the beginning
          // this.api.getDefaultMedia().currentTime = 0;
          console.log('VideoComponent ended ');
      }
    );
    this.api.getDefaultMedia().subscriptions.error.subscribe( (error: any) => {
      console.log('VideoComponent error ', error);
      if (this.api && this.api.getDefaultMedia()) {
        const vgState = this.api.getDefaultMedia().state;
        console.log('VideoComponent vg player  state : ', vgState);
        this.currentStream = this.currentStream + '#';
      }
    });
  }

}
