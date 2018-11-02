import { Component, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
import { DfFromComponent } from '../df/df.component';
declare const $: any;
@Component({
    moduleId: module.id,
    selector: 'f-form-cmp',
    templateUrl: 'f-form.component.html',
    viewProviders: []
})

export class FormFormComponent implements OnInit {
    // 表单数据
    fd: any;
    @Input()
    set formData(fd: any) {
        if(fd && fd.complete) {
            this.fd = fd;
        }
    }

    @Output()
    public formSubmited: EventEmitter<any> = new EventEmitter();

    @Output()
    public selectchangeout: EventEmitter<any> = new EventEmitter();

    @Output()
    public btnclickout: EventEmitter<any> = new EventEmitter();

    @Output()
    public customSubmitOut: EventEmitter<any> = new EventEmitter();

    @ViewChild('dy_form')
    dy_form: DfFromComponent;

    ngOnInit(): void {
        $('f-form-cmp').addClass('vbox');
    }
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

    btnclick(item: any) {
        this.btnclickout.emit(item);
    }
    customSubmit(item: any) {
        this.customSubmitOut.emit(item);
      }

}
