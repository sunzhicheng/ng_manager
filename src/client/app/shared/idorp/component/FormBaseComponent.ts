import * as _ from 'lodash';
import { DyBaseService } from '../service/IdBaseService';
import { BaseComponent } from './BaseComponent';
import { ViewChild, OnInit } from '@angular/core';
import { FormFormComponent } from '../../../core/f-table/f-form.component';
import { IUtils } from '../providers/IUtils';
import { FormUtils } from '../providers/FormUtils';
declare const $: any;
/**
 *  表单组件基类
 */
export abstract class FormBaseComponent extends BaseComponent implements OnInit {
    //重新命名该属性的时候   必须保证相应的子service 有相应的方法
    //默认加载方法名
    method_form_detail: any = 'detail';
    //默认保存方法名
    method_form_save: any = 'save';
    /**
     * 修改的唯一主键
     */
    protected uuid: any;
    /**
     * 标识该主键是修改还是新增
     */
    protected isAdd = true;
    /**
     * 动态表单数据
     */
    formData: any;
    /**
     * 请求接口的协议对象
     */
    formEntry: any;

    @ViewChild(FormFormComponent)
    private fform: FormFormComponent;

    private proto: any;
    constructor(public service: DyBaseService | any,
    ) {
        super();
    }
    ngOnInit() {
        this.initForm();
    }
    abstract initFD(): void;
    /**
     * 保存操作调用接口之前的处理方法
     * @param data 表单填写的JSON数据
     */
    beforeSave(data: any) {
        return data;
    }
    /**
     * 保存操作完成之后的处理方法，用于处理保存之后 通过接口返回状态的一些操作
     * @param formEntry 接口返回的协议对象
     */
    afterSave(formEntry: any) {
        return formEntry;
    }
    /**
     * 自定义表单验证，用于校验规则无法满足的，或者比较复杂的验证,
     * 当某个item是diabled状态 或者hidden状态 是不会返回值过来的
     * @param data
     */
    formCheck(data: any): boolean {
        return true;
    }

    /**
     * 自定义button  提交
     * @param data 表单填写的JSON数据  返回值是 { item: item, v: formJson }这样的新式
     */
    customSubmit(data: any) {
        this.log('自定义表单提交方式，表单参数 :' + JSON.stringify(data));
        return data.v;
    }

    /**
    * 提交表单
    * @param data 表单填写的JSON数据
    * @param isCustomer 是否自定义按钮提交  默认false
    */
    formSubmit(data: any, isCustomer: any = false) {
        //自定义提交方式需要根据对应的item  去做不同的处理 这里留给子类实现
        if (isCustomer) {
            data = this.customSubmit(data);
            if (!data) {
                console.log('customSubmit:处理之后返回的表单JSON对象为空.如果formSubmit已经被覆盖可忽略该警告');
                return;
            }
        }
        this.log('默认表单提交方式，表单参数 :' + JSON.stringify(data));
        if (!this.formCheck(data)) {
            this.log('formCheck: 自定义表单验证失败。');
            return;
        }
        const afterData: any = this.beforeSave(data);
        if (!afterData) {
            console.error('beforeSave:处理之后返回的表单JSON对象为空');
            return;
        } else {
            this.formEntry.proto = afterData;
        }
        this.save();
    }
    save() {
        if (!this.hasMethod(this.service, this.method_form_save)) {
            return;
        }
        if (!this.service.checkApi(this.isAdd ? 'add' : 'update')) {
            return;
        }
        this.service.getProtoEntry().subscribe(
            (protoMessage: any) => {
                if (!this.isAdd) {
                    this.formEntry.query = { uuid: this.uuid };
                }
                // this.log('IdorpFormComponent save   formEntry : ' + JSON.stringify(this.formEntry));
                this.service[this.method_form_save](this.formEntry, protoMessage, this.isAdd).subscribe(
                    (protoMsg: any) => {
                        if (this.service.isNotEx(protoMsg.token)) {
                            this.formEntry = protoMsg;
                            this.service.isReLoad = true;
                            const afterEntry = this.afterSave(this.formEntry);
                            if (!afterEntry) {
                                console.warn('save错误: afterSave返回的协议对象为空,将采用原来的接口返回对象');
                            } else {
                                this.formEntry = afterEntry;
                            }
                            this.log('save request api result : ' + JSON.stringify(this.formEntry));
                        }
                    },
                );
            }
        );
    }
    /**
     * 修改的时候  进入页面更加uuid  加载数据
     */
    loadDetail(loadProto: any = null) {
        if (this.isAdd) {
            console.error('表单数据加载失败.请确认是否设置isAdd=false');
            return;
        }
        if (!this.hasMethod(this.service, this.method_form_detail)) {
            return;
        }
        if (loadProto === null) {
            const loadProto = { query: { uuid: this.uuid } };
            this.log('loadDetail brefore : ', loadProto);
            this.service[this.method_form_detail](loadProto).subscribe(
                (protoMsg: any) => {
                    if (protoMsg && protoMsg.proto) {
                        this.formEntry = protoMsg;
                        //表单数据变化  刷新表单
                        this.proto = this.formEntry.proto;
                        this.resetFormData();
                    }
                    this.log('loadDetail result : ', this.formEntry);
                },
            );
        } else {
            this.log('调用loadFormData  穿进来的参数 loadProto : ' + JSON.stringify(loadProto));
            this.service[this.method_form_detail](loadProto).subscribe(
                (protoMsg: any) => {
                    if (protoMsg && protoMsg.proto) {
                        this.formEntry = protoMsg;
                        //表单数据变化  刷新表单
                        this.proto = this.formEntry.proto;
                        this.resetFormData();
                    }
                    this.log('loadDetail result : ' + JSON.stringify(this.formEntry));
                },
            );
        }
    }
    /**
     * 请求接口获取数据成功后处理的方法  只需要对jsonFormData的数据 进行处理 这个方法还没有对表单进行set 值
     * @param formEntry
     */
    afterLoad(jsonFormData: any) {
        return jsonFormData;
    }
    /**
     * form 数据初始化完成的空方法(页面的数据已经set值)  用来处理加载完成之后的表单显示和disabled逻辑
     * @param formValue 表单提交返回的JSON数据
     */
    afterSetForm(formValue: any) {
        this.log('');
    }
    /**
     * 表单数据变化  刷新表单
     */
    resetFormData() {
        if (this.proto) {
            const form = this.fform.getDyFormComp();
            let jsonFormData = IUtils.json2FromData(this.proto);
            jsonFormData = this.afterLoad(jsonFormData);
            if (!jsonFormData) {
                console.warn('afterLoad: 返回的数据映射对象为空,请添加返回值');
                return;
            }
            form.reset(jsonFormData);
            this.afterSetForm(form.getFormValue());
        }
    }

