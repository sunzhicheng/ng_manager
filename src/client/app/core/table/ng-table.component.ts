import { Component, EventEmitter, OnInit, Input, Output, OnChanges, SimpleChanges } from '@angular/core';

import { GpbService } from '../../shared/service/gpb.service';
import { IdTool } from '../../shared/tool/IdTool';
import * as _ from 'lodash';

declare let $: any;

@Component({
  moduleId: module.id,
  selector: 'ng-table',
  templateUrl: 'ng-table.html'
  // directives: [NgTableSortingDirective, NgClass, CORE_DIRECTIVES, PAGINATION_DIRECTIVES, PaginationComponent]
})
export class NgTableComponent implements OnInit, OnChanges {

  // Table values
  @Input()
  public rows: Array<any> = [];

  public checkedV: any = [];

  _config: any = {
    paging: true,
    saveCheckV: false,
    sorting: { columns: {} },
    filtering: { filterString: '', columnName: 'id' },
    permissoinBase: '',
    maxLengthData: 20,
  };
  @Input()
  public set config(values: any) {
    IdTool.mergeAFromB(this._config, values, {});
  }

  optConfig: any = {
    'isopt': true,
    'view': false,
    'rebut': false,
    'pass': false,
    'home': false,
    'top': false,
    'update': true,
    'del': true,
    'enable': false, //启用
    'stop': false, //停用
    'notShowPage': false,
    'bind': false,
    'unbind': false,
    'outGood': false,  //出库
    'subAudit': false,  //提交审核
    'inGood': false,    //入库
    'delivery': false, //发货
    'cancel': false,   //取消
    'refund': false,   //退货
    'changeLevel': false, //等级变动
    'changeNum': false,    //数量变动
    'bindZfb': false,    //绑定支付宝应用
    'bindWX': false,    //绑定微信商户
    'paimai': false,    //paimai信息
  };
  @Input()
  public set opt_config(values: any) {
    IdTool.mergeAFromB(this.optConfig, values, {});
  }



  //保存页码的数组
  public pagenum: Array<any> = [];

  @Input()   //组件选择类型  1:‘checkbox’  或者  2:‘radio’
  public cmpSelect = 0;
  @Input()
  public pager: any;
  // Outputs (Events)
  @Output()
  public tableChanged: EventEmitter<any> = new EventEmitter();

  @Output()
  public allCheckedV: EventEmitter<any> = new EventEmitter();

  @Output()
  public radiodV: EventEmitter<any> = new EventEmitter();

  @Output()
  public update: EventEmitter<any> = new EventEmitter();

  @Output()
  public del: EventEmitter<any> = new EventEmitter();

  @Output()
  public enable: EventEmitter<any> = new EventEmitter();

  @Output()
  public view: EventEmitter<any> = new EventEmitter();
  @Output()
  public rebut: EventEmitter<any> = new EventEmitter();
  @Output()
  public pass: EventEmitter<any> = new EventEmitter();
  @Output()
  public home: EventEmitter<any> = new EventEmitter();
  @Output()
  public top: EventEmitter<any> = new EventEmitter();
  @Output()
  public unbind: EventEmitter<any> = new EventEmitter();
  @Output()
  public bind: EventEmitter<any> = new EventEmitter();
  @Output()
  public stop: EventEmitter<any> = new EventEmitter();
  @Output()
  public outGood: EventEmitter<any> = new EventEmitter();
  @Output()
  public subAudit: EventEmitter<any> = new EventEmitter();
  @Output()
  public inGood: EventEmitter<any> = new EventEmitter();
  @Output()
  public delivery: EventEmitter<any> = new EventEmitter();
  @Output()
  public cancel: EventEmitter<any> = new EventEmitter();
  @Output()
  public refund: EventEmitter<any> = new EventEmitter();
  @Output()
  public changeLevel: EventEmitter<any> = new EventEmitter();
  @Output()
  public changeNum: EventEmitter<any> = new EventEmitter();
  @Output()
  public bindZfb: EventEmitter<any> = new EventEmitter();
  @Output()
  public bindWX: EventEmitter<any> = new EventEmitter();
  @Output()
  public paimai: EventEmitter<any> = new EventEmitter();


