import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare let $: any;

@Component({
  selector: 'img-point',
  template: `
  <div class="map-item">
  <img src="{{ imgSrc }}"  id="{{ imgId }}" (click)="getPoint()">
  <div id="{{ mark_id }}"></div>
  </div>
	 `,
  // viewProviders: []
})

export class ImgPointComponent implements OnInit, OnChanges {
  @Input()
  public imgSrc: string;
  /**
   * 所有点的集合 {x:'',y:'',id:'',icon:IBMSIconBase对象,device_type:''}
   * device_type区分 停车场那边的  出入口和道杂在同一张图上面显示
   */
  @Input()
  public pList: any;

  @Input()
  public opt_config: any = {
    isGet: false,
    loadOnlyOnce: false
  };
  @Output()
  public clickBack: EventEmitter<any> = new EventEmitter();
  @Output()
  public clickBack2: EventEmitter<any> = new EventEmitter();
  @Output()
  public getPointBack: EventEmitter<any> = new EventEmitter();

  mark_id: any;
  imgId: any;

  //是否加载完成
  loaded = false;

  public constructor(private _router: Router
        ) {
  }

  ngOnInit() {
    const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    this.mark_id = 'mark_' + random;
    this.imgId = 'img_' + random;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.loaded && this.opt_config.loadOnlyOnce) {
      return;
    }
    this.addPoints();
  }

  addPoints() {
    const markDiv: any = $('#' + this.mark_id);
    markDiv.empty();
    if (!this.pList) {
      return;
    }

    //将图上的点位信息清空(否则会产生干扰)
    setTimeout( () => {
      //显示新的点位之前先清空之前的点位
      const markDiv: any = $('#' + this.mark_id);
      markDiv.empty();
    }, 300);

    if (this.pList.length > 0) {
      for (let i = 0; i < this.pList.length; i++) {
        this.showPoints(this.pList[i].x, this.pList[i].y, this.pList[i].id,
          this.pList[i].icon, this.pList[i].device_type);
      }
    }
    this.loaded = true;
  }

  /**
   * 在图片上显示点标记
   * @param el
   * @param id
   * @param markId
   */
  showPoints(x: any, y: any, vId: any, icon: any, device_type: any) {
    setTimeout( () => {
      //给图片加点
      const left = x * 100;
      const top = y * 100;
      const img = document.createElement('a');
      img.setAttribute('id', vId);
      img.setAttribute('class', 'point');  //各个状态  s1：故障   s2：正常  s3:失联   s4:报警
      img.style.top = 'calc(' + top + '% - 11px' + ')';
      img.style.left = 'calc(' + left + '% - 11px' + ')';

      img.onclick = () => {
        // console.log(img.getAttribute('id'));
        const clickId = img.getAttribute('id');
        this.clickBack.emit(clickId);
        const arr: any = [];
        arr.push({id: clickId, device_type: device_type});
        this.clickBack2.emit(arr);

      };
      const markDiv: any = $('#' + this.mark_id);
      markDiv.append(img);
      const arrow = document.createElement('i');
      //arrow.setAttribute('class','fa fa-location-arrow');
      if (icon) {
        let iconClass = icon.icon_class;
        if (!iconClass) {
          iconClass = icon.icon_unicode;
        }
        if (iconClass) {
          arrow.setAttribute('class', 'iconfont  ' + iconClass);
        } else {
          arrow.setAttribute('class', 'fa fa-location-arrow');
        }
      } else {
        arrow.setAttribute('class', 'fa fa-location-arrow');
      }
      img.appendChild(arrow);
    }, 300);
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
  getPoint() {//获取点击图片坐标
    if (!this.opt_config.isGet) {
      return;
    }
    const divId: any = $('#' + this.imgId);
    const Y = divId.offset().top;  //图片距离顶部的距离
    const X = divId.offset().left;  //图片距离左边的距离
    const mousePos = this.getMousePos();
    const x = mousePos.x; //鼠标的x
    const y = mousePos.y; //鼠标的y
    // console.log('鼠标在图片的位置：  ' + (x - X) + ',' + (y - Y)); //这里减8是减去图标的一半，具体可以根据实际图标来定义
    const C = divId.position().top;
    const D = divId.position().left;
    // console.log('图片距离文档：  '+X+','+Y);
    console.log('图片相对于父元素的位置 : ' + C + ',' + D);

    const top = (y - Y) / divId.height();
    const left = (x - X) / divId.width();

    const pointX = x - X;
    const pointY = y - Y;
    //清除点
    const markDiv: any = $('#' + this.mark_id);
    markDiv.empty();
    this.showPoints(left, top, 'imgId', {}, 1);     //在图片上显示点
    const imgX = pointX / divId.width();
    const imgY = pointY / divId.height();
    this.getPointBack.emit([imgX, imgY]);
  }
}
