import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DFControlService } from './df-control.service';

@Component({
  moduleId: module.id,
  selector: 'df-form',
  templateUrl: 'df.component.html',
  providers: []
})
export class DfFromComponent implements OnInit {
  @Input() formData: any;
  @Output()
  public formSubmit: EventEmitter<any> = new EventEmitter();
  @Output()
  public selectchangeout: EventEmitter<any> = new EventEmitter();
  @Output()
  public btnclickout: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  payLoad = '';
  constructor(private qcs: DFControlService) {
    // console.log('DfComponent constructor ...');
  }
  ngOnInit() {
    // console.log('DfComponent ngOnInit ...');
    this.form = this.qcs.toIFormGroup(this.formData);
  }

  resetFromGroup () {
    this.qcs.refreshIFormGroup(this.formData, this.form);
    //  this.form.markAsDirty();
  }

  resetFromGroupValid () {
    this.qcs.refreshIFormGroupValid(this.formData, this.form);
    //  this.form.markAsDirty();
  }

  onSubmit() {
    const jsonString = JSON.stringify(this.form.value);
    const formJson = JSON.parse(jsonString);
    for (const key in formJson) {
      if (key.indexOf('.') !== -1) {
        const arr = key.split('.');
        if (arr.length === 2) {
          if (!formJson[arr[0] + '']) {
            formJson[arr[0] + ''] = {};
          }
          formJson[arr[0] + ''][arr[1] + ''] = formJson[key];
        } else if (arr.length === 3) {
          if (!formJson[arr[0] + '']) {
            formJson[arr[0] + ''] = {};
          }
          if (!formJson[arr[0] + ''][arr[1] + '']) {
            formJson[arr[0] + ''][arr[1] + ''] = {};
          }
          formJson[arr[0] + ''][arr[1] + ''][arr[2] + ''] = formJson[key];
        } else if (arr.length === 4) {
          if (!formJson[arr[0] + '']) {
            formJson[arr[0] + ''] = {};
          }
          if (!formJson[arr[0] + ''][arr[1] + '']) {
            formJson[arr[0] + ''][arr[1] + ''] = {};
          }
          if (!formJson[arr[0] + ''][arr[1] + ''][arr[2] + '']) {
            formJson[arr[0] + ''][arr[1] + ''][arr[2] + ''] = {};
          }
          formJson[arr[0] + ''][arr[1] + ''][arr[2] + ''][arr[3] + ''] = formJson[key];
        }
        delete formJson[key];
      }
    }

    this.formSubmit.emit(formJson);
    // this.payLoad = JSON.stringify(this.form.value);
  }

  getFormValue() {
    if (!this.form) {
      return null;
    }
    const jsonString = JSON.stringify(this.form.value);
    const formJson = JSON.parse(jsonString);
    return formJson;
  }

  getCascading() {
    return this.qcs.cascading.getCascadingValue();
  }

  setTypeId(id: any) {
    this.qcs.cascading.setTypeId(id);
  }

  selectchange(item: any) {
    this.selectchangeout.emit(item);
  }

  btnclick(item: any) {
    this.btnclickout.emit(item);
  }
}
