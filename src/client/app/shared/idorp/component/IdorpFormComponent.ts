import * as _ from 'lodash';
import { DyBaseService } from '../service/IdBaseService';
import { IdorpBaseComponent } from './IdorpBaseComponent';
import { ViewChild } from '@angular/core';
import { FormFormComponent } from '../../../core/f-table/f-form.component';
import { IUtils } from '../providers/IUtils';
import { FormUtils } from '../providers/FormUtils';
declare const $: any;
/**
 *  表单组件基类
 */
export class IdorpFormComponent extends IdorpBaseComponent {
    //重新命名该属性的时候   必须保证相应的子service 有相应的方法
    //默认加载方法名
    loadMethod: any = 'loadByUUID';
    //默认保存方法名
    saveMethod: any = 'save';
    /**
     * 修改的唯一主键
     */
    uuid: any;
    /**
     * 标识该主键是修改还是新增
     */
    isAdd = true;

    /**
     * 动态表单数据
     */
    formData: any;

    proto: any;

    data: any;

    isSave: any = true;

    @ViewChild(FormFormComponent)
    private fform: FormFormComponent;

    constructor(public service: DyBaseService | any,
    ) {
        super();
    }
    /**
     * 给子类实现
     * @param protoEntry
     */
    beforeSave() {
        this.log('保存表单提交给服务器之前的操作.只能去操作 this.protoEntry  才有意义');
    }
    /**
     * 给子类实现
     * @param protoEntry
     */
    afterSave() {
        this.log('保存表单成功之后 需要处理的业务逻辑比如  页面跳转');
    }
    /**
    * 提交表单
    * @param data
    */
    formSubmit(data: any) {
        this.log('表单参数 :' + JSON.stringify(data));
        this.data = data;
        this.protoEntry.proto = data;
        this.save();
    }
    save() {
        if (!this.hasMethod(this.service, this.saveMethod)) {
            return;
        }
        this.service.getProtoEntry().subscribe(
            (protoMessage: any) => {
                if (!this.isAdd) {
                    this.protoEntry.query = { uuid: this.uuid };
                }
                this.beforeSave();
                // this.log('IdorpFormComponent save   protoEntry : ' + JSON.stringify(this.protoEntry));
                if (this.isSave) {
                    this.service[this.saveMethod](this.protoEntry, protoMessage, this.isAdd).subscribe(
                        (protoMsg: any) => {
                            if (this.service.isNotEx(protoMsg.token)) {
                                this.protoEntry = protoMsg;
                                this.service.isReLoad = true;
                                this.afterSave();
                                this.log('idAccountUser query result : ' + JSON.stringify(this.protoEntry));
                            }
                        },
                    );
                }
            }
        );
    }
    /**
     * 给子类实现
     * @param protoEntry
     */
    afterLoad(jsonFormData: any) {
        this.log('请求接口获取数据成功后处理的空方法  只需要对jsonFormData的数据 进行处理 这个方法还没有对表单进行set 值');
    }
    afterSetForm(jsonFormData: any) {
        this.log('form 数据初始化完成的空方法(页面的数据已经set值)  用来处理加载完成之后的业务逻辑');
    }
    /**
     * 修改的时候  进入页面更加uuid  加载数据
     */
    loadFormData(loadProto: any = null, protoMessage_in: any = null) {
        if (this.isAdd) {
            return;
        }
        if (!this.hasMethod(this.service, this.loadMethod)) {
            return;
        }
        if (loadProto === null) {
            if (protoMessage_in === null) {
                this.service.getProtoEntry().subscribe(
                    (protoMessage: any) => {
                        const loadProto = protoMessage.create({ query: { uuid: this.uuid } });
                        this.log('idAccountUser query params : ' + JSON.stringify(loadProto));
                        this.service[this.loadMethod](loadProto, this.uuid, protoMessage).subscribe(
                            (protoMsg: any) => {
                                if (protoMsg && protoMsg.proto) {
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
            } else {
                const loadProto = protoMessage_in.create({ query: { uuid: this.uuid } });
                this.log('idAccountUser query params : ' + JSON.stringify(loadProto));
                this.service[this.loadMethod](loadProto, this.uuid, protoMessage_in).subscribe(
                    (protoMsg: any) => {
                        if (protoMsg && protoMsg.proto) {
                            this.protoEntry = protoMsg;
                            //表单数据变化  刷新表单
                            this.proto = this.protoEntry.proto;
                            this.resetFormData();
                        }
                        this.log('loadFormData query result : ' + JSON.stringify(this.protoEntry));
                    },
                );
            }
        } else {
            this.log('调用loadFormData  穿进来的参数 loadProto : ' + JSON.stringify(loadProto));
            if (protoMessage_in === null) {
                this.service.getProtoEntry().subscribe(
                    (protoMessage: any) => {
                        this.service[this.loadMethod](loadProto, protoMessage).subscribe(
                            (protoMsg: any) => {
                                if (protoMsg && protoMsg.proto) {
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
            } else {
                this.service[this.loadMethod](loadProto, protoMessage_in).subscribe(
                    (protoMsg: any) => {
                        if (protoMsg && protoMsg.proto) {
                            this.protoEntry = protoMsg;
                            //表单数据变化  刷新表单
                            this.proto = this.protoEntry.proto;
                            this.resetFormData();
                        }
                        this.log('loadFormData query result : ' + JSON.stringify(this.protoEntry));
                    },
                );
            }
        }
    }

    /**
     * 表单数据变化  刷新表单
     */
    resetFormData() {
        if (this.proto) {
            const form = this.fform.getDyFormComp();
            const jsonFormData = IUtils.json2FromData(this.proto);
            this.afterLoad(jsonFormData);
            form.reset(jsonFormData);
            this.afterSetForm(jsonFormData);
        }
    }

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

    /**
     * 给formData 设置值
     * @param key
     */
    setItemValue(key: any, value: any) {
        const json: any = {};
        json[key] = value;
        if (this.fform) {
            FormUtils.setItemValueByJson(this.fform.getDyFormComp(), this.formData, json);
        }
    }
    setItemValueByJson(json: any) {
        if (this.fform) {
            FormUtils.setItemValueByJson(this.fform.getDyFormComp(), this.formData, json);
        }
    }

    /**
     * 设置某个属性为空
     * @param key
     */
    setNullByKey(key: any) {
        // const form = this.fform.getDyFormComp();
        // form.setNull(key);
        if (this.fform) {
            FormUtils.setNullByKey(this.fform.getDyFormComp(), key);
        }
    }
    /**
      * 初始化完成之后  向动态表单中添加disabled属性
      * @param formData
      * @param key
      */
    addDisabledAfterInit(key: any) {
        FormUtils.addDisabledList(this.formData, [key]);
        FormUtils.refreshForm(this.fform, this.formData);
    }

    addHiddenAfterInit(key: any) {
        FormUtils.addHiddenList(this.formData, [key]);
        FormUtils.refreshForm(this.fform, this.formData);
    }


    addDisabledListAfterInit(keyArr: any, opt: boolean = true, dealOther: boolean = false) {
        FormUtils.addDisabledList(this.formData, keyArr, opt, dealOther);
        FormUtils.refreshForm(this.fform, this.formData);
    }

    addHiddenListAfterInit(keyArr: any, opt: boolean = true, dealOther: boolean = false) {
        FormUtils.addHiddenList(this.formData, keyArr, opt, dealOther);
        FormUtils.refreshForm(this.fform, this.formData);
    }
    addHiddenButtonList(keyArr: any, opt: boolean = true, dealOther: boolean = false) {
        FormUtils.addHiddenButtonList(this.formData, keyArr, opt, dealOther);
    }
    addHiddenButtonListAfterInit(keyArr: any, opt: boolean = true, dealOther: boolean = false) {
        FormUtils.addHiddenButtonList(this.formData, keyArr, opt, dealOther);
        FormUtils.refreshForm(this.fform, this.formData);
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

    /**
     * 向表单对象动态添加tiem
     * @param items  item的数组对象
     * @param afterKey 在哪个item key后面开始添加
     * @param isRefresh 是否自动刷新表单  默认不刷新
     */
    addItemListAfterInit(items: any, afterKey: String, isRefresh = false) {
        FormUtils.addItemList(this.formData, items, afterKey);
        if (isRefresh) {
            FormUtils.refreshForm(this.fform, this.formData);
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
            FormUtils.refreshForm(this.fform, this.formData);
        }
    }
    updateRules(keyArr: any, rule: any, isAdd: boolean = true, isRefresh = false) {
        FormUtils.updateRules(this.formData, keyArr, rule, isAdd);
        if (isRefresh) {
            this.refreshRule();
        }
    }
    clearRules(keyArr: any, isRefresh = false) {
        FormUtils.clearRules(this.formData, keyArr);
        if (isRefresh) {
            this.refreshRule();
        }
    }
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
}

