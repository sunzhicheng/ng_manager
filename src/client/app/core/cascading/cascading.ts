import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

declare let $: any;

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-cascading',
  templateUrl: 'cascading.html',
  viewProviders: []
})
export class CascadingComponent implements OnInit {

  //省市区
  pro_city_county: any;

  //省列表
  pro_list: any;

  //市列表
  city_list: any;

  //区列表
  county_list: any;

  @Input()
  typeid: any;

  @Input()
  item: any;

  //{pro:{id:1},city:{id:2},county:{id:3 }}
  selected_record: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    // this.pro_city_county =  {province:[{"id":1,"name":"江苏省"},{"id":11,"name":"浙江省"}],
    //   city:[{"id":2,"name":"天津市","pid":1},{"id":12,"name":"杭州市","pid":11}],
    //   county:[{"id":3,"name":"东城区","pid":2},{"id":13,"name":"相称去","pid":12}]};
    // this.initData();
  }

  initData() {
    this.pro_list = this.pro_city_county.province;
    this.getCitysByProvince(this.pro_list[0]);
    this.getCountysByCity(this.city_list[0]);
  }

  getWindow() {
    return window;
  }

  /**
   * {province:[{"id":1,"name":"江苏省"}],
   * city:[{"id":2,"name":"天津市","pid":1}],
   * county:[{"id":3,"name":"东城区","pid":2}]}
   * @param values
     */
  @Input()
  public set data(values: any) {
    this.pro_city_county = values ? values : {pro_list: [], city_list: [], county_list: []};
    if (values) {
      this.pro_list = this.pro_city_county.province;
      if (!this.typeid) {
        this.getCitysByProvince(this.pro_list[0]);
        this.getCountysByCity(this.city_list[0]);
      } else {
        this.setTypeId(this.typeid);
      }
    }
  }

  //传参
  setTypeId(id: any) {
    this.typeid = id;
    if (this.typeid && this.pro_city_county) {
      //根据最底层id查找
      this.findSelectedById(id);

      // var province = this.getProvinceByName();
      // this.getCitysByProvince(province);
      // var city = this.getCityByName();
      // this.getCountysByCity(city);
    }
  }

  findSelectedById(id: any) {
    if (this.pro_city_county) {
      for (const i in this.pro_city_county.province) {
        const provinceItem = this.pro_city_county.province[i];
        if (provinceItem['id'] === id) {
          this.selected_record = {pro: provinceItem};
          this.getCitysByProvince(provinceItem);
          this.getCountysByCity(this.city_list[0]);
          return;
        }
      }

      for (const m in this.pro_city_county.city) {
        const cityItem = this.pro_city_county.city[m];
        if (cityItem['id'] === id) {
          this.selected_record = {pro: {id: cityItem.pid}, city: cityItem};
          this.getCitysByProvince({id: cityItem.pid});
          this.getCountysByCity(cityItem);
          return;
        }
      }

      for (const n in this.pro_city_county.county) {
        const countyItem = this.pro_city_county.county[n];
        if (countyItem['id'] === id) {
          const city = this.getCityById(countyItem.pid);
          this.selected_record = {pro: {id: city.pid}, city: city, county: countyItem};
          this.getCitysByProvince({id: city.pid});
          this.getCountysByCity(city);
          return ;
        }
      }

    }
  }

  getCityById(id: any) {
    for (const m in this.pro_city_county.city) {
      const cityItem = this.pro_city_county.city[m];
      if (cityItem['id'] === id) {
        return cityItem;
      }
    }
  }

  // getProvinceByName() {
  //   var province:any = null;
  //   for(var i in this.pro_city_county.province) {
  //     var provinceItem = this.pro_city_county.province[i];
  //     if(provinceItem['id'] === this.iAddress.province.id) {
  //       province = provinceItem;
  //       break;
  //     }
  //   }
  //   return province;
  // }
  //
  // getCityByName() {
  //   var city:any = null;
  //   for(var i in this.pro_city_county.city) {
  //     var cityItem = this.pro_city_county.city[i];
  //     if(cityItem['id'] === this.iAddress.city.id) {
  //       city = cityItem;
  //       break;
  //     }
  //   }
  //   return city;
  // }

  provinceChange(event: any) {
    const selectPro = this.pro_list[event.currentTarget.selectedIndex];
    this.getCitysByProvince(selectPro);
    this.getCountysByCity(this.city_list[0]);
  }

  getCitysByProvince(pro: any) {
    if (!pro) {
      this.city_list = [];
      return ;
    }
    const filterCitys: any = [];
    for (const i in this.pro_city_county.city) {
      const cityItem = this.pro_city_county.city[i];
      if (cityItem['pid'] === pro.id) {
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
    if (!city) {
      this.county_list = [];
      return ;
    }
    const filterCountys: any = [];
    for (const i in this.pro_city_county.county) {
      const countyItem = this.pro_city_county.county[i];
      if (countyItem['pid'] === city.id) {
        filterCountys.push(countyItem);
      }
    }
    this.county_list = filterCountys;
  }

  getValue() {
    const vaule: any = {};
    const pro: any = (<any>$('#pro_id'))[0];
    const city: any = (<any>$('#city_id'))[0];
    const county: any = (<any>$('#county_id'))[0];
    if (pro) {
      vaule.one = parseInt(pro.value, 10);
    }
    if (city) {
      vaule.two = parseInt(city.value, 10);
    }
    if (county) {
      vaule.three = parseInt(county.value, 10);
    }
    return vaule;
  }
}
