import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ToolHttpService } from '../../shared/tool/tool-http.service';
import { ToolGpbService } from '../../shared/tool/tool-gpb.service';
import { VgAPI } from 'videogular2/core';


export interface IMediaStream {
    source: string;
    label: string;
}

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'video-tool',
  templateUrl: 'video.component.html',
  styleUrls: [ 'video.component.css' ]
})
export class VideoToolComponent implements OnInit, AfterViewInit, OnDestroy {

  currentItem: any = {};
  @Input()
  public url: any;

  isError = false;

  canPlay = true;

  api: VgAPI;

constructor(private toolHttp: ToolHttpService,
  private router: ActivatedRoute,
  private toolGpb: ToolGpbService
) {
  }

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    console.log('ngOnInit...');
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.openCamera();
    }, 500);
  }

  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.error.subscribe(
      () => {
        console.log('canPlay...');
        this.isError = true;
      }
    );
    this.api.getDefaultMedia().subscriptions.canPlay.subscribe(
      () => {
        this.isError = false;
      }
  );
    setTimeout(() => {
      if (this.isError === true)
          this.canPlay = false;
    }, 5000);
  }
  openCamera() {
    if (!this.url || this.url.indexOf('m3u8') === -1) {
      return;
      // this.toolHttp._waring('缺少参数');
    }
    this.currentItem.src = this.url;
  }
  ngOnDestroy(): void {
      console.log('VideoComponent   destroy ..... ');
  }

  error() {
    console.log('VideoComponent   error ..... ');
  }
}
