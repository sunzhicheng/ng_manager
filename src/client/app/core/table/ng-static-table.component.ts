import { Component, EventEmitter, OnInit, Input, Output, OnChanges, DoCheck } from '@angular/core';
import { IUtils } from '../../shared/idorp/providers/IUtils';

const _ = require('lodash');

declare function $(filter: string): void;

@Component({
  moduleId: module.id,
  selector: 'ng-static-table',
  templateUrl: 'ng-static-table.html'
})
export class NgStaticTableComponent implements OnInit, OnChanges {

  // Table values
  public rows: Array<any> = [];
  pagePerCount: any  = 10;
  totalPage: any;
  totalCount: any;

  public checkedV: any = [];

  nameMap: any ;

  @Input()
  public config: any = {
    paging: true,
    sorting: {columns: {}},
    filtering: {filterString: '', columnName: 'id'}
  };

  //保存页码的数组
  public pagenum: Array<any> = [];

  @Input()   //组件选择类型  1:‘checkbox’  或者  2:‘radio’
  public cmpSelect: number;
  @Input()
  public pager: any;

  @Output()
  public allCheckedV: EventEmitter<any> = new EventEmitter();

  /**
   * 记录最新时间
   * @type {number}
   */
  public last_sync_time = 0;

  public _columns: Array<any> = [];


