import { APP_PROTO_PATH_NLK, APP_PROTO_PATH_WX, APP_PROTO_PATH_ALIPAY } from '../config/app.config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as protobuf from 'protobufjs';
import { APP_PROTO_PATH_SYS, APP_PROTO_PATH_MALL } from '../config/app.config';

// declare let protobuf: any;

/**
 * 公共协议库处理
 * 其它项目协议库可以参考此类创建
 */
@Injectable()
export class GpbService {
  PROTO_ROOT: any = {};

  PROTOMAP: { [index: string]: any } = {};

  constructor() {
    console.log('gpb new init...');
  }

  /**
   * 处理异常，打印输出异常信息
   * @param errorstr 异常
   */
  handleError(errorstr: any): Observable<any> {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (errorstr.message) ? errorstr.message :
      errorstr.status ? `${errorstr.status} - ${errorstr.statusText}` : 'Server error';

    // error('网络异常,请稍后再试..' + errMsg);
    // this.modal.showMessages('网络异常,请稍后再试..');
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  /**
   * 转换 base64 string 到协议对像
   * @param base64String base64 string
   * @param protoMessage 消息对像
   */
  public bas64ToProto(base64String: any, protoMessage: any): any {
    // 过滤空字符,避免解析错误
    base64String = base64String.replace(/\s/g, '');
    const length = protobuf.util.base64.length(base64String);
    const buffer = new Uint8Array(length);
    const decodeL = protobuf.util.base64.decode(base64String, buffer, 0);
    if (decodeL > 0) {
      return protoMessage.decode(buffer);
    } else {
      return protoMessage.create({});
    }
  }


  /**
   * 协议对像转 base64 string
   * @param message 消息内容
   * @param protoMessage 消息对像
   */
  public protoToBase64(message: any, protoMessage: any): any {
    const encode = protoMessage.encode(message).finish();
    return protobuf.util.base64.encode(encode, 0, encode.length);
  }

  /**
     * 初始化协议根节点
     * @param cName 协议类名
     * @param isEnum 是否为枚举类型
     */
  public initProtoRoot(cName: string, isEnum: boolean = false): Observable<any> {
    console.log('initProtoRoot cName ', cName);
    return Observable.create((observer: any) => {
      if (!cName) {
        observer.error('proto 路径为空');
      } else {
        let key = '';
        let url: any = null;
        if (cName.indexOf('idsys') !== -1 || cName.indexOf('com2') !== -1) {
          url = APP_PROTO_PATH_SYS;
          key = 'sys';
        } else if (cName.indexOf('idmall') !== -1) {
          url = APP_PROTO_PATH_MALL;
          key = 'mall';
        } else if (cName.indexOf('nlk') !== -1) {
          url = APP_PROTO_PATH_NLK;
          key = 'nlk';
        } else if (cName.indexOf('idwx') !== -1) {
          url = APP_PROTO_PATH_WX;
          key = 'wx';
        } else if (cName.indexOf('idalipay') !== -1) {
          url = APP_PROTO_PATH_ALIPAY;
          key = 'alipay';
        }
        if (this.PROTO_ROOT[key] === undefined) {
          protobuf.load(url)
            .then((root: any) => {
              this.PROTO_ROOT[key] = root;
              console.log('initProtoRoot', root);
              observer.next(isEnum ? this.PROTO_ROOT[key].lookupEnum(cName) : this.PROTO_ROOT[key].lookupType(cName));
            }).catch((error: any) => {
              this.handleError(error);
              observer.error(error);
            });
        } else {
          observer.next(isEnum ? this.PROTO_ROOT[key].lookupEnum(cName) : this.PROTO_ROOT[key].lookupType(cName));
        }
      }
    });
  }

  /**
   * 异步回调方法，返回协议对像
   * @param protoName 协议类名
   * @param isEnum 是否为枚举类型
   */
  public getProto(protoName: string, isEnum: boolean = false): Observable<any> {
    return Observable.create((observer: any) => {
      if (this.PROTOMAP[protoName]) {
        observer.next(this.PROTOMAP[protoName]);
      } else {
        this.initProtoRoot(protoName, isEnum).subscribe(
          (message: any) => {
            this.PROTOMAP[protoName] = message;
            console.log('getProto', protoName, message);
            observer.next(this.PROTOMAP[protoName]);
          },
          (error: any) => {
            this.handleError(error);
            observer.error(error);
          }
        );
      }
    });
  }
}
