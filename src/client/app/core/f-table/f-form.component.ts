import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DfFromComponent } from '../df/df.component';

@Component({
    moduleId: module.id,
    selector: 'f-form-cmp',
    templateUrl: 'f-form.component.html',
    viewProviders: []
})

export class FormFormComponent {

    // 表单数据
    @Input()
    public formData: any;

    @Output()
    public formSubmited: EventEmitter<any> = new EventEmitter();

    @Output()
    public selectchangeout: EventEmitter<any> = new EventEmitter();

    @ViewChild('dy_form')
    dy_form: DfFromComponent;

    // ngOnInit() {
    //     console.log('FormFormComponent init : ', this.formData);
    // }

    formSubmit(formValue: any) {
        // console.log('FormFormComponent  formSubmit : ' + formValue);
        this.formSubmited.emit(formValue);
    }

    getDyFormComp(): DfFromComponent {
        return this.dy_form;
    }

    selectchange(item: any) {
      this.selectchangeout.emit(item);
    }

}