  public page = 1;
  public itemsPerPage = 1;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  public table_class = 'table';

  /**
   * 记录最新时间
   * @type {number}
   */
  public last_sync_time = 0;

  public _columns: Array<any> = [];


  public columns_temp: Array<any> = [];

  selectPage: any = 1;

  numberIndex: any;
  numberIndex_all: any;

  table_id: any;

  @Input()
  public set columns(values: Array<any>) {
    values.forEach((value: any) => {
      const column = this._columns.find((col: any) => col.name === value.name);
      if (column) {
        Object.assign(column, value);
      }
      if (!column) {
        this._columns.push(value);
      }
    });
  }

  constructor(private toolGpb: GpbService) {

  }
  /**
   * 判断是否已经被选
   */
  isChecked(id: any) {
    if (id && this.isContainV(id)) {
      return true;
    }
    return false;
  }

  ngOnInit() {
    // console.log('ng-table init cmpSelect： ' + this.cmpSelect);
    // this.table_class += ' one';
    const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    this.table_id = 'table_' + random;
  }

  public get columns(): Array<any> {
    return this._columns;
  }

  public get configColumns(): any {
    const sortColumns: Array<any> = [];
    this.columns.forEach((column: any) => {
      if (column.sort) {
        sortColumns.push(column);
      }
    });
    return { columns: sortColumns };
  }


  public onChangeTable(column: any): void {
    this._columns.forEach((col: any) => {
      if (col.name !== column.name) {
        col.sort = '';
      }
    });


    this.tableChanged.emit({ sorting: this.configColumns });
  }

  public getData(row: any, propertyName: string): string {
    return _.get(row, propertyName);
  }


  public updateOpt(id: any) {
    this.update.emit(id);
  }

  public delOpt(id: any) {
    this.del.emit(id);
  }

  public unbindOpt(id: any) {
    this.unbind.emit(id);
  }

  public enableOpt(id: any) {
    this.enable.emit(id);
  }

  public stopOpt(id: any) {
    this.stop.emit(id);
  }

  public viewOpt(id: any) {
    this.view.emit(id);
  }

  public rebutOpt(id: any) {
    this.rebut.emit(id);
  }

  public passOpt(id: any) {
    this.pass.emit(id);
  }

  public homeOpt(id: any) {
    this.home.emit(id);
  }

  public topOpt(id: any) {
    this.top.emit(id);
  }

  public bindOpt(id: any) {
    this.bind.emit(id);
  }

  public outGoodOpt(id: any) {
    this.outGood.emit(id);
  }

  public subAuditOpt(id: any) {
    this.subAudit.emit(id);
  }

  public inGoodOpt(id: any) {
    this.inGood.emit(id);
  }

  public deliveryOpt(id: any) {
    this.delivery.emit(id);
  }

  public cancelOpt(id: any) {
    this.cancel.emit(id);
  }

  public refundOpt(id: any) {
    this.refund.emit(id);
  }

  public changeLevelOpt(id: any) {
    this.changeLevel.emit(id);
  }

  public changeNumOpt(id: any) {
    this.changeNum.emit(id);
  }

  public bindZfbOpt(id: any) {
    this.bindZfb.emit(id);
  }

  public bindWXOpt(id: any) {
    this.bindWX.emit(id);
  }
  public paimaiOpt(id: any) {
    this.paimai.emit(id);
  }



