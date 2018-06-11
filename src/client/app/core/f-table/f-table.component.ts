import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DfFromComponent } from '../df/df.component';

@Component({
    moduleId: module.id,
    selector: 'f-table-cmp',
    templateUrl: 'f-table.component.html',
    viewProviders: []
})

export class FormTableComponent {

    // 表单数据
    @Input()
    public formData: any;

    @Input()
    public cmpSelect: any = 1;

    //表格操作功能
    @Input()
    public opt_config: any;

  //是否显示面包学
    @Input()
    public breadcrumb = true;

    @Input()
    public content_right = true; //样式控制

    @Output()
    public formSubmited: EventEmitter<any> = new EventEmitter();

    @Output()
    public btnclickout: EventEmitter<any> = new EventEmitter();

    @Output()
    public loadDataOut: EventEmitter<any> = new EventEmitter();

    @Output()
    public updateOut: EventEmitter<any> = new EventEmitter();

    @Output()
    public delOut: EventEmitter<any> = new EventEmitter();

    @Output()
    public enableOut: EventEmitter<any> = new EventEmitter();

    @Output()
    public stopOut: EventEmitter<any> = new EventEmitter();

    @Output()
    public checkAllOut: EventEmitter<any> = new EventEmitter();

    @Output()
    public viewOut: EventEmitter<any> = new EventEmitter();

    @Output()
    public unbindOut: EventEmitter<any> = new EventEmitter();

    @Output()
    public bindOut: EventEmitter<any> = new EventEmitter();
    @Output()
    public planOut: EventEmitter<any> = new EventEmitter();

    @ViewChild(DfFromComponent)
    public dfForm: DfFromComponent;

    // ngOnInit() {
    //     console.log('FormTableComponent init : ', this.formData);
    // }

    formSubmit(formValue: any) {
        // console.log('FormTableComponent  formSubmit : ' + formValue);
        this.formSubmited.emit(formValue);
    }

    loadData(pager: any) {
        this.loadDataOut.emit(pager);
    }

    update(id: any) {
        // console.log('FormTableComponent  update id : ' + id);
        this.updateOut.emit(id);
    }

    view(id: any) {
      // console.log('FormTableComponent  update id : ' + id);
      this.viewOut.emit(id);
    }

    getAllCheckedV(ids: any) {
        this.checkAllOut.emit(ids);
    }

    del(id: any) {
        this.delOut.emit(id);
    }

    unbind(id: any) {
        this.unbindOut.emit(id);
    }

    bind(id: any) {
      this.bindOut.emit(id);
    }

    enable(id: any) {
        this.enableOut.emit(id);
    }

    stop(id: any) {
      this.stopOut.emit(id);
    }
    plan(id: any) {
        this.planOut.emit(id);
    }

    getFromValue() {
      return this.dfForm.getFormValue();
    }

    btnclick(item: any) {
      setTimeout(() => {
        this.btnclickout.emit(item);
      }, 150);
    }

}
