import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { isDebug } from '../config/env_qz.config';
// import * as protobuf from 'protobufjs';

declare let protobuf: any;
declare function error(content: string): void;

/**
 * This class represents the google protobuf service.
 */
@Injectable()
export class ToolGpbService {
  PROTO_ROOT: any;

  IID: any;
  IPager: any;
  IPagerExt: any;
  IToken: any;
  IForm: any;
  ComFileEntry: any;

  SysAic: any;
  SysUserEntry: any;
  SysCompanyEntry: any;
  SysRoleEntry: any;

  RoutLink = {};

  handleError(errorstr: any): Observable<any> {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (errorstr.message) ? errorstr.message :
      errorstr.status ? `${errorstr.status} - ${errorstr.statusText}` : 'Server error';

    error('网络异常,请稍后再试..' + errMsg);
    // this.modal.showMessages('网络异常,请稍后再试..');
    console.error(errMsg); // log to console instead
    return of(errMsg);
  }

  /**
   * 转换 base64 string 到协议对像
   * @param base64String base64 string
   * @param protoMessage 消息对像
   */
  public bas64ToProto(base64String: any, protoMessage: any): any {
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
     * @param callback 完成回调
     */
  public initProtoRoot(cName: string, callback: any, isEnum: boolean = false) {
    //error('ngOnInit 200');
    if (this.PROTO_ROOT === undefined) {
      const me = this;
      //error('ngOnInit 201');
      protobuf.load('assets/protobuf/Ibms.json')
        .then(function (root: any) {
          //error('ngOnInit 202');
          me.PROTO_ROOT = root;
          // console.log('test 1 : ' , me.PROTO_ROOT);
          callback(isEnum ? me.PROTO_ROOT.lookupEnum(cName) : me.PROTO_ROOT.lookupType(cName));
        }).catch(this.handleError.bind(me));
    } else {
      // console.log('test 2 : ' , this.PROTO_ROOT);
      callback(isEnum ? this.PROTO_ROOT.lookupEnum(cName) : this.PROTO_ROOT.lookupType(cName));
    }
  }

  /**
   * 异步回调方法，返回IID协议对像
   * @param callback IID
   */
  public getIID(callback: any) {
    if (this.IID === undefined) {
      const me = this;
      this.initProtoRoot('com2.IID', function (message: any) {
        me.IID = message;
        callback(me.IID);
      });
    } else {
      callback(this.IID);
    }
  }

  public initLid(id: any, callback: any) {
    const iid = this.getIID(function (message: any) {
      callback(iid);
    });
  }


  /**
   * 异步回调方法，返回IPager协议对像
   * @param callback IPager
   */
  public getIPager(callback: any) {
    if (this.IPager === undefined) {
      const me = this;
      this.initProtoRoot('com2.IPager', function (message: any) {
        me.IPager = message;
        callback(me.IPager);
      });
    } else {
      callback(this.IPager);
    }
  }

  public initIPager(entry: any) {
    if (!entry.pager) {
      entry.pager = { ext: {} };
    }
    if (!entry.pager.ext) {
      entry.pager.ext = {};
    }
  }

  /**
   * 异步回调方法，返回 IPagerExt 协议对像
   * @param callback IPagerExt
   */
  public getIPagerExt(callback: any) {
    if (this.IPagerExt === undefined) {
      this.initProtoRoot('com2.IPagerExt', (message: any) => {
        this.IPagerExt = message;
        callback(this.IPagerExt);
      });
    } else {
      callback(this.IPagerExt);
    }
  }

  /**
   * 异步回调方法，返回IToken协议对像
   * @param callback IToken
   */
  public getIToken(callback: any) {
    if (this.IToken === undefined) {
      const me = this;
      this.initProtoRoot('com2.IToken', function (message: any) {
        me.IToken = message;
        callback(me.IToken);
      });
    } else {
      callback(this.IToken);
    }
  }

  /**
   * 异步回调方法，返回IForm协议对像
   * @param callback IForm
   */
  public getIForm(callback: any) {
    if (this.IForm === undefined) {
      const me = this;
      this.initProtoRoot('com2.IForm', function (message: any) {
        me.IForm = message;
        callback(me.IForm);
      });
    } else {
      callback(this.IForm);
    }
  }

  /**
   * 异步回调方法，返回ComFileEntry协议对像
   * @param callback ComFileEntry
   */
  public getComFileEntry(callback: any) {
    if (this.ComFileEntry === undefined) {
      const me = this;
      this.initProtoRoot('com2.ComFileEntry', function (message: any) {
        me.ComFileEntry = message;
        callback(me.ComFileEntry);
      });
    } else {
      callback(this.ComFileEntry);
    }
  }

  /**
   * 异步回调方法，返回 SysAic 协议对像
   * @param callback SysAic
   */
  public getSysAic(callback: any) {
    if (this.SysAic === undefined) {
      const me = this;
      this.initProtoRoot('sys.AIC', function (message: any) {
        me.SysAic = message;
        callback(me.SysAic);
      }, true);
    } else {
      callback(this.SysAic);
    }
  }

  /**
   * 异步回调方法，返回QzUserEntry协议对像
   * @param callback QzUserEntry
   */
  public getSysUserEntry(callback: any) {
    //error('ngOnInit 100');
    if (this.SysUserEntry === undefined) {
      const me = this;
      //error('ngOnInit 101');
      this.initProtoRoot('sys.SysUserEntry', function (message: any) {
        me.SysUserEntry = message;
        callback(me.SysUserEntry);
      });
    } else {
      callback(this.SysUserEntry);
    }
  }

  public initQzUserEntry(callback: any) {
    this.getSysUserEntry(function (message: any) {
      callback(message.create({ user: { pt_id: {}, account_ext: {} } }));
    });
  }

  /**
   * 异步回调方法，返回 SysCompanyEntry 协议对像
   * @param callback SysCompanyEntry
   */
  public getQzCompanyEntry(callback: any) {
    if (this.SysCompanyEntry === undefined) {
      const me = this;
      this.initProtoRoot('sys.SysCompanyEntry', function (message: any) {
        me.SysCompanyEntry = message;
        callback(me.SysCompanyEntry);
      });
    } else {
      callback(this.SysCompanyEntry);
    }
  }


  /**
   * SYS 模块
   * 异步回调方法，返回 SysRoleEntry 协议对像
   * @param callback SysRoleEntry
   */
  public getSysRoleEntry(callback: any) {
    if (this.SysRoleEntry === undefined) {
      this.initProtoRoot('sys.SysRoleEntry', (message: any) => {
        this.SysRoleEntry = message;
        callback(this.SysRoleEntry);
      });
    } else {
      callback(this.SysRoleEntry);
    }
  }


  /**
   * AIC 路由映射
   * @param aic AIC
   */
  public getQzMapRouter(aic: any) {
    if (this.SysAic) {
      const aicNum: number = this.SysAic.values[aic];
      console.log('getQzMapRouter this.SysAic : ', this.SysAic);
      console.log('getQzMapRouter aic : ', aic);
      console.log('getQzMapRouter aicNum : ', aicNum);
      console.log('getQzMapRouter this.SysAic.AIC_SYS_WEB_ROLE_QUERY : ', this.SysAic.values.AIC_SYS_WEB_ROLE_QUERY);
      switch (aicNum) {
        case this.SysAic.values.AIC_SYS_WEB_ROLE_QUERY:
          return '/home/sys/role/list';
        default:
          return '/home';
      }
    }
    return '/home';

  }

}
