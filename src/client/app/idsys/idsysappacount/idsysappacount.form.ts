import { IdSysAppAcountService } from './idsysappacount.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBaseComponent } from '../../shared/idorp/component/FormBaseComponent';



declare let $: any;

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sys-account-form',
  // templateUrl: 'idsysappacount.form.html',
  template: `<f-form-cmp *ngIf="formData" [formData]="formData" (formSubmited)="formSubmit($event)"></f-form-cmp>`,
  viewProviders: []
})

export class IdSysAccountFormComponent extends FormBaseComponent {
  public constructor(
    public idAccountUser: IdSysAppAcountService,
    private route: ActivatedRoute,
    protected eleRef: ElementRef,
    public _router: Router) {
    super(idAccountUser, eleRef);
  }
  myInit(): void {
    this.route.params.subscribe(params => {
      this.formData = this.idAccountUser.initFormData();
      if (params['uuid']) {
        this.uuid = params['uuid'];
        this.isAdd = false;
        //如果是修改  更新某些属性不可写
        this.addDisabledList(['username']);
        this.loadDetail();
        this.log(' update form component  uuid :' + this.uuid);
      } else {
        this.log(' add form component ');
      }
    });
  }

  /**
     * 请求接口获取数据成功后处理的方法  只需要对jsonFormData的数据 进行处理 这个方法还没有对表单进行set 值
     * @param formEntry
     */
  afterLoad(jsonFormData: any) {
    //清空密码
    jsonFormData.password = '';
    return jsonFormData;
  }

}
