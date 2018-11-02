import { Component, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
import { DfFromComponent } from '../df/df.component';

@Component({
    moduleId: module.id,
    selector: 'f-table-cmp',
    templateUrl: 'f-table.component.html',
    viewProviders: []
})

export class FormTableComponent implements OnInit {

    // 表单数据
    @Input()
    public formData: any = {};

    @Input()
    public cmpSelect: any = 1;

    //表格操作功能
    @Input()
    public opt_config: any;

    @Input()
    public config: any;

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
    @Output()
    public outGoodOut: EventEmitter<any> = new EventEmitter();
    @Output()
    public subAuditOut: EventEmitter<any> = new EventEmitter();
    @Output()
    public inGoodOut:  EventEmitter<any> = new EventEmitter();
    @Output()
    public deliveryOut: EventEmitter<any> = new EventEmitter();
    @Output()
    public cancelOut: EventEmitter<any> = new EventEmitter();
    @Output()
    public refundOut: EventEmitter<any> = new EventEmitter();
    @Output()
    public changeLevelOut: EventEmitter<any> = new EventEmitter();
    @Output()
    public changeNumOut: EventEmitter<any> = new EventEmitter();
    @Output()
    public bindZfbOut: EventEmitter<any> = new EventEmitter();
    @Output()
    public bindWXOut: EventEmitter<any> = new EventEmitter();
    @Output()
    public paimaiOut: EventEmitter<any> = new EventEmitter();


    @ViewChild(DfFromComponent)
    public dfForm: DfFromComponent;

    ngOnInit() {
        // console.log('FormTableComponent init : ', this.formData);
    }

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

    outGood(id: any) {
        this.outGoodOut.emit(id);
    }

    subAudit(id: any) {
        this.subAuditOut.emit(id);
    }

    inGood(id: any) {
        this.inGoodOut.emit(id);
    }

    delivery(id: any) {
        this.deliveryOut.emit(id);
    }

    cancel(id: any) {
        this.cancelOut.emit(id);
    }

    refund(id: any) {
        this.refundOut.emit(id);
    }

    changeLevel(id: any) {
        this.changeLevelOut.emit(id);
    }

    changeNum(id: any) {
        this.changeNumOut.emit(id);
    }
    bindZfb(id: any) {
        this.bindZfbOut.emit(id);
    }
    bindWX(id: any) {
        this.bindWXOut.emit(id);
    }
    paimai(id: any) {
        this.paimaiOut.emit(id);
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
