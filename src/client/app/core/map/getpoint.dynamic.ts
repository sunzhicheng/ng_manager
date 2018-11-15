import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit, forwardRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../shared/idorp/service/HttpService';
import { IdTool } from '../../shared/tool/IdTool';
import { ControlValueAccessor } from '@angular/forms';
import { DynamicBase } from '../dynamic.base';
import { ToolAlert } from '../../shared/tool/ToolAlert';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

declare let $: any;

/**
 * This class represents the lazy loaded HomeComponent.
 * <div id="searchResultPanel"
      style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"
      ></div>
 */
// <input type="text" #suggestId size="20"  style="width:150px;height:30px" />
//       <button  type="button" class="btn btn-primary" (click)="doSearch(suggestId.value)">搜索</button>
@Component({
  moduleId: module.id,
  selector: 'takepoint-dynamic',
  template: `
  <input class="form-control" type="text" (click)="show()" [disabled]="isDisabled"
   [value]="getPointDesc()" (change)="getPointFromInput($event)"/>

  <div class="modal fade" id="{{namekey}}">
  <div class="modal-dialog" style="width: 1000px;">
    <div class="modal-content" style="min-height: 700px;">
    <div class="modal-header">
         <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
         <h4 class="modal-title">选择地址</h4>
       </div>
       <div class="modal-body">
       <div class="row">
         <div class="col-xs-4">
         <div class="input-group m-b">
          <input type="text" class="form-control" #suggestId size="20">
          <span class="input-group-btn">
            <button class="btn btn-primary" (click)="doSearch(suggestId.value)" type="button">搜索</button>
          </span>
        </div>
         </div>
       </div>
        <div class="panel-body" style="height:550px" id="container">
        </div>
       </div>
       <div class="modal-footer">
       <!--取消按钮-->
       <button  type="button" class="btn btn-primary" (click)="hide()">关闭</button>
      </div>
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TakePointDynamicComponent),
    multi: true
  }]
})


export class TakePointDynamicComponent extends DynamicBase implements AfterViewInit {

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
   * 获取方式   map 从地图中取点
   *           input  通过输入取点
   */
  _model: any = 'map';
  @Input()
  public set model(v: any) {
    if (v) {
      this._model = v;
    }
  }

  map: any;
  point: any = {};

  ngAfterViewInit() {
    if (this._source === 'baidu') {
      this.initBaiduMap();
    } else if (this._source === 'qq') {
      this.initQQMap();
    }
  }
  getPointFromInput(e: any) {
    // console.log('getPointFromInput : ' + e);
    if (this._model !== 'map') {
      const v = e.currentTarget.value;
      if (v && v.indexOf(',') !== -1) {
        const vArr = v.split(',');
        this.propagateChange({ longitude: vArr[0], latitude: vArr[1] });
        this.propagateTouched();
      }
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
    this.map.centerAndZoom('杭州', 13);

    //添加缩略图控件
    this.map.addControl(new win.BMap.OverviewMapControl({ isOpen: false, anchor: 'BMAP_ANCHOR_BOTTOM_RIGHT' }));
    //添加缩放平移控件
    this.map.addControl(new win.BMap.NavigationControl());
    //添加比例尺控件
    this.map.addControl(new win.BMap.ScaleControl());
    this.map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
    this.map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
    const geoc = new win.BMap.Geocoder();

    // map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
    // var local = new BMap.LocalSearch(map, {
    //   renderOptions:{map: map}
    // });
    // local.search("景点");

    this.map.addEventListener('click', (e: any) => {
      //通过点击百度地图，可以获取到对应的point, 由point的lng、lat属性就可以获取对应的经度纬度
      const pt = e.point;
      geoc.getLocation(pt, (rs: any) => {
        //addressComponents对象可以获取到详细的地址信息
        const addComp = rs.addressComponents;
        // tslint:disable-next-line:max-line-length
        const site = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
        //将对应的HTML元素设置值
        this.point.site = site;
        this.point.longitude = pt.lng + '';
        this.point.latitude = pt.lat + '';
        this.addPoint(this.point);

        this.propagateChange(this.point);
        this.propagateTouched();
      });
    });
  }

  /**
   * 关键字只能搜索
   */
  doSearch(myValue: any) {
    const win: any = (<any>window);
    this.map.clearOverlays();    //清除地图上所有覆盖物
    const local = new win.BMap.LocalSearch(this.map, { //智能搜索
      onSearchComplete: () => {
        const searchResult = local.getResults();
        if (searchResult && searchResult.getPoi(0)) {
          const pt = searchResult.getPoi(0).point;    //获取第一个智能搜索的结果
          this.point.site = myValue;
          this.point.longitude = pt.lng + '';
          this.point.latitude = pt.lat + '';
          this.map.centerAndZoom(pt, 13);
          this.addPoint(this.point);
        } else {
          ToolAlert.error('请输入正确的搜索条件');
        }
      }
    });
    local.search(myValue);
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
    //获取标记的点击事件
    win.qq.maps.event.addListener(marker, 'click', () => {
      info.open();

      let content = '<table>';
      content = content + '<tr><td>' + '经度:' + point.longitude + '</td></tr>';
      content = content + '<tr><td>' + '维度: ' + point.latitude + '</td></tr>';
      content = content + '<tr><td>' + '详细地址: ' + point.site + '</td></tr>';
      content += '</table>';
      info.setContent(content);
      info.setPosition(position);
    });
  }

  addMarkerForBaidu(point: any) {
    const win: any = (<any>window);
    let myIcon: any;
    if (point.pic) {
      myIcon = new win.BMap.Icon(point.pic, new win.BMap.Size(64, 64),
        {
          anchor: new win.BMap.Size(6, 6),
          imageSize: new win.BMap.Size(30, 30)
        });
    }
    const longitude = parseFloat(point.longitude + '');
    const latitude = parseFloat(point.latitude + '');
    //设置标注的图标
    // var icon = new win.BMap.Icon('../../../assets/images/search-icon.png',new BMap.Size(100,100));
    //设置标注的经纬度
    let marker: any;
    if (myIcon) {
      marker = new win.BMap.Marker(new win.BMap.Point(longitude, latitude), { icon: myIcon });
    } else {
      marker = new win.BMap.Marker(new win.BMap.Point(longitude, latitude));
    }
    //把标注添加到地图上
    this.map.addOverlay(marker);
    let content = '<table>';
    content = content + '<tr><td>' + '经度:' + longitude + '</td></tr>';
    content = content + '<tr><td>' + '维度: ' + latitude + '</td></tr>';
    if (point.site) {
      content = content + '<tr><td>' + '详细地址: ' + point.site + '</td></tr>';
    }
    content += '</table>';
    const infowindow = new win.BMap.InfoWindow(content);
    marker.openInfoWindow(infowindow);
    // marker.addEventListener('click', function () {
    //   this.openInfoWindow(infowindow);
    // });
  }

  show() {
    if (this._model === 'map') {
      (<any>$('#' + this.namekey)).modal('show');
    }
  }
  hide() {
    (<any>$('#' + this.namekey)).modal('hide');
  }
  getPointDesc() {
    if (this.point && this.point.longitude && this.point.latitude) {
      return this.point.longitude + ',' + this.point.latitude;
    } else {
      return '';
    }
  }
  addPoint(point: any) {
    this.map.clearOverlays();
    if (this._source === 'baidu') {
      this.map.centerAndZoom(point, 13);
      this.addMarkerForBaidu(point);
    } else if (this._source === 'qq') {
      this.addMarkerForQQ(point);
    }
  }
  /**
   * 给外部formControl写入数据
   * @param {*} value
   */
  writeValue(point: any) {
    if (IdTool.isNotEmptyArray(point) && point.longitude && point.latitude) {
      this.point = point;
      this.addPoint(this.point);
    } else {
      this.point = {};
    }
  }
}
