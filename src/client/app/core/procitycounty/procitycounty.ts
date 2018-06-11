import { Component, OnInit, AfterContentInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare let $: any;
/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-procitycounty',
  templateUrl: 'procitycounty.html'
})
export class ProCityCountyComponent implements OnInit, AfterContentInit {

  //省市区
  pro_city_county: any;

  //省列表
  pro_list: any;

  //市列表
  city_list: any;

  //区列表
  county_list: any;

  //选中的省市区
  @Input()
  iAddress: any;

  @Input()
  item: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.initData();
  }

  //传参
  setIAddress(iAddress: any) {
    this.iAddress = iAddress;
    if (this.iAddress) {
      const province = this.getProvinceByName();
      this.getCitysByProvince(province);
      const city = this.getCityByName();
      this.getCountysByCity(city);
    }
  }

  initData() {
    //省市区数据初始化
    if (!this.iAddress) {
      this.pro_city_county = (<any>window).pro_city_county;
      this.pro_list = this.pro_city_county.province;
      this.getCitysByProvince(this.pro_list[0]);
      this.getCountysByCity(this.city_list[0]);
    }
  }

  ngAfterContentInit() {
    console.log('..');
  }

  getWindow() {
    return window;
  }

  getProvinceByName() {
    let province: any = null;
    if (!this.pro_city_county) {
      this.pro_city_county = (<any>window).pro_city_county;
    }
    for (const i in this.pro_city_county.province) {
      const provinceItem = this.pro_city_county.province[i];
      if (provinceItem['name'] === this.iAddress.province.provinceName) {
        province = provinceItem;
        break;
      }
    }
    return province;
  }

  getCityByName() {
    let city: any = null;
    if (!this.pro_city_county) {
      this.pro_city_county = (<any>window).pro_city_county;
    }
    for (const i in this.pro_city_county.city) {
      const cityItem = this.pro_city_county.city[i];
      if (cityItem['name'] === this.iAddress.city.cityName) {
        city = cityItem;
        break;
      }
    }
    return city;
  }

  provinceChange(event: any) {
    const selectPro = this.pro_list[event.currentTarget.selectedIndex];
    this.getCitysByProvince(selectPro);
    this.getCountysByCity(this.city_list[0]);
  }

  getCitysByProvince(pro: any) {
    const filterCitys: any = [];
    for (const i in this.pro_city_county.city) {
      const cityItem = this.pro_city_county.city[i];
      if (cityItem['ProID'] === pro.ProID) {
        filterCitys.push(cityItem);
      }
    }
    this.city_list = filterCitys;
  }

  cityChange(event: any) {
    const selectCity = this.city_list[event.currentTarget.selectedIndex];
    this.getCountysByCity(selectCity);
  }

  getCountysByCity(city: any) {
    const filterCountys: any = [];
    for (const i in this.pro_city_county.county) {
      const countyItem = this.pro_city_county.county[i];
      if (countyItem['CityID'] === city.CityID) {
        filterCountys.push(countyItem);
      }
    }
    this.county_list = filterCountys;
  }

  /**
   * var address = this.toolHttp.getDyformItem('procitycounty').getValue();
   * @returns {any}
     */
  getAddress() {
    const address: any = {};
    const province: any = {};
    province.provinceName = (<any>$('#pro_id'))[0].value;
    const city: any = {};
    city.cityName = (<any>$('#city_id'))[0].value;
    const area: any = {};
    area.areaName = (<any>$('#county_id'))[0].value;
    address.province = province;
    address.city = city;
    address.area = area;
    return address;
  }

  /**
   *       var address = {province:{provinceName:'天津市'},city:{cityName:'天津市'},area:{areaName:'和平区' }};
   *       this.toolHttp.getDyformItem('procitycounty').setValue(address);
   * @param address
     */
  setAddress(address: any) {
    (<any>$('#pro_id'))[0].value = address.province.provinceName ;

    let pro: any ;
    for (const i in this.pro_city_county.province) {
      const proItem = this.pro_city_county.province[i];
      if (proItem['name'] === address.province.provinceName ) {
        pro = proItem ;
      }
    }
    this.getCitysByProvince(pro);

    let ci: any ;
    for (const ii in this.pro_city_county.city) {
      const cityItem = this.pro_city_county.city[ii];
      if (cityItem['name'] === address.city.cityName) {
        ci = cityItem;
      }
    }
    this.getCountysByCity(ci);

    (<any>$('#city_id'))[0].value = address.city.cityName;

    (<any>$('#county_id'))[0].value = address.area.areaName;
  }
}
