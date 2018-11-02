import { IdSysAppAcountService } from './idsysappacount.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IdorpFormComponent } from '../../shared/idorp/component/IdorpFormComponent';
import { FormGroup, FormControl, Validators } from '@angular/forms';



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

export class IdSysAccountFormComponent extends IdorpFormComponent implements OnInit {
  public constructor(
    public idAccountUser: IdSysAppAcountService,
    private route: ActivatedRoute,
    public _router: Router) {
      super(idAccountUser);
  }

  beforeSave() {
    this.log('IdSysAccountFormComponent . beforeSave  实现类');
    if (this.protoEntry.proto.user_type) {
      this.protoEntry.proto.user_type = parseInt(this.protoEntry.proto.user_type, 10);
    }
  }
  /**
  * 给子类实现
  * @param protoEntry
  */
  afterSave() {
      this.log('IdSysAccountFormComponent . afterSave  实现类');
      const link = ['home/idsysappacount'];
      this._router.navigate(link);
  }
  afterLoad(jsonFormData: any) {
    this.log('IdSysAccountFormComponent . afterLoad  实现类');
    //清空密码
    jsonFormData.password = '';
  }

  ngOnInit() {
    $('sys-account-form').addClass('vbox');
    this.route.params.subscribe(params => {
      const fd = this.idAccountUser.initFormData();
      let filterData = {};
      if (!this.isBusiness()) {
        filterData = {is_sys: '2'};
      }
      if (params['uuid']) {
        this.uuid = params['uuid'];
        this.isAdd = false;
        //如果是修改  更新某些属性不可写
        this.addDisabled(fd, 'username');
        this.loadFormData();
        this.formData = fd;
        this.log(' update form component  uuid :' + this.uuid);
      } else {
        this.formData = fd;
        this.log(' add form component ');
      }
      // this.idsysusertypeService.initOptList((optList: any) => {
      //   this.bindFormDateOptList(optList, 'sys_user_uuid');
      // }, filterData);
    });
  }

}
