import { IDCONF } from '../config/app.config';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

// 需要index.html引入 myjs.min.js
// declare let hex_md5;

/**
 * Utils类存放和业务无关的公共方法
 * @description
 */
@Injectable()
export class IdTool {

  /**
   * 每次调用sequence加1
   * @type {()=>number}
   */
  static getSequence = (() => {
    let sequence = 1;
    return () => {
      return ++sequence;
    };
  })();

  /**
   * 判断空
   * @param value 对像
   */
  static isEmpty(value: any): boolean {
    return value === null || value === 'null' || value === 'undefined' || typeof value === 'undefined'
      || (typeof value === 'string' && value.length === 0);
  }

  /**
   * 判断非空
   * @param value 对像
   */
  static isNotEmpty(value: any): boolean {
    return !IdTool.isEmpty(value);
  }

  /**
   * 判断空
   * @param value 对像
   */
  static isEmptyArray(value: any): boolean {
    return value === null || value === 'null' || value === 'undefined' || typeof value === 'undefined'
      || value.length === 0;
  }

  /**
   * 判断非空
   * @param value 对像
   */
  static isNotEmptyArray(value: any): boolean {
    return !IdTool.isEmptyArray(value);
  }

  /**
   * wjy
   * 判断对象空
   * @param object 对像
   */
  static isEmptyObject(object: any): boolean {
    for (const key in object) {
      return false;
    }
    return true;
  }

  /**
 * wjy
 * 判断对象非空
 * @param object 对像
 */
  static isNotEmptyObject(object: any): boolean {
    return !IdTool.isEmptyObject(object);
  }

  /**
   * 格式“是”or“否”
   * @param value
   * @returns {string|string}
   */
  static formatYesOrNo(value: number | string): string {
    return value === 1 ? '是' : (value === '0' ? '否' : null);
  }

  /**
   * 日期对象转为日期字符串
   * @param date 需要格式化的日期对象
   * @param sFormat 输出格式,默认为yyyy-MM-dd                        年：y，月：M，日：d，时：h，分：m，秒：s
   * @example  dateFormat(new Date())                               "2017-02-28"
   * @example  dateFormat(new Date(),'yyyy-MM-dd')                  "2017-02-28"
   * @example  dateFormat(new Date(),'yyyy-MM-dd HH:mm:ss')         "2017-02-28 13:24:00"   ps:HH:24小时制
   * @example  dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss')         "2017-02-28 01:24:00"   ps:hh:12小时制
   * @example  dateFormat(new Date(),'hh:mm')                       "09:24"
   * @example  dateFormat(new Date(),'yyyy-MM-ddTHH:mm:ss+08:00')   "2017-02-28T13:24:00+08:00"
   * @example  dateFormat(new Date('2017-02-28 13:24:00'),'yyyy-MM-ddTHH:mm:ss+08:00')   "2017-02-28T13:24:00+08:00"
   * @returns {string}
   */
  static dateFormat(date: Date, sFormat: String = 'yyyy-MM-dd'): string {
    const time = {
      Year: 0,
      TYear: '0',
      Month: 0,
      TMonth: '0',
      Day: 0,
      TDay: '0',
      Hour: 0,
      THour: '0',
      hour: 0,
      Thour: '0',
      Minute: 0,
      TMinute: '0',
      Second: 0,
      TSecond: '0',
      Millisecond: 0
    };
    time.Year = date.getFullYear();
    time.TYear = String(time.Year).substr(2);
    time.Month = date.getMonth() + 1;
    time.TMonth = time.Month < 10 ? '0' + time.Month : String(time.Month);
    time.Day = date.getDate();
    time.TDay = time.Day < 10 ? '0' + time.Day : String(time.Day);
    time.Hour = date.getHours();
    time.THour = time.Hour < 10 ? '0' + time.Hour : String(time.Hour);
    time.hour = time.Hour < 13 ? time.Hour : time.Hour - 12;
    time.Thour = time.hour < 10 ? '0' + time.hour : String(time.hour);
    time.Minute = date.getMinutes();
    time.TMinute = time.Minute < 10 ? '0' + time.Minute : String(time.Minute);
    time.Second = date.getSeconds();
    time.TSecond = time.Second < 10 ? '0' + time.Second : String(time.Second);
    time.Millisecond = date.getMilliseconds();

    return sFormat.replace(/yyyy/ig, String(time.Year))
      .replace(/yyy/ig, String(time.Year))
      .replace(/yy/ig, time.TYear)
      .replace(/y/ig, time.TYear)
      .replace(/MM/g, time.TMonth)
      .replace(/M/g, String(time.Month))
      .replace(/dd/ig, time.TDay)
      .replace(/d/ig, String(time.Day))
      .replace(/HH/g, time.THour)
      .replace(/H/g, String(time.Hour))
      .replace(/hh/g, time.Thour)
      .replace(/h/g, String(time.hour))
      .replace(/mm/g, time.TMinute)
      .replace(/m/g, String(time.Minute))
      .replace(/ss/ig, time.TSecond)
      .replace(/s/ig, String(time.Second))
      .replace(/fff/ig, String(time.Millisecond));
  }
  /**
   * 返回字符串长度，中文计数为2
   * @param str
   * @returns {number}
   */
  static strLength(str: string): number {
    let len = 0;
    for (let i = 0, length = str.length; i < length; i++) {
      str.charCodeAt(i) > 255 ? len += 2 : len++;
    }
    return len;
  }