  public all(e: any) {
    // console.log('ng-table .. all  ');
    const checkboxArr: any = $('#' + this.table_id + ' input');
    if (e.target.checked) {
      this.checkedV = [];
      for (const i in checkboxArr) {
        if (checkboxArr[i].checked === undefined) {
          continue;
        }
        checkboxArr[i].checked = true;
        if (checkboxArr[i].defaultValue) {
          const v = checkboxArr[i].defaultValue;
          this.checkedV.push(v);
        }
      }
    } else {
      for (const ii in checkboxArr) {
        if (checkboxArr[ii].checked === undefined) {
          continue;
        }
        checkboxArr[ii].checked = false;
      }
      this.checkedV = [];
    }

    const allv = this.getAllCheckedV();
    this.allCheckedV.emit(allv);
  }

  /**
   * 获得所有选择的值
   * @returns {string}
   */
  public getAllCheckedV() {
    const ids: string = this.checkedV.join();
    const idArr = ids.split(',');
    let retn = '';
    for (const i in idArr) {
      if (idArr[i]) {
        if (retn !== '') {
          //排重
          if (retn.indexOf(idArr[i]) !== -1) {
            continue;
          }
          retn += ',';
        }
        retn += idArr[i];
      }
    }
    return retn;
  }

  /**
   * radio获取单个id的值
   */
  public getRadioV() {
    const ids: string = this.checkedV.join();
    const strArray = ids.split(',');
    return strArray[strArray.length - 1];
  }

  isContainV(v: any) {
    for (const i in this.checkedV) {
      const cv = this.checkedV[i];
      if (cv === v) {
        return true;
      }
    }
    return false;
  }

  public oneCheck(e: any) {
    // console.log('ng-table .. oneCheck  ');
    if (e.target.checked) {
      this.checkedV.push(e.target.attributes.value.value);
    } else {
      const v = e.target.attributes.value.value;
      const index = this.checkedV.indexOf(v);
      this.checkedV[index] = undefined;
    }

    const allv = this.getAllCheckedV();
    this.allCheckedV.emit(allv);
    const rV = this.getRadioV();
    this.radiodV.emit(rV);
    // alert(this.checkedV.join());
  }

  /**
   * 设置总页数
   */
  setTotalPage(pagePerCount: any, totalCount: any) {
    totalCount = totalCount || 0;
    const totalPage = Math.ceil(totalCount / pagePerCount);
    this.numPages = totalPage;
    this.initPageNum();
  }

