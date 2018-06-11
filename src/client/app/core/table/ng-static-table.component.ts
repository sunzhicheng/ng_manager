import { Component, EventEmitter, OnInit, Input, Output, OnChanges, DoCheck } from '@angular/core';

const _ = require('lodash');

declare function $(filter: string): void;

@Component({
  selector: 'ng-static-table',
  template: `
    <table class="table"
           role="grid" style="width: 100%;">
      <thead>
      <tr role="row">
      <th *ngIf="cmpSelect===1" >
          <div class="checkbox_default" >
              <input type="checkbox" (click)="all($event)" id="all_checkbox">
          </div>
      </th>
        <th *ngFor="let column of columns ; " [ngTableSorting]="config" [column]="column" (sortChanged)="initPage($event)"  >
          {{ column.title }}
          <i *ngIf="column.sort" class="pull-right fa"
            [ngClass]="{'fa-chevron-down': column.sort === 'desc', 'fa-chevron-up': column.sort === 'asc'}"></i>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let row of showrows ; let i = index" >
        <td *ngIf="cmpSelect===1" >
            <div class="checkbox_default">
                <input type="checkbox" id='row_{{i}}'  value="{{getData(row,'col_1')}}" (click)="oneCheck($event)" >
            </div>
        </td>
        <td *ngFor="let column of columns"  >{{ getData(row, column.name) }}</td>
      </tr>
      </tbody>
    </table>
    <div class="paging"> <span>每页{{ itemsPerPage }}条记录 / 共{{ length }}条记录 当前页 {{ page }} / {{ numPages }} 页</span>
        <div class="paging-btn"> <a (click)="toPage(1)">首页</a><a (click)="toPage(page-1)">上一页</a>
              <a (click)="toPage(page+1)">下一页</a><a (click)="toPage(numPages)">尾页</a>
                    <span> 转到
                        <select #pageselect>
                          <option *ngFor="let p of pagenum " value="{{ p }}">{{ p }}</option>
                        </select>
                        页 <a (click)="toPage(pageselect.value)">确定</a> </span>
        </div>
    </div>
  `,
  // directives: [NgTableSortingDirective, NgClass, CORE_DIRECTIVES, PAGINATION_DIRECTIVES, PaginationComponent]
})
export class NgStaticTableComponent implements OnInit, OnChanges, DoCheck {

  // Table values
  public rows: Array<any> = [];
  public showrows: Array<any> = [];

  public checkedV: any = [];

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
  // Outputs (Events)
  @Output()
  public tableChanged: EventEmitter<any> = new EventEmitter();

  @Output()
  public allCheckedV: EventEmitter<any> = new EventEmitter();

  public page = 1;
  public itemsPerPage = 10;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;
  /**
   * 记录最新时间
   * @type {number}
   */
  public last_sync_time = 0;

  public _columns: Array<any> = [];


  public columns_temp: Array<any> = [];

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


  ngOnInit() {
    console.log('ng-table 初始化参数 ： cmpSelect： ' + this.cmpSelect);
  }

  public get columns(): Array<any> {
    return this._columns;
  }


  public getData(row: any, propertyName: string): string {
    return propertyName.split('.').reduce((prev: any, curr: string) => prev[curr], row);
  }


  public all(e: any) {
    console.log('ng-table .. all  ');
    const checkboxArr: any = $('.table input');

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

    const allv = this.getAllCheckedV();
    this.allCheckedV.emit(allv);
  }

  /**
   * 获得所有选择的值
   * @returns {string}
   */
  public getAllCheckedV() {
    const retn: any = [];
    for (const i in this.checkedV) {
      let id = this.checkedV[i];
      for (const j in this.rows) {
        const r = this.rows[j];
        let id_rows: any = _.get(r, 'col_1');
        id_rows = (Number)(id_rows);
        id = (Number)(id);
        if (id_rows === id) {
          retn.push(r);
          break;
        }
      }
    }
    return retn;
    // let ids:string = this.checkedV.join();
    // let idArr = ids.split(',');
    // let retn = [];
    // for (let i in idArr) {
    //   if (idArr[i]) {
    //     if (retn !== '') {
    //       retn += ',';
    //     }
    //     retn += idArr[i];
    //   }
    // }
    // return retn;
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

    const totalCount = this.pager.ext.row.length;
    this.length = totalCount;
    this.setTotalPage(this.itemsPerPage, totalCount);

    const pm = this.pager.pm;
    if (pm === 2) {
      const ext = this.pager.ext;
      if (ext) {
        //添加表头
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

    this.changeShowRows();
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


  public ngDoCheck() {
    this.setCheckBoxChecked();
  }


  /**
   * 监控
   */
  public ngOnChanges(): void {
    // console.log('ngDoCheck....');
    // this.onChangeTable(this.config);
    if (this.pager && this.pager.ext) {
      if (this.pager.last_sync_time !== this.last_sync_time) {
        this.initData();
        this.last_sync_time = this.pager.last_sync_time;
      }
    }

  }


  public initPage(sort_config: any): any {
    //初始化分页参数
    // if (sort_config) {
    //   console.log('设置排序字段:' + sort_config.title + '| ' + sort_config.sort);
    //   let sortCol = sort_config.name;
    //   let sortBy = sort_config.sort;

    //   //保存排序
    //   this.config.sorting = sort_config;

    //   if (!this.pager.ext) {
    //     this.pager.ext = new IPagerExt();
    //   }
    //   if (sortBy === 'asc') {
    //     this.pager.ext.sort = ISort.SORT_ASC;
    //   } else if (sortBy === 'desc') {
    //     this.pager.ext.sort = ISort.SORT_DESC;
    //   }
    //   if (sortCol) {
    //     let col = sortCol.replace('col_', '');
    //     if (!this.pager.ext.sort_head) {
    //       this.pager.ext.sort_head = new IPagerHead();
    //     }

    //     this.pager.ext.sortCol = ISortCol.SC_CUSTOM;
    //     this.pager.ext.sort_head.h_identity = parseInt(col);
    //   }
    // }
    // if (sort_config.itemsPerPage) {
    //   this.pager.pagePerCount = sort_config.itemsPerPage;
    // }
    // if (sort_config.page) {
    //   this.pager.pageNo = sort_config.page;
    // }

    // this.changeShowRows();
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
    this.page = page;

    this.changeShowRows();
  }

  public initPageNum() {
    this.pagenum = [];
    let i = 1;
    while (i <= this.numPages) {
      this.pagenum.push(i);
      i++;
    }
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


  public changeShowRows() {
    console.log(this.page);
    const start = (this.page - 1) * this.itemsPerPage;
    const end = this.itemsPerPage > -1 ? (start + this.itemsPerPage) : this.rows.length;
    this.showrows = this.rows.slice(start, end);

    (<any>$('#all_checkbox')).attr('checked', false);

  }


}
