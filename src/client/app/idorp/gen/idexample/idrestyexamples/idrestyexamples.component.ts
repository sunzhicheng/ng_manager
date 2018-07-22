import { Component, OnInit } from '@angular/core';
import { IdRestyExamplesService } from './idrestyexamples.service';
import { IdorpBaseComponent } from './../../../../shared/idorp/component/IdorpBaseComponent';
import { PAGER_INIT } from './../../../../shared/idorp/config/app.config';

@Component({
    moduleId: module.id,
    selector: 'sd-idrestyexamples',
    templateUrl: 'idrestyexamples.component.html'
})

/**
 * 演示模块 接口演示示例 组件
 */
export class IdRestyExamplesComponent extends IdorpBaseComponent implements OnInit {

    protoEntry: any;
    item: any;
    pager: any;

    constructor(private idRestyExamples: IdRestyExamplesService) {
            super();
            this.item = {
                title: 'IdRestyExamples',
                description: 'IdRestyExamples'
            };
    }


    ngOnInit(): void {
        console.log('IdRestyExamplesComponent ngOnInit ');
        this.query();
    }

    query() {
        this.idRestyExamples.getProtoEntry().subscribe(
            (protoMessage: any) => {
                const pagerBase = PAGER_INIT;
                if (this.pager) {
                    pagerBase.pager.pageNo = this.pager.pageNo;
                    pagerBase.pager.hg = 1;
                    pagerBase.pager.ext.sort = this.pager.ext.sort;
                    pagerBase.pager.ext.sortCol = this.pager.ext.sortCol;
                    pagerBase.pager.ext.sort_head.h_identity = this.pager.ext.sort_head.h_identity;
                }
                this.protoEntry = protoMessage.create(pagerBase);
                console.log('query params : ', this.protoEntry);
                this.idRestyExamples.query(this.protoEntry, protoMessage).subscribe(
                    (protoMsg: any) => {
                        this.protoEntry = protoMsg;
                        this.pager = this.protoEntry.pager;
                        console.log('query result : ', this.protoEntry);
                    },
                    (error: any) => console.error(error)
                );
            }
        );
    }

    load(pager: any) {
        console.log('IdRestyExamples load');
        this.query();
    }
    del(event: any) {
        console.log('IdRestyExamples del');
    }
    update(event: any) {
        console.log('IdRestyExamples update');
    }
}