  /**
   * 解析pager
   */
  public initData() {
    if (!this.pager) {
      return;
    }
    // console.log('initData....');
    const pageNo = this.pager.pageNo;
    const pagePerCount = this.pager.pagePerCount;
    const totalCount = this.pager.totalCount;
    this.length = totalCount;
    this.page = pageNo;
    this.itemsPerPage = pagePerCount;
    this.setTotalPage(pagePerCount, totalCount);

    const pm = this.pager.pm;
    if (pm === 2) {
      const ext = this.pager.ext;
      if (ext) {
        // 添加表头
        const heads = ext.heads;
        if (heads && heads.length > 0) {
          const columnsArr: Array<any> = [];
          // if (this.cmpSelect) {
          //   columnsArr.push({title: '', name: 'ck'});
          // }
          for (const j in heads) {
            const head = heads[j];
            // if(head.title === 'ID') {
            //   continue;
            // }
            const col = 'col_' + head.h_identity;
            const h = { title: head.title, name: col };
            columnsArr.push(h);
          }
          if (columnsArr && columnsArr.length > 0) {
            this.columns_temp.splice(0, this.columns_temp.length);
            this.columns_temp = columnsArr;

          }

        }
        //添加数据
        const rowlist = ext.row;
        //清空原来的数据
        this.rows.splice(0, this.rows.length);
        if (rowlist) {
          for (const i in rowlist) {
            const row = rowlist[i];
            const rowObj: any = {};
            const rowData = row.data;
            rowObj.st = row.st;
            let k = 0;
            for (const jj in rowData) {
              const rowTitle: string = this.columns_temp[k]['name'];
              k++;
              const cell = rowData[jj];
              let cellData = '';
              const dt = cell.dt;
              if (dt === 1) {
                cellData = cell.s;
              } else if (dt === 2) {
                cellData = cell.l;
              }
              //处理列表数据太长的问题,用...代替
              if (rowTitle === 'col_0' ||  rowTitle === 'col_1') {
                rowObj[rowTitle] = cellData;
              } else {
                rowObj[rowTitle] = this.dealLongData(cellData);
              }
            }
            this.rows.push(rowObj);
          }
        }
      }
    }


    if (!this.columns || this.columns.length === 0) {
      //删除ID title
      const _columnsArr: Array<any> = [];
      for (const m in this.columns_temp) {
        const head = this.columns_temp[m];
        if (head.title === 'UUID') {
          continue;
        }
        _columnsArr.push(head);
      }
      if (_columnsArr && _columnsArr.length !== 0) {
        this.columns = _columnsArr;
      }
    }

    //每次初始化  清空下 this.checkedV
    if (!this._config.saveCheckV) {
      this.checkedV.splice(0, this.checkedV.length);
    }

    // //配置config
    // if (!this.config.sorting || this.config.sorting.length ===0) {
    //   this.config.sorting = this.columns;
    // }
    this.numberIndex = this.pageIndex();
    this.numberIndex_all = this.pageIndexAll();
  }
  /**
   * 处理字符串太长   用... 代替  默认长度13
   * @param data
   */
  dealLongData(data: any) {
    // console.log('maxLengthData' + this._config.maxLengthData);
    if (data.length > this._config.maxLengthData) {
      return data.substring(0, this._config.maxLengthData - 3) + '...';
    } else {
      return data;
    }
  }

  /**
   * 监控
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if (this.pager && this.pager.ext) {
      if (this.pager.last_sync_time !== this.last_sync_time) {
        this.initData();
        this.last_sync_time = this.pager.last_sync_time;
      }

      this.selectPage = this.pager.pageNo;
    }
  }


  public initPage(sort_config: any): any {
    const me = this;
    this.toolGpb.getProto('com2.IPagerExt').subscribe(
      (protoMessage: any) => {
      const ISort = protoMessage.ISort;
      const ISortCol = protoMessage.ISortCol;

      //初始化分页参数
      if (sort_config) {
        console.log('设置排序字段:' + sort_config.title + '| ' + sort_config.sort);
        const sortCol = sort_config.name;
        const sortBy = sort_config.sort;

        //保存排序
        me._config.sorting = sort_config;

        if (!me.pager.ext) {
          me.pager.ext = {};
        }
        if (sortBy === 'asc') {
          me.pager.ext.sort = ISort.SORT_ASC;
        } else if (sortBy === 'desc') {
          me.pager.ext.sort = ISort.SORT_DESC;
        }
        if (sortCol) {
          const col = sortCol.replace('col_', '');
          if (!me.pager.ext.sort_head) {
            me.pager.ext.sort_head = {};
          }

          me.pager.ext.sortCol = ISortCol.SC_CUSTOM;
          me.pager.ext.sort_head.h_identity = parseInt(col, 10);
        }
      }
      if (sort_config.itemsPerPage) {
        me.pager.pagePerCount = sort_config.itemsPerPage;
      }
      if (sort_config.page) {
        me.pager.pageNo = sort_config.page;
      }

      me.tableChanged.emit(me.pager);

    });
  }

  /**
   * 切换页面
   * @param page
   */
  public toPage(page: any) {
    page = parseInt(page, 10);
    if (page < 1 || page > this.numPages) {
      return;
    }
    this.pager.pageNo = page;

    this.tableChanged.emit(this.pager);
  }

  public initPageNum() {
    this.pagenum = [];
    let i = 1;
    while (i <= this.numPages) {
      this.pagenum.push(i);
      i++;
    }
  }




