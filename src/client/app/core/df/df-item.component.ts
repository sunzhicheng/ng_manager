import { Component, Input, ViewChild, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DFControlService } from './df-control.service';
import { ProCityCountyComponent } from '../procitycounty/procitycounty';
import { CascadingComponent } from '../cascading/cascading';
import { ToolHttpService } from '../../shared/tool';

declare let $: any;

@Component({
  moduleId: module.id,
  selector: 'df-item',
  templateUrl: 'df-item.component.html'
})
export class DFItemComponent implements OnChanges {
  @ViewChild('cascading')
  public cascading: CascadingComponent;
  @ViewChild('procitycounty')
  public proCityCounty: ProCityCountyComponent;
  @Input() item: any;
  @Input() f_type: any = 1;
  @Input() form: FormGroup;
  //下拉框选择改变
  @Output()
  public selectchangeout: EventEmitter<any> = new EventEmitter();
  //按钮点击
  @Output()
  public btnclickout: EventEmitter<any> = new EventEmitter();

  //图片上传ID
  img_id: any;

  //时间控件日期
  date_str: any ;

  combodate: any;

  has_initValueChange = false;

  constructor(private qcs: DFControlService,
              private toolHttp: ToolHttpService) {
    // console.log('DFItemComponent constructor ...');
  }



  get isValid() { return this.form.controls[this.item.key].valid; }

  public ngOnChanges(changes: SimpleChanges): void {
    //级联
    if (this.item && this.item.fi_type === 11) {
      this.qcs.cascading = this;
    }
    //图片上传
    if (this.item && this.item.fi_type === 12) {
      this.img_id = this.item.d_value ;
    }
    //时间控件
    if (this.item && this.item.fi_type === 13) {
      this.date_str = this.item.d_value || '';
      const minView: any = this.item.minView || 0; //0为年月日时分秒   2 为年月日
      const format: any = minView === 0 ?  'yyyy-mm-dd hh:mm:ss ' : 'yyyy-mm-dd';
      setTimeout(() => {
        (<any>$)('#'   + this.item.key).datetimepicker({
          language: 'zh-CN',
          format: format,
          minView: minView,
          autoclose: true
        }).on('changeDate', function(ev: any) {
          this.date_str = ev.currentTarget.value;
        });
        // (<any>$)('.form_ymd').datetimepicker({
        //   language: 'zh-CN',
        //   format: 'yyyy-mm-dd',
        //   autoclose: true
        // });
      }, 200);
    }
    //省市区
    if (this.item  && this.item.fi_type === 15) {
      this.toolHttp.dyform[this.item.key] = this;
    }

    //时分秒
    if (this.item  && this.item.fi_type === 18) {
      this.toolHttp.dyform[this.item.key] = this;
      setTimeout(() => {
        const id: any = this.item.key;
        (<any>$('#' + id)).each(function() {
          (<any>$(this)).combodate();
          this.combodate =  (<any>$(this)).data('combodate');
          (<any>$(this)).next('.combodate').find('select').addClass('form-control');
        });
      }, 200);
    }

    // //标签
    // if (this.item&&this.item.fi_type===18) {
    //   setTimeout(function () {
    //     var $dom:any = (<any>$)(".select2-tags-df");
    //     $dom.select2({tags: ["微辣"],tokenSeparators: [",", " "]});
    //   },200);
    //
    // }

    if (this.item && !this.has_initValueChange && this.item.fi_type > 10) {
      this.has_initValueChange = true;
      this.valueChanges();
    }
  }

  public valueChanges() {
    //监听值改变
    const formItem: any = this.form.get(this.item.key);
    if (formItem) {
      formItem.valueChanges.subscribe((v: any) => {
        if (this.item.fi_type === 12) {
          this.img_id = <any>v;
        }
        if (this.item.fi_type === 18) {
          if (v && v !== '') {
            setTimeout(() => {
              this.combodate.setValue(v);
            }, 250);
          }
        }
      });
    }

  }


  public getCascadingValue() {
    return this.cascading.getValue();
  }

  public setTypeId(id: any) {
    this.cascading.setTypeId(id);
  }

  //图片上传获取id
  setIConImg(id: any) {
    this.img_id = id;
  }

  public selectchange() {
    this.selectchangeout.emit(this.item);
  }

  public btnclick() {
    this.btnclickout.emit(this.item);
  }

  getValue() {
    let res: any;
    //省市区
    if (this.item.fi_type === 15) {
      res = this.proCityCounty.getAddress();
    }
    //时分秒
    if (this.item.fi_type === 18) {
      const hms: any = this.combodate.getValue();
      if (hms && '' !== hms) {
        const timearr: any = hms.split(':');
        // tslint:disable-next-line:radix
        const hour: any = parseInt(timearr[0]);
        // tslint:disable-next-line:radix
        const min: any = parseInt(timearr[1]);
        res = (hour * 1000 * 60 * 60) + (min * 1000 * 60);
      }
    }
    return res;
  }

  setValue(value: any) {
    //省市区
    if (this.item.fi_type === 15) {
      this.proCityCounty.setAddress(value);
    }
  }

}