  public columns_temp: Array<any> = [];

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
    'outGood': false, //出库
    'subAudit': false,  //提交审核
    'inGood': false,   //进库
    'delivery': false, //发货
    'cancel': false,   //取消
    'refund': false,   //退货
    'changeLevel': false, //等级变动
    'changeNum': false,    //数量变动
    'bindZfb': false, //绑定支付宝应用
    'bindWX': false, //绑定微信商户
    'paimai': false, //绑定微信商户
  };
  @Input()
  public set opt_config(values: any) {
    IUtils.mergeAFromB(this.optConfig, values, {});
  }

  ngOnInit() {
    // console.log('ng-table 初始化参数 ： cmpSelect： ' + this.cmpSelect);
    const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    this.table_id = 'table_' + random;
  }
  /**
   * 监控
   */
  public ngOnChanges(): void {
    if (this.pager && this.pager.ext) {
      if (this.pager.last_sync_time !== this.last_sync_time) {
        this.initData();
        this.last_sync_time = this.pager.last_sync_time;
      }
    }
  }
  outV() {
    const allv = this.getAllCheckedV();
    if (allv) {
      let allname: any = '';
      allv.split(',').forEach(uuid => {
        if (allname !== '') {
          allname += ',';
        }
        allname += this.nameMap[uuid];
      });
      return {name: allname, value: allv};
    }
    return {name: '', value: ''};
  }


  initName(rowlist: any) {
    this.nameMap = {};
    rowlist.forEach((row: any) => {
      if (row.data && row.data.length >= 2) {
        const uuid = row.data[0].s;
        const name = row.data[2].s;
        this.nameMap[uuid] = name;
      }
    });
  }
  /**
   * 解析pager
   */
  public initData() {
    if (!this.pager) {
      return;
    }
    const ext = this.pager.ext;

    if (ext) {
      const pageNo = this.pager.pageNo;
      this.totalCount = ext.row.length;
      this.setTotalPage(this.pagePerCount, this.totalCount);
      // 添加表头
      const heads = ext.heads;
      if (heads && heads.length > 0) {
        const columnsArr: Array<any> = [];
        for (const j in heads) {
          const head = heads[j];
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
      if (!this.nameMap) {
        this.initName(rowlist);
      }
      //清空原来的数据
      this.rows.splice(0, this.rows.length);
      const startNo = (pageNo - 1) * this.pagePerCount;
      const endNo = (rowlist.length - 1) < (startNo + this.pagePerCount) ? rowlist.length : startNo + this.pagePerCount;
      if (rowlist) {
        for (let i: any = startNo; i < endNo; i++) {
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
            rowObj[rowTitle] = cellData;
          }
          this.rows.push(rowObj);
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
    this.numberIndex = this.pageIndex();
    this.numberIndex_all = this.pageIndexAll();
    this.setCheckBoxChecked();
  }
  /**
   * 设置总页数
   */
  setTotalPage(pagePerCount: any, totalCount: any) {
    totalCount = totalCount || 0;
    this.totalPage = Math.ceil(totalCount / pagePerCount);
    this.initPageNum();
  }

  public get columns(): Array<any> {
    return this._columns;
  }


  public getData(row: any, propertyName: string): string {
    return _.get(row, propertyName);
  }


  public all(e: any) {
    // console.log('ng-table .. all  ');
    const checkboxArr: any = $('#' + this.table_id + ' input');

    const checkedV_temp: any = [];
    if (e.target.checked) {
      for (const i in checkboxArr) {
        if (checkboxArr[i].checked === undefined) {
          continue;
        }
        checkboxArr[i].checked = true;
        if (checkboxArr[i].defaultValue) {
          const v: number = checkboxArr[i].defaultValue;
          checkedV_temp.push(v);
        }
      }
      this.checkedV = this.checkedV.concat(checkedV_temp);
      this.checkedV = _.uniq(this.checkedV);
    } else {
      for (const i in checkboxArr) {
        if (checkboxArr[i].checked) {
          const v: number = checkboxArr[i].defaultValue;
          checkedV_temp.push(v);
        }

        if (checkboxArr[i].checked === undefined) {
          continue;
        }
        checkboxArr[i].checked = false;
      }
      _.pullAll(this.checkedV, checkedV_temp);
    }
    this.allCheckedV.emit(this.outV());
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


  public oneCheck(e: any) {
    // console.log('ng-table .. oneCheck  ');
    if (e.target.checked) {
      const v = e.target.attributes.value.value;
      if (_.indexOf(this.checkedV, v) === -1) {
        this.checkedV.push(v);
      }
    } else {
      const v = e.target.attributes.value.value;
      const index = this.checkedV.indexOf(v);
      this.checkedV.splice(index, 1);
    }
    this.allCheckedV.emit(this.outV());
  }

  /**
   * 修改已经选择的行的checkbox
   */
  setCheckBoxChecked() {
    if (this.checkedV && this.checkedV.length > 0) {
      const checkboxArr: any = $('tbody input');
      for (const i in checkboxArr) {
        const id = checkboxArr[i].value;
        if (this.isChecked(id)) {
          checkboxArr[i].checked = true;
        }
      }
    }
  }
  goPointNum(index: any) {
    this.toPage(index);
  }
  goSelectNum(event: any) {
    const pageindex = this.numberIndex_all[event.currentTarget.selectedIndex];
    this.toPage(pageindex.index);
  }
  /**
   * 切换页面
   * @param page
   */
  public toPage(page: any) {
    // tslint:disable-next-line:radix
    page = parseInt(page);
    if (page < 1 || page > this.totalPage) {
      return;
    }
    this.pager.pageNo = page;
    this.initData();
  }

  public initPageNum() {
    this.pagenum = [];
    let i = 1;
    while (i <= this.totalPage) {
      this.pagenum.push(i);
      i++;
    }
  }

  pageIndex() {
    const page: any = this.pager;
    const needShowCount: any = 5;
    const pageIndexArr: any = [];
    const temIndex: any = Math.floor(needShowCount / 2);
    if (page.pageNo - temIndex <= 0 || this.totalPage <= needShowCount) {   // 开头
      const endIndex = this.totalPage > needShowCount ? needShowCount : this.totalPage;
      for (let i = 1; i <= endIndex; i++) {
        pageIndexArr.push({ index: i, currentPage: i === page.pageNo });
      }
    } else if (page.pageNo + temIndex >= this.totalPage) {  //末尾
      const start = this.totalPage - needShowCount;
      for (let k = start + 1; k <= this.totalPage; k++) {
        pageIndexArr.push({ index: k, currentPage: k === page.pageNo });
      }
    } else {  //中间
      const start = page.pageNo - temIndex;
      const endIndex = (start + needShowCount) > this.totalPage ? this.totalPage : (start + needShowCount);
      for (let j = start; j < endIndex; j++) {
        pageIndexArr.push({ index: j, currentPage: j === page.pageNo });
      }
    }
    return pageIndexArr;
  }
  pageIndexAll() {
    const page: any = this.pager;
    const pageIndexArr: any = [];
    for (let i = 1; i <= this.totalPage; i++) {
      pageIndexArr.push({ index: i, currentPage: i === page.pageNo });
    }
    return pageIndexArr;
  }


  public isChecked(id: any): boolean {
    if (!id) {
      return false;
    }
    for (const i in this.checkedV) {
      const checkedid = this.checkedV[i];
      if (checkedid === id) {
        return true;
      }
    }
    return false;
  }
  next() {
    if (this.pager.pageNo >= this.totalPage) {
      return;
    }
    this.toPage(this.pager.pageNo + 1);
  }

  prev() {
    if (this.pager.pageNo <= 1) {
      return;
    }
    this.toPage(this.pager.pageNo - 1);
  }
  setCheckedV(value: any) {
    // console.log('setCheckedV   : ' + JSON.stringify(value));
    if (value) {
      value.split(',').forEach((v: any) => {
        if (_.indexOf(this.checkedV, v) === -1) {
          this.checkedV.push(v);
        }
      });
    }
  }
}
