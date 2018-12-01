import { Component, AfterContentInit, forwardRef } from '@angular/core';
import { IdTool } from '../../shared/tool/IdTool';
import { HttpService } from '../../shared/service/HttpService';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DynamicBase } from '../dynamic.base';

declare let $: any;
/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'provincecityarea-dynamic',
  templateUrl: 'provincecityarea.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ProvinceCityAreaDynamicComponent),
    multi: true
  }]
})
export class ProvinceCityAreaDynamicComponent   extends DynamicBase implements AfterContentInit {

  //省市区
  values = {
    province: '',
    city: '',
    area: '',
  };

  //省列表
  pro_list: any;

  //市列表
  city_list: any;

  //区列表
  area_list: any;

  public constructor(
    protected toolHttp: HttpService) {
    super();
  }
  ngAfterContentInit() {
    setTimeout(() => {
      this.byParentId(1, 2, {});
    }, 300);
  }

  changeProvince(event: any) {
    const selectPro = this.pro_list[event.currentTarget.selectedIndex];
    this.byParentId(selectPro.dtc.pt_id.open_id, 3, {selectPro: selectPro});
  }
  changeCity(event: any) {
    const selectCity = this.city_list[event.currentTarget.selectedIndex];
    this.byParentId(selectCity.dtc.pt_id.open_id, 4, {selectCity: selectCity});
  }
  changeArea(event: any) {
    const selectArea = this.area_list[event.currentTarget.selectedIndex];
    this.values.area = selectArea.name;
    this.propagateChange(this.values);
    this.propagateTouched();
  }

  byParentId(parentId: any, stype: any, data: any) {
        const entry = {};
        IdTool.bindQueryData(entry, {parentId: parentId});
        this.toolHttp.httpRequest('/idsys/idsysarea/getSubList', entry).subscribe(
          (result: any) => {
            if (stype === 2) {
              this.pro_list = result.proto_list;
              if (IdTool.isNotEmptyArray(this.pro_list)) {
                //省默认为第一个
                if (IdTool.isEmpty(this.values.province)) {
                  this.values.province = this.pro_list[0].name;
                }
                this.byParentId(this.getSelectedId(this.pro_list, this.values.province), 3, {});
              }
            } else if (stype === 3) {
              //省选中 清空市，区
               if (IdTool.isNotEmptyObject(data.selectPro)) {
                this.values.province = data.selectPro.name;
                this.values.city = '';
                this.values.area = '';
              }
              this.city_list = result.proto_list;
              if (IdTool.isNotEmptyArray(this.city_list)) {
                //市默认为第一个
                if (IdTool.isEmpty(this.values.city)) {
                  this.values.city = this.city_list[0].name;
                }
                this.byParentId(this.getSelectedId(this.city_list, this.values.city), 4, {});
              }
            } else if (stype === 4) {
              //市选中　清空区
              if (IdTool.isNotEmptyObject(data.selectCity)) {
                this.values.city = data.selectCity.name;
                this.values.area = '';
              }
              this.area_list = result.proto_list;
              if (IdTool.isNotEmptyArray(this.area_list)) {
                  //区默认为第一个
                if (IdTool.isEmpty(this.values.area)) {
                  this.values.area = this.area_list[0].name;
                }
              } else {
                this.values.area = '';
              }
            }
            this.propagateChange(this.values);
            this.propagateTouched();
          });
  }

  getSelectedId(list: any , name: any) {
    let openId: any = list[0].dtc.pt_id.open_id;
    list.forEach((item: any) => {
      if (item.name === name) {
        openId = item.dtc.pt_id.open_id;
      }
    });
    return openId;
  }
  /**
   * 给外部formControl写入数据
   * @param {*} value
   */
  writeValue(value: any) {
    if (IdTool.isNotEmpty(value)) {
      this.values = value;
    } else {
      this.values = {
        province: '',
        city: '',
        area: '',
      };
    }
  }
}
