import { Component, OnInit } from '@angular/core';
import { IdorpBaseComponent } from './../../../../shared/idorp/component/IdorpBaseComponent';
import { PAGER_INIT } from './../../../../shared/idorp/config/app.config';
import { IdSysUserTypeService } from './idsysusertype.service';

@Component({
    moduleId: module.id,
    selector: 'sd-idsysusertype',
    templateUrl: 'idsysusertype.component.html'
})

/**
 * 系统模块 用户类别表 组件
 */
export class IdSysUserTypeComponent extends IdorpBaseComponent implements OnInit {

    item: any;


    constructor(private idSysUserType: IdSysUserTypeService) {
            super();
            this.item = {
                title: 'IdSysUserType',
                description: 'IdSysUserType'
            };
    }


    ngOnInit(): void {
        console.log('IdSysUserTypeComponent ngOnInit ');
        this.query();
    }

    query() {
        this.idSysUserType.getProtoEntry().subscribe(
            (protoMessage: any) => {
                const pagerBase = PAGER_INIT;
                if (this.pager) {
                    this.pagerMerge(pagerBase.pager, this.pager);
                }
                this.protoEntry = protoMessage.create(pagerBase);
                console.log('IdSysUserType query params : ', this.protoEntry);
                this.idSysUserType.query(this.protoEntry, protoMessage).subscribe(
                    (protoMsg: any) => {
                        this.protoEntry = protoMsg;
                        this.pager = this.protoEntry.pager;
                        console.log('IdSysUserType query result : ', this.protoEntry);
                    },
                    (error: any) => console.error(error)
                );
            }
        );
    }

    load(pager: any) {
        console.log('IdSysUserType load');
        this.query();
    }
    del(event: any) {
        console.log('IdSysUserType del');
    }
    update(event: any) {
        console.log('IdSysUserType update');
    }
}

