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
  selector: 'sys-ptcenteraccount-form',
  // templateUrl: 'idsysappacount.form.html',
  template: `<f-form-cmp *ngIf="formData" [formData]="formData" (formSubmited)="formSubmit($event)"></f-form-cmp>`,
  viewProviders: []
})

export class IdSysPerCenterAccountFormComponent extends IdorpFormComponent implements OnInit {


  appAccountUuid: any;

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
    if (this.appAccountUuid) {
      this.protoEntry.query.uuid = this.appAccountUuid;
    }
  }
  /**
  * 给子类实现
  * @param protoEntry
  */
  afterSave() {
      this.log('IdSysAccountFormComponent . afterSave  实现类');
      const link = ['home/idsysappacount/percenter/detail'];
      this._router.navigate(link);
  }
  afterLoad(jsonFormData: any) {
    this.log('IdSysAccountFormComponent . afterLoad  实现类');
    //清空密码
    jsonFormData.password = '';
    this.appAccountUuid = this.protoEntry.proto.dtc.pt_id.open_id;
  }

  ngOnInit() {
    $('sys-ptcenteraccount-form').addClass('vbox');
    this.isAdd = false;
    this.route.params.subscribe(params => {
      const fd = this.idAccountUser.initFormData();
      this.setDisAbled(fd);
      let filterData = {};
      if (!this.isBusiness()) {
        filterData = {is_sys: '2'};
      }
      this.formData = fd;
      this.getUserInfoByLoginer();
      this.log(' detail form component ');
    });
  }



  /**
     * 获取用户信息
     */
    getUserInfoByLoginer() {
      //加载用户类型列表详情
      this.idAccountUser.getProtoEntry().subscribe(
         (protoMessage: any) => {
           const optProto = protoMessage.create(this.entryInit);
           this.log(' user getUserByUuid  : ' + JSON.stringify(optProto));
           this.idAccountUser.personInfo(optProto, protoMessage).subscribe(
               (protoMsg: any) => {
                if (protoMsg && protoMsg.proto) {

                  this.log('!!!!!!!!!protoMsg:' + protoMsg);
                  this.protoEntry = protoMsg;
                 //表单数据变化  刷新表单
                 this.proto = this.protoEntry.proto;
                 this.resetFormData();
                }
                this.log('loadFormData query result : ' + JSON.stringify(this.protoEntry));
               },
           );
         }
       );
    }


     setDisAbled(fd: any) {
      const keyArr: any[] = [];
      keyArr.push('username');
      keyArr.push('nickname');
      keyArr.push('user_type');
      keyArr.push('sys_user_uuid');

      this.addDisabledList(fd, keyArr);
     }

}
