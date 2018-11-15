import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DemoService } from './demo.service';
import { IdSysAppAcountService } from '../../idsys/idsysappacount/idsysappacount.service';
import { SysEvent } from '../../shared/idorp/event/sys.event';
import { FormBaseComponent } from '../../shared/idorp/component/FormBaseComponent';
import { ToolAlert } from '../../shared/tool/ToolAlert';



declare let $: any;

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sys-account-form',
  // templateUrl: 'idsysappacount.form.html',
  template: `<f-form-cmp *ngIf="formData" [formData]="formData"  (customerSubmitOut)="customerSubmit($event)"
   (formSubmited)="formSubmit($event)" (selectchangeout)="selectChange($event)"></f-form-cmp>`,
  viewProviders: []
})

export class DemoFormComponent extends FormBaseComponent implements OnInit {
  public constructor(
    private route: ActivatedRoute,
    public demoService: DemoService,
    private sysEvent: SysEvent,
    protected eleRef: ElementRef,
    public accountService: IdSysAppAcountService,
    public _router: Router) {
    super(demoService, eleRef);
  }
/*
  'fi_text',                    //input=’text‘ 输入框
    'fi_select',                  // 下拉框 select
    'fi_time',                    //时间选择器
    'fi_button_search',           //列表页面搜索按钮
    'fi_button_search_customer',  //列表页面自定义按钮
    'fi_keeditor',                //富文本
    'fi_checkbox',                //多选checkbox
    'fi_takepoint_map',           //地图取点
    'fi_select_tree',             //树选择器
    'fi_select_table',            //列表选择器
    'fi_img',                     //上传图片
    'fi_img_cut',                 //上传裁剪图片
    'fi_select_search',           //带搜索的下拉框
    'fi_provincecityarea',        //省市区选择
    'fi_textarea',                //多行文本
    'fi_combodate',               //时分秒
    'fi_file',                    //文件上传
    'fi_button_cancel',           //取消按钮
    'fi_submit',                  //提交按钮
    'fi_submit_customer',         //自定义提交按钮
    'fi_button_add'               //列表新增按钮
    'fi_audio',                     //音频上传
*/
  /**
     * 保存操作调用接口之前的处理方法
     * @param data 表单填写的JSON数据
     */
  beforeSave(data: any) {
    return data;
  }
  /**
   * 保存操作完成之后的处理方法，用于处理保存之后 通过接口返回状态的一些操作
   * @param protoEntry 接口返回的协议对象
   */
  afterSave(protoEntry: any) {
    ToolAlert.success('afterSave: 表单验证通过');
    return protoEntry;
  }
  /**
   * 自定义表单验证，用于校验规则无法满足的，或者比较复杂的验证
   * @param data
   */
  formCheck(data: any): boolean {
    ToolAlert.success('formCheck: 表单验证通过');
    return true;
  }
  /**
     * 请求接口获取数据成功后处理的方法  只需要对jsonFormData的数据 进行处理 这个方法还没有对表单进行set 值
     * @param protoEntry
     */
  afterLoad(jsonFormData: any) {
    return jsonFormData;
  }
  /**
   * form 数据初始化完成的空方法(页面的数据已经set值)  用来处理加载完成之后的表单显示和disabled逻辑
   * @param formValue 表单提交返回的JSON数据
   */
  afterSetForm(formValue: any) {
    const itemArr = [
      {
        fi_type: 'fi_text',
        key: 'demo_text1',
        label: '文本框1',
        type: 'text',
      },
      {
        fi_type: 'fi_text',
        key: 'demo_text2',
        label: '文本框2',
        type: 'text',
      }
    ];
    this.addItemList(itemArr, 'demo_select');

    //对于树和列表需要查询数据的item   更改了过滤项  刷新表单内容操作
    this.updateFilterJson(this.formData, 'tree', this.demoService.getFilterJson());

    // this.addHiddenAfterInit('demo_select');
    this.setItemValueByJson({ 'demo_text': '666666' });

    this.addDisabledButtonList(['auth'], !this.getButtonKeyDisabledStatus('auth'));
    // this.addHiddenButtonList(['auth'],);
    this.refreshItem();
    this.sysEvent.publishRoute(new Date().getTime());
  }

  myInit() {
    $('sys-account-form').addClass('vbox');
    this.route.params.subscribe(params => {
      const fd = this.demoService.initFormData();
      if (params['uuid']) {
        this.uuid = params['uuid'];
        this.isAdd = false;
        //如果是修改  更新某些属性不可写
        // this.addDisabled(fd, 'testnull');
        // this.loadFormData();
        this.formData = fd;
        this.log(' update form component  uuid :' + this.uuid);
      } else {
        this.formData = fd;
        this.log(' add form component ');
      }
    });
    //动态增加 select 的  opt_list
    const demo_search_select_optList = [];
    for (let i = 1; i < 20; i++) {
      demo_search_select_optList.push({
        key: {
          l_id: i
        },
        value: {
          open_id: '选项' + i
        },
      });
    }
    this.bindFormDateOptList(demo_search_select_optList, 'demo_search_select');
  }
  selectChange(v: any) {
    this.log('selectChange' + JSON.stringify(v));
    //设置某个item 为空
    // this.setNullByKey('demo_keeditor');
  }
  customerSubmit(data: any) {
    alert('提交的表单数据 :' + JSON.stringify(data.v));
    //调用这个方法只是为了演示afterSetForm的效果
    this.afterSetForm(data.v);
    return data.v;
  }
}