  /**
   * 把url中的双斜杠替换为单斜杠
   * 如:http://localhost:8080//api//demo.替换后http://localhost:8080/api/demo
   * @param url
   * @returns {string}
   */
  static formatUrl(url = ''): string {
    let index = 0;
    if (url.startsWith('http')) {
      index = 7;
    }
    return url.substring(0, index) + url.substring(index).replace(/\/\/*/g, '/');
  }

  // /**
  //  * 字符串加密
  //  * @param str
  //  * @returns {any}
  //  */
  // static hex_md5(str: string) {
  //   return hex_md5(str);
  // }

  /** 产生一个随机的32位长度字符串 */
  static uuid() {
    let text = '';
    const possible = 'abcdef0123456789';
    for (let i = 0; i < 19; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text + new Date().getTime();
  }
  //所有A有的属性,如果B有,就从B拷贝过来,如果B没有,保持A不变
  //E为A无论如何都不想被覆盖掉的域
  //用来为A抽取所有感兴趣的B的属性
  //A劲量抽取B的属性,A主攻
  static mergeAFromB(a: any, b: any, e: any) {
    const data: any = {};
    for (const key in e) {
      data[e[key]] = '';
    }

    if (a && b) {
      for (const k in a) {
        if (e) {
          if (k in data) {
            continue;
          }
        }
        if (typeof b[k] !== 'undefined') {
          a[k] = b[k];
        }
      }
    }
    return a;
  }
  /**
   * 把b中的属性覆盖到a中
   * @param a
   * @param b
   */
  static coverAFromB(a: any, b: any) {
    for (const key in b) {
      a[key] = b[key];
    }
  }
  /**
   * set 值到指定的json 对象
   * @param json 需要保存的jsond对象
   * @param name json  目录字符串
   * @param value  需要set的值
   */
  static setJson(json: any, name: string, value: any): any {
    if (json && name && value) {
      _.setWith(json, name, value);
    }
  }

  /**
 * 返回属性对应值
 * 参考： https://www.lodashjs.com/
 * 参考： https://www.lodashjs.com/docs/4.17.5.html#get
 * @param proto 协议对像或JSON对像
 * @param name 属性名称
 * @param defaultValue 默认值
 */
  static getJson(proto: any, name: string, defaultValue = ''): any {
    if (proto && name) {
      const v = _.get(proto, name, defaultValue);
      // this.log('proto , name , default ', proto, name, defaultValue);
      return v;
      // 如果 lodash 不能使用，可以尝试下面方式
      // return (!Array.isArray(name) ? name.replace(/\[/g, '.').replace(/\]/g, '').split('.') : name)
      // .reduce((o, k) => (o || {})[k], proto) || defaultValue;
    }
    return '';
  }
  /**
   * json对象转成  formData形式  eg:"level1.name": "name1",
   * @param json  原json 对象  {level1:{name:'name1'}}
   * @param _key
   * @param _json
   */
  static json2FromData(json: any, _key: any = '', _json: any = {}) {
    _.mapKeys(json, (value, key) => {
      let tempkey: any = '';
      if (_key !== '') {
        tempkey += _key;
        tempkey += '.';
        tempkey += key;
      } else {
        tempkey = key;
      }
      if (value instanceof Object) {
        if (_.has(value, 'low')) { //特殊处理long 类型
          _json[tempkey] = parseInt(value + '', 10);
        } else {
          this.json2FromData(value, tempkey, _json);
        }
      } else {
        _json[tempkey] = value;
      }
    });
    return _json;
  }

  static getImgUrl(id: any) {
    return IDCONF().api_file + '/idsys/idfileupload/loadimg/' + id;
  }
  static getFileUrl(id: any) {
    return IDCONF().api_file + '/idsys/idfileupload/load/' + id;
  }
  static compareArray(a: Array<String>, b: Array<String>) {
    return a.sort().toString() === b.sort().toString();
  }
  static compareArrayAndString(a: Array<String>, b: String) {
    const bArr = b.split(',');
    return IdTool.compareArray(a, bArr);
  }
  /**
     * 从协议 map 对像中取值
     * @param protoMap proto map 对像
     * @param key map key
     */
    public static getMapValue(protoMap: any, key: any) {
      if (!protoMap || !protoMap.length
          || protoMap.length <= 0 || !key) {
          return;
      }
      const len = protoMap.length;
      let obj;
      for (let j = 0; j < len; j++) {
          obj = protoMap[j];
          if (obj && obj.key === key) {
              return obj.value;
          }
      }
  }

  /**
     * 生成指定长度随机字符串
     * @param len 长度
     */
    public static randomString (len = 5) {
      len = len || 32;
      const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
      const maxPos = $chars.length;
      let pwd = '';
      for (let i = 0; i < len; i++) {
          pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
  }

  /**
   * 添加查询参数
   * @param data
   */
  static bindQueryData(entry: any, data: any, isConcat: boolean = false) {
    let q_item_list: any = new Array();
    if (isConcat) {
      q_item_list = this.getJson(entry, 'query.q_item_list') || new Array();
    }
    for (const key in data) {
      const exist_index = _.findIndex(q_item_list, (o: any) => {
        return o.col === key;
      });
      if (exist_index >= 0) {  //判断是否存在相应的可以  存在更新value
        q_item_list[exist_index].s_value = data[key] + '';
      } else {
        q_item_list.push({
          col: key,
          q_item_type: 1,
          s_value: data[key] + ''
        });
      }
    }
    _.setWith(entry, 'query.q_item_list', q_item_list);
  }
  /**
   * 将一个大数组截取成几个小数组的合集
   * @param arr 原数组对象
   * @param size 需要分割成几个
   */
  static sliceArr(arr: any, size: any) {
    const result = [];
    for (let x = 0; x < Math.ceil(arr.length / size); x++) {
      const start = x * size;
      const end = start + size;
      result.push(arr.slice(start, end));
    }
    return result;
  }

  /**
   * 向arr数组对象的index 的位置 添加点值V
   * @param arr 数组对象
   * @param v 增加的数组对象
   * @param index 新增的位置
   */
  static addInArray(arr: any, v: any, index: any) {
    if (!arr) {
      arr = [];
    }
    if (arr.length < index) {
      console.error('addInArray  数组越界 Array.length : ' + arr.length + '    添加的位置 : ' + index);
      arr = arr.concat(v);
      return arr;
    }
    if (arr.length === index) {
      arr = arr.concat(v);
      return arr;
    }
    if (arr.length > index) {
      let arrRetn: any = [];
      if (index === 0) {
        arrRetn = arrRetn.concat(v);
        arrRetn = arrRetn.concat(arr);
        return arrRetn;
      } else {
        const one = arr.slice(0, index + 1);
        const two = arr.slice(index + 1);
        arrRetn = arrRetn.concat(one);
        arrRetn = arrRetn.concat(v);
        arrRetn = arrRetn.concat(two);
        return arrRetn;
      }
    }
  }
}
