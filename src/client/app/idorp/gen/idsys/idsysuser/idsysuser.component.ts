import { Component, OnInit } from '@angular/core';
import { IdorpBaseComponent } from './../../../../shared/idorp/component/IdorpBaseComponent';
import { PAGER_INIT } from './../../../../shared/idorp/config/app.config';
import { IdSysUserService } from './idsysuser.service';

@Component({
    moduleId: module.id,
    selector: 'sd-idsysuser',
    templateUrl: 'idsysuser.component.html'
})

/**
 * 系统模块 哪凉快用户 组件
 */
export class IdSysUserComponent extends IdorpBaseComponent implements OnInit {

    item: any;


    constructor(private idSysUser: IdSysUserService) {
            super();
            this.item = {
                title: 'IdSysUser',
                description: 'IdSysUser'
            };
    }


    ngOnInit(): void {
        console.log('IdSysUserComponent ngOnInit ');
        this.query();
    }

    query() {
        this.idSysUser.getProtoEntry().subscribe(
            (protoMessage: any) => {
                const pagerBase = PAGER_INIT;
                if (this.pager) {
                    this.pagerMerge(pagerBase.pager, this.pager);
                }
                this.protoEntry = protoMessage.create(pagerBase);
                console.log('IdSysUser query params : ', this.protoEntry);
                this.idSysUser.query(this.protoEntry, protoMessage).subscribe(
                    (protoMsg: any) => {
                        this.protoEntry = protoMsg;
                        this.pager = this.protoEntry.pager;
                        console.log('IdSysUser query result : ', this.protoEntry);
                    },
                    (error: any) => console.error(error)
                );
            }
        );
    }

    load(pager: any) {
        console.log('IdSysUser load');
        this.query();
    }
    del(event: any) {
        console.log('IdSysUser del');
    }
    update(event: any) {
        console.log('IdSysUser update');
    }
}

