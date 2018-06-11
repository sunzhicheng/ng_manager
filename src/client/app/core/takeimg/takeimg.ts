import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToolHttpService } from '../../shared/tool';

declare function $(filter: string): void;

@Component({
  selector: 'upload-app',
  template: `
  <div style="position:absolute;">
  <img  (click)="getPoint(this,'imgId');" id="imgId"
  src="https://img10.360buyimg.com/imgzone/jfs/t11044/138/86942251/150580/a7ac94a8/59e75ce9Nf7d46f31.jpg" />
  </div>
  <div id="marks">
  </div>

	 `,
  // viewProviders: []
})

export class TakeImgComponent {

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

  public constructor(private toolHttp: ToolHttpService,
    private _router: Router) {

  }

  getMousePos() {
    const e: any = window.event;
    const scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    const scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    const x = e.pageX || e.clientX + scrollX;
    const y = e.pageY || e.clientY + scrollY;
    //alert('x: ' + x + '\ny: ' + y);
    return { 'x': x, 'y': y };
}

  getPoint(el: any, id: any) {//获取点击图片坐标
    const divId: any = $('#' + id);
    const Y = divId.offset().top;  //图片距离顶部的距离
    const X = divId.offset().left;  //图片距离左边的距离
    const mousePos = this.getMousePos();
    const x = mousePos.x; //鼠标的x
    const y = mousePos.y; //鼠标的y
    console.log('鼠标在图片的位置：  ' + (x - X) + ',' + (y - Y)); //这里减8是减去图标的一半，具体可以根据实际图标来定义
    const C = divId.position().top;
    const D = divId.position().left;
    // console.log('图片距离文档：  '+X+','+Y);
    console.log('图片相对于父元素的位置 : ' + C + ',' + D);
  }
}
