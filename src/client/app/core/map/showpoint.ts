import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit, forwardRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../shared/idorp/service/HttpService';
import { IUtils } from '../../shared/idorp/providers/IUtils';
import { ControlValueAccessor } from '@angular/forms';

declare let $: any;

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'takemap-dynamic',
  template: `
  <div class="panel-body" style="height:500px" id="container">
  </div>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TakeMapDynamicComponent),
    multi: true
  }]
})

export class TakeMapDynamicComponent implements AfterViewInit {

  /**
   * 地图来源
   */
  _source: any = 'baidu';
  @Input()
  public set source(v: any) {
    if (v) {
      this._source = v;
    }
  }
  /**
   * [{longitude:?,latitude:?,pic:?,title:?,desc:?,fun:?}]
   */
  @Input()
  pointList: any = [];

  map: any;

  ngAfterViewInit() {
    if (this._source === 'baidu') {
      this.initBaiduMap();
    } else if (this._source === 'qq') {
      this.initQQMap();
    }
    //添加点标记
    if (this.pointList) {
      this.pointList.forEach((point: any) => {
        if (this._source === 'baidu') {
          this.addMarkerForQQ(point);
        } else {
          this.addMarkerForBaidu(point);
        }
      });
    }
  }
  initQQMap() {
    const win: any = (<any>window);
    const center = new win.qq.maps.LatLng(32.235790, 119.797050);
    this.map = new win.qq.maps.Map(document.getElementById('container'), {
        center: center,
        zoom: 13
    });
  }

  initBaiduMap() {
    //创建Map实例
    const win: any = (<any>window);
    this.map = new win.BMap.Map('container');            // 创建Map实例
    this.map.centerAndZoom(new win.BMap.Point(119.797050, 32.235790), 13);
    //添加缩略图控件
    this.map.addControl(new win.BMap.OverviewMapControl({ isOpen: false, anchor: 'BMAP_ANCHOR_BOTTOM_RIGHT' }));
    //添加缩放平移控件
    this.map.addControl(new win.BMap.NavigationControl());
    //添加比例尺控件
    this.map.addControl(new win.BMap.ScaleControl());
    this.map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
    this.map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
  }
  addMarkerForQQ(point: any) {
    const win: any = (<any>window);
    const position = new win.qq.maps.LatLng(point.longitude, point.latitude);
    const anchor = new win.qq.maps.Point(6, 6);
    const size = new win.qq.maps.Size(64, 64);
    const scaleSize = new win.qq.maps.Size(30, 30);
    const origin = new win.qq.maps.Point(0, 0);
    const icon = new win.qq.maps.MarkerImage(point.pic, size, origin, anchor, scaleSize);
    const marker = new win.qq.maps.Marker({
      icon: icon,
      map: this.map,
      position: position
    });
    //添加到提示窗
    const info = new win.qq.maps.InfoWindow({
      map: this.map
    });
    win.toDetail = (id: any) => {
      this.toDetail(id);
    };

    //获取标记的点击事件
    win.qq.maps.event.addListener(marker, 'click', () => {
      info.open();

      let content = '<table>';
      // content = content + '<tr><td>' + '设备状态:' + point.desc + '</td></tr>';
      // content = content + '<tr><td>' + '设备名称: ' + point.title + '</td></tr>';
      // content = content + '<tr><td>设备详情: ' + ' <a href=javascript:toDetail(' + point.fun + ')>进入</a></td></tr>';
      content += '</table>';
      info.setContent(content);
      info.setPosition(position);
    });
  }

  toDetail(callback: any) {
    if (callback) {
      callback.call();
    }
  }

  addMarkerForBaidu(point: any) {
    const win: any = (<any>window);
    win.toDetail = (id: any) => {
      this.toDetail(id);
    };
    const myIcon = new win.BMap.Icon(point.pic, new win.BMap.Size(64, 64),
      {
        anchor: new win.BMap.Size(6, 6),
        imageSize: new win.BMap.Size(30, 30)
      });
    //设置标注的图标
    // var icon = new win.BMap.Icon('../../../assets/images/search-icon.png',new BMap.Size(100,100));
    //设置标注的经纬度
    const marker = new win.BMap.Marker(new win.BMap.Point(point.longitude, point.latitude), { icon: myIcon });
    //把标注添加到地图上
   this.map.addOverlay(marker);
    let content = '<table>';
    // content = content + '<tr><td>' + '中转站状态:' + point.desc + '</td></tr>';
    // content = content + '<tr><td>' + '中转站名称: ' + device.wt.name + '</td></tr>';
    // content = content + '<tr><td>' + '详细地址: ' + device.wt.addr.address + '</td></tr>';
    // content = content + '<tr><td>设备详情: ' + ' <a href=javascript:detailWt(' + device.wt.pt_id.l_id + ')>进入</a></td></tr>';
    content += '</table>';
    const infowindow = new win.BMap.InfoWindow(content);
    marker.addEventListener('click', function () {
      this.openInfoWindow(infowindow);
    });
  }
}