  getPageCounts() {
    return Math.ceil(this.pager.totalCount / this.pager.pagePerCount);
  }

  next() {
    if (this.pager.pageNo >= this.getPageCounts()) {
      return;
    }
    this.toPage(this.pager.pageNo + 1);
    //默认到顶部
    (<any>document).getElementsByTagName('body')[0].scrollTop = 0;
  }

  prev() {
    if (this.pager.pageNo <= 1) {
      return;
    }
    this.toPage(this.pager.pageNo - 1);
    //默认到顶部
    (<any>document).getElementsByTagName('body')[0].scrollTop = 0;
  }

  pageIndex() {
    const page: any = this.pager;
    const needShowCount: any = 5;
    const pageIndexArr: any = [];
    const pageCount = Math.ceil(page.totalCount / page.pagePerCount);
    const temIndex: any = Math.floor(needShowCount / 2);
    if (page.pageNo - temIndex <= 0 || pageCount <= needShowCount) {   // 开头
      const endIndex = pageCount > needShowCount ? needShowCount : pageCount;
      for (let i = 1; i <= endIndex; i++) {
        pageIndexArr.push({ index: i, currentPage: i === page.pageNo });
      }
    } else if (page.pageNo + temIndex >= pageCount) {  //末尾
      const start = pageCount - needShowCount;
      for (let k = start + 1; k <= pageCount; k++) {
        pageIndexArr.push({ index: k, currentPage: k === page.pageNo });
      }
    } else {  //中间
      const start = page.pageNo - temIndex;
      const endIndex = (start + needShowCount) > pageCount ? pageCount : (start + needShowCount);
      for (let j = start; j < endIndex; j++) {
        pageIndexArr.push({ index: j, currentPage: j === page.pageNo });
      }
    }
    return pageIndexArr;
  }
  pageIndexAll() {
    const page: any = this.pager;
    const pageIndexArr: any = [];
    const pageCount = Math.ceil(page.totalCount / page.pagePerCount);
    for (let i = 1; i <= pageCount; i++) {
      pageIndexArr.push({ index: i, currentPage: i === page.pageNo });
    }
    return pageIndexArr;
  }

  goPointNum(index: any) {
    this.toPage(index);
  }
  goSelectNum(event: any) {
    const pageindex = this.numberIndex_all[event.currentTarget.selectedIndex];
    this.toPage(pageindex.index);
  }

  /**
   * 根据数据状态显示或不显示操作按钮
   * @param operationName  操作对象格式 { rowIndex: ,value:'1,2'  }
   */
  isShowOperation(row: any, operationName: string) {
    let res = false;
    if (this.optConfig[operationName]) {
      //未配置操作对象则返回true
      if (!this.optConfig[operationName].rowIndex) {
        res = true;
      } else {
        //配置了操作对象则进行判断
        let state: any = this.getData(row, 'col_' + this.optConfig[operationName].rowIndex);
        if (state) {
          //去空格
          state = state.trim();
        }
        const canOptArr = this.optConfig[operationName].value.split(',');
        if (_.indexOf(canOptArr, state) !== -1) {
          res = true;
        }
      }
    }
    if (res && this._config.permissoinBase !== '') {
      //判断 permissoin 的权限
        const permissions = sessionStorage.permissions;
        res = false;
        if (permissions) {
          const permissoinArr = permissions.split(',');
          const permissoinBaseArr = this._config.permissoinBase.split(',');
          for (let i = 0; i < permissoinArr.length; i++) {
            const p = permissoinArr[i];
            permissoinBaseArr.forEach((pbase: any) => {
              const permissoin = pbase + ':' + operationName;
              if (p === permissoin) {
                res = true;
              }
            });
            if (res) {
              break;
            }
          }
        }
        return res;
    } else  {
      return res;
    }
  }
  setCheckedV(v: any) {
    this.checkedV = v;
  }
}
