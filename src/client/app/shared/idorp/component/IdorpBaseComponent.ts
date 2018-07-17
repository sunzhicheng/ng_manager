import * as _ from 'lodash';

export class IdorpBaseComponent {


    /**
     * 返回属性对应值
     * 参考： https://www.lodashjs.com/
     * 参考： https://www.lodashjs.com/docs/4.17.5.html#get
     * @param proto 协议对像或JSON对像
     * @param name 属性名称
     * @param defaultValue 默认值
     */
    pp(proto: any, name: string, defaultValue: string): any {
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

}
