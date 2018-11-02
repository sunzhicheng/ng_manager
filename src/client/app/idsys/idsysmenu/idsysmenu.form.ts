import { IdSysMenuService } from './idsysmenu.service';
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
  selector: 'sys-menu-form',
  // templateUrl: 'idsysmenu.form.html',
  template: `<f-form-cmp [formData]="formData" (formSubmited)="formSubmit($event)"></f-form-cmp>`,
})

export class IdSysMenuFormComponent extends IdorpFormComponent implements OnInit {
  public constructor(
    public idMenuService: IdSysMenuService,
    private route: ActivatedRoute,
    public _router: Router) {
      super(idMenuService);
  }
  beforeSave() {
    this.log('IdSysAccountFormComponent . beforeSave  实现类');
  }
  /**
  * 给子类实现
  * @param protoEntry
  */
  afterSave() {
      this.log('IdSysAccountFormComponent . afterSave  实现类');
      const link = ['home/idsysappMenu'];
      this._router.navigate(link);
  }
  afterLoad(jsonFormData: any) {
    this.log('IdSysAccountFormComponent . afterLoad  实现类');
  }

  ngOnInit() {
    $('sys-menu-form').addClass('vbox');
    this.formData = this.idMenuService.initFormData();
    this.route.params.subscribe(params => {
      if (params['uuid']) {
        this.uuid = params['uuid'];
        this.isAdd = false;
        this.loadFormData();
      } else {
        this.log('deviceUpadteComponent  ngOnInit id not exits!!! ');
      }
    });
  }

}
