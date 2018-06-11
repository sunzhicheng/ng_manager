import { Component, EventEmitter, OnInit, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ToolGpbService } from './../../shared/tool/tool-gpb.service';

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

  @Input()
  public config: any = {
    paging: true,
    sorting: {columns: {}},
    filtering: {filterString: '', columnName: 'id'}
  };

  @Input()
  public opt_config: any = {
    'isopt': true,
    'view': false,
    'rebut': false,
    'pass': false,
    'home': false,
    'top': false,
    'update': false,
    'del': false,
    'enable': false, //启用
    'stop': false, //停用
    'notShowPage': false
  };
  //保存页码的数组
  public pagenum: Array<any> = [];

  @Input()   //组件选择类型  1:‘checkbox’  或者  2:‘radio’
  public cmpSelect = 1;
  @Input()
  public pager: any;
  // Outputs (Events)
  @Output()
  public tableChanged: EventEmitter<any> = new EventEmitter();

  @Output()
  public allCheckedV: EventEmitter<any> = new EventEmitter();

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

  constructor(private toolGpbService: ToolGpbService) {

  }

  ngOnInit() {
    console.log('ng-table init cmpSelect： ' + this.cmpSelect);
    // this.table_class += ' one';
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
    return {columns: sortColumns};
  }


  public onChangeTable(column: any): void {
    this._columns.forEach((col: any) => {
      if (col.name !== column.name) {
        col.sort = '';
      }
    });


    this.tableChanged.emit({sorting: this.configColumns});
  }

  public getData(row: any, propertyName: string): string {
    return propertyName.split('.').reduce((prev: any, curr: string) => prev[curr], row);
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


  public all(e: any) {
    console.log('ng-table .. all  ');
    const checkboxArr: any = $('.table input');
    if (e.target.checked) {
      this.checkedV = [];
      for (const i in checkboxArr) {
        if (checkboxArr[i].checked === undefined) {
          continue;
        }
        checkboxArr[i].checked = true;
        if (checkboxArr[i].defaultValue) {
          const v: number = checkboxArr[i].defaultValue;
          this.checkedV.push(v);
        }
      }
    } else {
      for (const i in checkboxArr) {
        if (checkboxArr[i].checked === undefined) {
          continue;
        }
        checkboxArr[i].checked = false;
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
          retn += ',';
        }
        retn += idArr[i];
      }
    }
    return retn;
  }


  public oneCheck(e: any) {
    console.log('ng-table .. oneCheck  ');
    if (e.target.checked) {
      this.checkedV.push(e.target.attributes.value.value);
    } else {
      const v: number = e.target.attributes.value.value;
      const index = this.checkedV.indexOf(v);
      this.checkedV[index] = undefined;
    }

    const allv = this.getAllCheckedV();
    this.allCheckedV.emit(allv);
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
    // console.log("initData....");
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
        if (heads.length > 0) {
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
            const h = {title: head.title, name: col};
            columnsArr.push(h);
          }
          if (columnsArr && columnsArr.length > 0) {
            this.columns_temp.splice(0, this.columns_temp.length);
            this.columns_temp = columnsArr;

          }

        }
        //添加数据
        const rowlist = ext.row;
        this.rows = [];
        for (const i in rowlist) {
          const row = rowlist[i];
          const rowObj: any = {};
          const rowData = row.data;

          rowObj.st = row.st;


          let k = 0;
          for (const j in rowData) {
            const rowTitle: string = this.columns_temp[k]['name'];
            k++;

            const cell = rowData[j];
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
      for (const j in this.columns_temp) {
        const head = this.columns_temp[j];
        if (head.title === 'ID') {
          continue;
        }
        _columnsArr.push(head);
      }
      if (_columnsArr && _columnsArr.length !== 0) {
        this.columns = _columnsArr;
      }
    }


    // //配置config
    // if (!this.config.sorting || this.config.sorting.length ===0) {
    //   this.config.sorting = this.columns;
    // }
  }

  public getCheckedV() {
    const checkboxArr: any = $('.table input');
    const ids: any = [];
    for (const i in checkboxArr) {
      if (checkboxArr[i].checked === undefined) {
        continue;
      }
      if (checkboxArr[i].attributes.value) {
        ids.push(checkboxArr[i].value);
      }
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
      this.numberIndex = this.pageIndex();
    }
  }


  public initPage(sort_config: any): any {
    this.toolGpbService.getIPagerExt((protoMessage: any) => {
      const ISort = protoMessage.ISort;
      const ISortCol = protoMessage.ISortCol;

      //初始化分页参数
      if (sort_config) {
        console.log('设置排序字段:' + sort_config.title + '| ' + sort_config.sort);
        const sortCol = sort_config.name;
        const sortBy = sort_config.sort;

        //保存排序
        this.config.sorting = sort_config;

        if (!this.pager.ext) {
          this.pager.ext = {};
        }
        if (sortBy === 'asc') {
          this.pager.ext.sort = ISort.SORT_ASC;
        } else if (sortBy === 'desc') {
          this.pager.ext.sort = ISort.SORT_DESC;
        }
        if (sortCol) {
          const col = sortCol.replace('col_', '');
          if (!this.pager.ext.sort_head) {
            this.pager.ext.sort_head = {};
          }

          this.pager.ext.sortCol = ISortCol.SC_CUSTOM;
          // tslint:disable-next-line:radix
          this.pager.ext.sort_head.h_identity = parseInt(col);
        }
      }
      if (sort_config.itemsPerPage) {
        this.pager.pagePerCount = sort_config.itemsPerPage;
      }
      if (sort_config.page) {
        this.pager.pageNo = sort_config.page;
      }

      this.tableChanged.emit(this.pager);

    });
  }

  /**
   * 切换页面
   * @param page
   */
  public toPage(page: any) {
    // tslint:disable-next-line:radix
    page = parseInt(page);
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
    const needShowCount = 5;
    const afterCurrentPage: any = [];
    let beforeCurrentPage: any = [];
    const pageCount = Math.ceil(page.totalCount / page.pagePerCount);
    for (let i = page.pageNo; i <= pageCount; i++) {
      afterCurrentPage.push({index: i, currentPage: i === page.pageNo});
      if (afterCurrentPage.length >= needShowCount) {
        break;
      }
    }
    if (afterCurrentPage.length >= needShowCount) {
      return afterCurrentPage;
    }
    for (let i: any = page.pageNo - 1; i >= 1; i--) {
      beforeCurrentPage.push({index: i, currentPage: i === page.pageNo});
      if (beforeCurrentPage.length >= needShowCount - afterCurrentPage.length) {
        break;
      }
    }
    beforeCurrentPage = beforeCurrentPage.reverse();
    const indexArr = beforeCurrentPage.concat(afterCurrentPage);
    return indexArr;
  }

  goPointNum(index: number) {
    this.toPage(index);
  }


  /**
   * 根据数据状态显示或不显示操作按钮
   * 操作对象格式 { rowIndex: ,value:  }
   * @param operationName
   */
  isShowOperation(row: any, operationName: string) {
    let res = false;
    if (this.opt_config[operationName]) {
      //未配置操作对象则返回true
      if (!this.opt_config[operationName].rowIndex) {
        res = true;
      } else {
        //配置了操作对象则进行判断
        let state: any = this.getData(row, 'col_' + this.opt_config[operationName].rowIndex);
        if (state) {
          //去空格
          state = state.trim();
        }
        if (state === this.opt_config[operationName].value) {
          res = true;
        }
      }
    }
    return res;
  }

}
