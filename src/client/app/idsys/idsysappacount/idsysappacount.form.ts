import { IdSysAppAcountService } from './idsysappacount.service';
import { Component, OnInit } from '@angular/core';
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
    public _router: Router) {
      super(idAccountUser);
  }

  beforeSave(data: any) {
    if (data.user_type) {
      data.user_type = parseInt(data.user_type, 10);
    }
    return data;
  }
  /**
  * 给子类实现
  * @param protoEntry
  */
  afterSave(formEntry: any) {
      const link = ['home/idsysappacount'];
      this._router.navigate(link);
  }
  afterLoad(jsonFormData: any) {
    //清空密码
    jsonFormData.password = '';
    return jsonFormData;
  }

  start(): void {
    $('sys-account-form').addClass('vbox');
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

}
