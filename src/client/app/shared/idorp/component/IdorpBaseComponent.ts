import * as _ from 'lodash';

export class IdorpBaseComponent {

    /**
     * 组件协议对像数据
     */
    protoEntry: any;
    /**
     * 表单分页数据
     */
    pager: any;


    /**
     * 返回属性对应值
     * 参考： https://www.lodashjs.com/
     * 参考： https://www.lodashjs.com/docs/4.17.5.html#get
     * @param proto 协议对像或JSON对像
     * @param name 属性名称
     * @param defaultValue 默认值
     */
    pp(proto: any, name: string, defaultValue = ''): any {
        if (proto && name) {
            const v = _.get(proto, name, defaultValue);
            // console.log('proto , name , default ', proto, name, defaultValue);
            return v;
            // 如果 lodash 不能使用，可以尝试下面方式
            // return (!Array.isArray(name) ? name.replace(/\[/g, '.').replace(/\]/g, '').split('.') : name)
            // .reduce((o, k) => (o || {})[k], proto) || defaultValue;
        }
        return '';
    }

    /**
     * 提交查询分页数据合并
     * @param pagerNew 提交查询分页数据
     * @param pagerOld 本地分页表单中数据
     */
    pagerMerge(pagerNew: any, pagerOld: any) {
        if (pagerNew && pagerOld) {
            if (this.pp(pagerNew, 'pager.pageNo') !== '' && this.pp(pagerOld, 'pager.pageNo') !== '') {
                pagerNew.pageNo = pagerOld.pageNo;
            }
            if (this.pp(pagerNew, 'pager.hg') === '') {
                pagerNew.hg = 1;
            }
            if (this.pp(pagerNew, 'pager.ext') !== '' && this.pp(pagerOld, 'pager.ext') !== '') {
                pagerNew.ext.sort = pagerOld.ext.sort;
                pagerNew.ext.sortCol = pagerOld.ext.sortCol;
            }
            if (this.pp(pagerNew, 'pager.ext.sort_head') !== '' && this.pp(pagerOld, 'pager.ext.sort_head') !== '') {
                pagerNew.ext.sort_head.h_identity = pagerOld.ext.sort_head.h_identity;
            }
        }
    }

}
