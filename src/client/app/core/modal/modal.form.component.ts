import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IUtils } from '../../shared/idorp/providers/IUtils';
import { ModalBaseComponent } from './ModalBaseComponent';
import { DfFromComponent } from '../df/df.component';
import { FormUtils } from '../../shared/idorp/providers/FormUtils';
declare const $: any;

@Component({
    moduleId: module.id,
    selector: 'from-modal',
    templateUrl: 'modal.from.component.html',
})

/**
 * 系统模块 绑定菜单 组件
 */
export class ModalFormComponent extends ModalBaseComponent implements OnInit {
    @Output()
    public selectchangeout: EventEmitter<any> = new EventEmitter();
    formData: any;
    title: any = '弹框'; //应该同一个页面可能会初始化不同的弹框表单 通过set 方法设置
    @ViewChild('dy_form')
    private dy_form: DfFromComponent;
    constructor(
        protected _router: Router,
        private route: ActivatedRoute,
    ) {
        super();
    }
    ngOnInit() {
        $('#dy_form').addClass('vbox');
        this.log('ModalFormComponent .. ngOnInit');
    }
    setFromData(fd: any) {
        this.formData = fd;
        this.dy_form.setFormData(this.formData);
    }
    setTitle(t: any) {
        this.title = t;
    }
    run() {
        if (!this.formData) {
            console.error('from modal 没有配置 formData,可以通过setFromData 方法设置');
        } else {
            //每次打开清除数据
            this.dy_form.reset({});
            this.show();
        }
    }
    stop() {
        this.formData = undefined;
        this.hide();
    }
    formSubmit(data: any) {
        this.stop();
        this.valueOut.emit(data);
    }
    selectchange(data: any) {
        this.selectchangeout.emit(data);
    }
    /**表单操作 方法 start..... */
    setValue(json: any) {
        const jsonFormData = IUtils.json2FromData(json);
        FormUtils.setItemValueByJson(this.dy_form, this.formData, jsonFormData);
    }
    bindFormDateOptList(optList: any, key: any) {
        if (this.dy_form && this.formData) {
            FormUtils.bindFormDateOptList(this.dy_form, this.formData, optList, key);
        }
    }
    /**
     * 给formData 设置值
     * @param key
     */
    setItemValue(key: any, value: any) {
        const json: any = {};
        json[key] = value;
        FormUtils.setItemValueByJson(this.dy_form, this.formData, json);
    }
    setItemValueByJson(json: any) {
        FormUtils.setItemValueByJson(this.dy_form, this.formData, json);
    }
    /**
     * 设置某个属性为空
     * @param key
     */
    setNullByKey(key: any) {
        FormUtils.setNullByKey(this.dy_form, key);
    }
    /**
  * 初始化完成之后  向动态表单中添加disabled属性
  * @param formData
  * @param key
  */
    addDisabledAfterInit(key: any) {
        FormUtils.addDisabledList(this.formData, [key]);
        FormUtils.refreshItem(this.dy_form, this.formData);
    }

    addHiddenAfterInit(key: any) {
        FormUtils.addHiddenList(this.formData, [key]);
        FormUtils.refreshItem(this.dy_form, this.formData);
    }


    addDisabledListAfterInit(keyArr: any, opt: boolean = true, dealOther: boolean = false) {
        FormUtils.addDisabledList(this.formData, keyArr, opt, dealOther);
        FormUtils.refreshItem(this.dy_form, this.formData);
    }

    addHiddenListAfterInit(keyArr: any) {
        FormUtils.addHiddenList(this.formData, keyArr);
        FormUtils.refreshItem(this.dy_form, this.formData);
    }

    /**
     * 向表单对象动态添加tiem
     * @param items  item的数组对象
     * @param afterKey 在哪个item key后面开始添加
     * @param isRefresh 是否自动刷新表单  默认不刷新
     */
    addItemListAfterInit(items: any, afterKey: String, isRefresh = false) {
        FormUtils.addItemList(this.formData, items, afterKey);
        if (isRefresh) {
            FormUtils.refreshItem(this.dy_form, this.formData);
        }
    }
    /**
     * 向表单对象动态删除tiem
     * @param keyArr 需要删除的item key  集合
     * @param isRefresh 是否自动刷新表单 默认不刷新
     */
    delItemListAfterInit(keyArr: any, isRefresh = false) {
        FormUtils.delItemList(this.formData, keyArr);
        if (isRefresh) {
            FormUtils.refreshItem(this.dy_form, this.formData);
        }
    }
    /**
     * item 变动  手动刷新表单
     */
    refreshItem() {
        FormUtils.refreshItem(this.dy_form, this.formData);
    }
    /**
* 修改的时候  向动态表单中添加disabled属性
* @param formData
* @param key
*/
    addDisabled(key: any, opt: boolean = true) {
        FormUtils.addDisabledList(this.formData, [key], opt);
    }
    addDisabledList(keyArr: any, opt: boolean = true, dealOther: boolean = false) {
        if (this.formData) {
            FormUtils.addDisabledList(this.formData, keyArr, opt);
        }
    }
    /**
     * 修改的时候  向动态表单中添加disabled属性
     * @param formData
     * @param key
     */
    addHidden(key: any, opt: boolean = true) {
        if (this.formData) {
            FormUtils.addHiddenList(this.formData, [key], opt);
        }
    }

    addHiddenList(keyArr: any, opt: boolean = true) {
        if (this.formData) {
            FormUtils.addHiddenList(this.formData, keyArr, opt);
        }
    }

    updateFilterJson(key: any, filterJson: any) {
        if (this.formData) {
            FormUtils.updateFilterJson(this.formData, key, filterJson);
        }
    }
    addHiddenButtonList(keyArr: any, opt: boolean = true, dealOther: boolean = false) {
        FormUtils.addHiddenButtonList(this.formData, keyArr, opt, dealOther);
    }
    addDisabledButtonList(keyArr: any, opt: boolean = true, dealOther: boolean = false) {
        FormUtils.addDisabledButtonList(this.formData, keyArr, opt, dealOther);
    }
    /**表单操作 方法 end..... */
    private show(): void {
        (<any>$('#' + this.name_key)).modal('show');
    }
    private hide(): void {
        (<any>$('#' + this.name_key)).modal('hide');
    }

}