    /*****************************************赋值给[formData]="formData"之前调用的方法 start*************************************/


    /*****************************************赋值给[formData]="formData"之前调用的方法 end*************************************/


    /** ****************************************需要手动刷新的方法 start************************************/
    /**
   * 绑定下拉列表,必须调用刷新方法注：
   * 1.下拉列表的label必须与传过来的key相同
   * 2.用户类型必须放在row_list[0]中
   * @param optList
   * @param key
   */
    bindFormDateOptList(optList: any, key: any) {
        if (this.fform) {
            FormUtils.bindFormDateOptList(this.fform.getDyFormComp(), this.formData, optList, key);
        }
    }
    setItemValueByJson(json: any) {
        if (this.fform) {
            FormUtils.setItemValueByJson(this.fform.getDyFormComp(), this.formData, json);
        }
    }
    /**
     * 向表单对象动态添加tiem
     * @param items  item的数组对象
     * @param afterKey 在哪个item key后面开始添加
     * @param isRefresh 是否自动刷新表单  默认不刷新
     */
    addItemList(items: any, afterKey: String) {
        FormUtils.addItemList(this.formData, items, afterKey);
    }
    /**
     * 向表单对象动态删除tiem
     * @param keyArr 需要删除的item key  集合
     * @param isRefresh 是否自动刷新表单 默认不刷新
     */
    delItemList(keyArr: any) {
        FormUtils.delItemList(this.formData, keyArr);
    }
    updateRules(keyArr: any, rule: any, isAdd: boolean = true) {
        FormUtils.updateRules(this.formData, keyArr, rule, isAdd);
    }
    clearRules(keyArr: any) {
        FormUtils.clearRules(this.formData, keyArr);
    }
    /**
    * 修改的时候  向动态表单中添加disabled属性
    * @param formData
    * @param key
    */
    addDisabledList(keyArr: any, opt: boolean = true, dealOther: boolean = false) {
        FormUtils.addDisabledList(this.formData, keyArr, opt, dealOther);
    }
    /**
     * 动态设置校验规则
     * @param formData
     * @param key
     * @param isAdd
     */
    addRequiredRules(formData: any, key: any, isAdd: boolean = true) {
        if (formData) {
            FormUtils.updateRules(formData, [key], {
                name: 'required',
                errorMsg: '必填'
            }, isAdd);
        }
    }

    addHiddenList(keyArr: any, opt: boolean = true) {
        FormUtils.addHiddenList(this.formData, keyArr, opt);
    }

    /** ****************************************需要手动刷新的方法 end************************************/


    /** ****************************************不需要手动刷新的方法 startr************************************/
    /**
     * 设置某个属性为空
     * @param key
     */
    setNullByKey(key: any) {
        if (this.fform) {
            FormUtils.setNullByKey(this.fform.getDyFormComp(), key);
        }
    }
    addHiddenButtonList(keyArr: any, opt: boolean = true, dealOther: boolean = false) {
        FormUtils.addHiddenButtonList(this.formData, keyArr, opt, dealOther);
    }
    addDisabledButtonList(keyArr: any, opt: boolean = true, dealOther: boolean = false) {
        FormUtils.addDisabledButtonList(this.formData, keyArr, opt, dealOther);
    }
    getButtonKeyDisabledStatus(key: any) {
        return FormUtils.getButtonKeyStatus(this.formData, key);
    }
    getButtonKeyHiddenStatus(key: any) {
        return FormUtils.getButtonKeyStatus(this.formData, key, 'hidden');
    }
    addButtonList(items: any, afterKey: String) {
        FormUtils.addButtonList(this.formData, items, afterKey);
    }
    /******************************************不需要手动刷新的方法 end************************************/


    /**
     * item 变动  手动刷新表单
     */
    refreshItem() {
        FormUtils.refreshForm(this.fform, this.formData);
    }
    refreshRule() {
        if (this.fform && this.fform.dy_form) {
            FormUtils.refreshRule(this.fform.dy_form, this.formData);
        }
    }

    updateFilterJson(formData: any, key: any, filterJson: any) {
        if (formData) {
            FormUtils.updateFilterJson(formData, key, filterJson);
        }
    }

    /**
     * formData 初始化完成操作
     */
    private initComplete() {
        if (!this.formData) {
            console.error('initComplete错误: formData属性为null');
            return;
        }
        this.formData.complete = true;
    }
    private initForm() {
        //给子类加载 formData属性
        this.initFD();
        //通知组件formData已经初始化完成
        this.initComplete();
    }
}

